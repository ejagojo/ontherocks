import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const OrderHistory = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Utility to force HTTPS on any URL (avoids mixed‑content blocking)
  const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('//')) return `https:${url}`;
    return url.replace(/^http:\/\//i, 'https://');
  };

  // A public fallback in case the image fails to load or URL is missing
  const fallbackImage = 'https://via.placeholder.com/64?text=No+Image';

  // Show newest orders first
  const sortedOrders = orders
    .slice() // clone array to avoid mutating props
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Order History</h2>

      {sortedOrders.map((order) => {
        const isExpanded = expandedOrderId === order.id;

        // Format status display
        let displayStatus = order.status;
        if (order.status === 'AWAITING_PICKUP' || order.status === 'AWAITING PICKUP') {
          displayStatus = 'Awaiting Pickup';
        }

        // Get status badge style
        const getStatusBadgeClass = () => {
          const baseClasses = "px-2 py-1 rounded-md text-xs font-medium";

          if (order.status === 'AWAITING_PICKUP' || order.status === 'AWAITING PICKUP') {
            return `${baseClasses} bg-yellow-200 text-yellow-800`;
          } else if (order.status === 'PICKED UP') {
            return `${baseClasses} bg-green-200 text-green-800`;
          } else if (order.status === 'CANCELED') {
            return `${baseClasses} bg-red-200 text-red-800`;
          }
          return `${baseClasses} bg-gray-200 text-gray-800`;
        };

        return (
          <div key={order.id} className="mb-4 bg-[#000021] rounded-lg overflow-hidden shadow-md border border-gray-800">
            {/* Order Header */}
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleExpand(order.id)}
            >
              <div>
                <p className="text-sm font-bold">Order: {order.id}</p>
                {order.product && <p className="text-sm text-gray-300">{order.product}</p>}
                <span className={getStatusBadgeClass()}>
                  {displayStatus}
                </span>
                <p className="font-semibold mt-1">${order.total}</p>
              </div>

              <div className="flex items-center">
                <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
              <div className="mt-2 px-4 py-3 border-t border-gray-600 bg-[#000030]">
                {/* Pickup Details */}
                <div className="mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start">
                      <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="text-xs text-gray-500">Pick Up Time</span>
                        <p className="text-sm text-gray-300">{formatDateTime(order.pickupTime)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <span className="text-xs text-gray-500">Pick Up Address</span>
                        <p className="text-sm text-gray-300">{order.pickupAddress || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items in Order */}
                <div>
                  <p className="text-sm font-semibold mb-2">Items in Order:</p>
                  <div className="space-y-3">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div key={index} className="flex items-center mb-2 bg-[#000021] p-3 rounded-md">
                          <div className="w-16 h-16 bg-white rounded-md flex-shrink-0 overflow-hidden">
                            <img
                              src={normalizeImageUrl(item.image_url) || fallbackImage}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              onError={(e) => { e.target.src = fallbackImage; }}
                            />
                          </div>

                          <div className="ml-4">
                            <p className="text-sm font-medium">{item.name} - {item.quantity}x</p>
                            <p className="text-xs text-gray-400">{item.size} - ${item.price}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 py-3 text-center bg-[#000021] rounded-md">No items found for this order.</p>
                    )}
                  </div>
                </div>

                {/* Reorder button */}
                <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between">
                  <button className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                    Reorder
                  </button>
                  {/* Cancel button, that stays for 5 mintues after and order is made. */}
                  <button className="px-3 py-1.5 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {sortedOrders.length === 0 && (
        <div className="text-center py-8 bg-[#000021] rounded-lg border border-gray-800">
          <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <p className="mt-2 text-gray-400">No orders yet</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;