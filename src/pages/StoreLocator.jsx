import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const stores = [
  { id: 1, name: "Lowell Liquor Store", lat: 42.6334, lng: -71.3162 },
  { id: 2, name: "Mill City Spirits", lat: 42.6427, lng: -71.3096 },
  { id: 3, name: "Andover Wine & Spirits", lat: 42.6584, lng: -71.137 },
  { id: 4, name: "Main Street Liquors", lat: 42.6536, lng: -71.1352 },
  { id: 5, name: "Back Bay Liquors", lat: 42.3496, lng: -71.0783 },
  { id: 6, name: "Beacon Hill Wine", lat: 42.3588, lng: -71.0708 },
  { id: 7, name: "Fenway Spirits", lat: 42.343, lng: -71.1003 },
  { id: 8, name: "Harvard Wine Cellar", lat: 42.3736, lng: -71.1097 },
  { id: 9, name: "Cambridge Liquors", lat: 42.3728, lng: -71.113 },
  { id: 10, name: "Union Square Spirits", lat: 42.3793, lng: -71.0966 },
  { id: 11, name: "Downtown Spirits", lat: 40.7128, lng: -74.006 },
  { id: 12, name: "City Wine Cellar", lat: 40.715, lng: -74.01 },
  { id: 13, name: "Uptown Liquor", lat: 40.72, lng: -73.99 },
  { id: 14, name: "Metro Booze", lat: 40.725, lng: -74.002 },
  { id: 15, name: "East Side Whiskey", lat: 40.73, lng: -73.98 },
  { id: 16, name: "Bay Spirits", lat: 37.7749, lng: -122.4194 },
  { id: 17, name: "Golden Gate Liquor", lat: 37.779, lng: -122.414 },
  { id: 18, name: "Mission Wines", lat: 37.76, lng: -122.42 },
  { id: 19, name: "Castro Liquors", lat: 37.76, lng: -122.435 },
  { id: 20, name: "Oceanview Booze", lat: 37.73, lng: -122.48 },
];

const StoreLocator = ({ adrs }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [address, setAddress] = useState(adrs || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerGroup = useRef(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://corsproxy.io/?https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();
      const clean = data.map((item) => {
        const { house_number, road, city, town, village, state, postcode } = item.address || {};
        let hn = house_number;
        if (hn && hn.includes(";")) {
          const nums = hn.split(";").map((n) => n.trim());
          hn = nums[nums.length - 1];
        }
        const line = [hn, road].filter(Boolean).join(" ");
        const place = city || town || village || "";
        return {
          ...item,
          formatted_name: [line, place, state, postcode].filter(Boolean).join(", ")
        };
      });
      setSuggestions(clean);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedAddress(suggestion);
    setAddress(suggestion.formatted_name);
    setSuggestions([]);
  };

  const handleGeocodeAndRedirect = async () => {
    let location = selectedAddress;
    if (!location && address.trim()) {
      const url = `https://corsproxy.io/?https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(address)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.length === 0) return;
      location = {
        ...data[0],
        formatted_name: data[0].display_name,
      };
    }

    if (!location) return;

    const coords = { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
    setUserLocation(coords);

    let customAddress = location.formatted_name || location.display_name;
    if (location.address) {
      let { house_number, road, city, town, village, state, postcode } = location.address;
      if (house_number && house_number.includes(";")) {
        const nums = house_number.split(";").map((n) => n.trim());
        house_number = nums[nums.length - 1];
      }
      const line = [house_number, road].filter(Boolean).join(" ");
      const area = city || town || village || "";
      customAddress = [line, area, state, postcode].filter(Boolean).join(", ");
    }

    setAddress(customAddress);
    navigate(`/order?address=${encodeURIComponent(customAddress)}`);

    if (mapInstance.current) {
      mapInstance.current.setView(coords, 13);
      updateMarkers(coords);
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const updateMarkers = (coords) => {
    if (!mapInstance.current || !coords) return;
    markerGroup.current.clearLayers();

    const userMarker = L.marker(coords).bindPopup("Your Location");
    markerGroup.current.addLayer(userMarker);

    const distances = stores.map((store) => ({
      ...store,
      distance: calculateDistance(coords.lat, coords.lng, store.lat, store.lng),
    }));

    distances.sort((a, b) => a.distance - b.distance);
    setNearbyStores(distances.slice(0, 5));

    distances.slice(0, 5).forEach((store) => {
      const marker = L.marker([store.lat, store.lng])
        .bindPopup(`${store.name}<br>${store.distance.toFixed(2)} km away`)
        .on("click", () => navigate(`/shop/${store.id}`));
      markerGroup.current.addLayer(marker);
    });
  };

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([40.7128, -74.006], 4);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
      markerGroup.current = L.layerGroup().addTo(mapInstance.current);
    }
  }, []);

  useEffect(() => {
    if (adrs) {
      setAddress(adrs);
      fetchSuggestions(adrs);
    }
  }, [adrs]);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Find a Nearby Store</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGeocodeAndRedirect();
          }}
          className="relative"
        >
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              className="bg-white border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your address"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
            >
              <FaArrowRight />
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded mt-1 z-10 w-full max-h-52 overflow-y-auto shadow-md">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  onMouseDown={() => handleSelectSuggestion(s)}
                >
                  {s.formatted_name}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      {nearbyStores.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Stores near you:</h3>
          <ul className="space-y-1">
            {nearbyStores.map((store) => (
              <li
                key={store.id}
                onClick={() => navigate(`/shop/${store.id}`)}
                className="cursor-pointer text-blue-700 hover:underline"
              >
                {store.name} <span className="text-sm text-gray-500">({store.distance.toFixed(2)} km)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Store Map</h3>
        <div
          ref={mapRef}
          className="rounded border border-gray-300 shadow"
          style={{ height: "400px", width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default StoreLocator;
