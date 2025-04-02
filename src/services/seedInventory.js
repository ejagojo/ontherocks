import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

// Paste your entire JSON array here:
const inventoryData = [
    {
        "id": "beer-001",
        "name": "Modelo Especial",
        "brand": "Modelo",
        "type": "Beer",
        "subtype": "Pilsner",
        "abv": 4.4,
        "volume_ml": 355,
        "price": 3.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Crisp, golden Mexican lager with a smooth finish.",
        "image_url": "https://placehold.co/200x400?text=Modelo+Especial",
        "tags": [
            "Mexican",
            "Pilsner",
            "Imported"
        ],
        "rating": 4.2
    },
    {
        "id": "beer-002",
        "name": "Corona Extra",
        "brand": "Corona",
        "type": "Beer",
        "subtype": "Lager",
        "abv": 4.6,
        "volume_ml": 355,
        "price": 4.29,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Light, refreshing lager best served with lime.",
        "image_url": "https://placehold.co/200x400?text=Corona+Extra",
        "tags": [
            "Mexican",
            "Light",
            "Summer"
        ],
        "rating": 4.0
    },
    {
        "id": "beer-003",
        "name": "Dos Equis Lager",
        "brand": "Dos Equis",
        "type": "Beer",
        "subtype": "Amber Lager",
        "abv": 4.7,
        "volume_ml": 355,
        "price": 4.49,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Smooth amber lager with a balanced malt profile.",
        "image_url": "https://placehold.co/200x400?text=Dos+Equis+Lager",
        "tags": [
            "Mexican",
            "Amber",
            "Smooth"
        ],
        "rating": 4.1
    },
    {
        "id": "beer-004",
        "name": "Miller Lite",
        "brand": "Miller",
        "type": "Beer",
        "subtype": "Light Lager",
        "abv": 4.2,
        "volume_ml": 355,
        "price": 3.79,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Classic American light beer with low calories.",
        "image_url": "https://placehold.co/200x400?text=Miller+Lite",
        "tags": [
            "Light",
            "Low-Calorie",
            "American"
        ],
        "rating": 3.8
    },
    {
        "id": "beer-005",
        "name": "Bud Light",
        "brand": "Budweiser",
        "type": "Beer",
        "subtype": "Light Lager",
        "abv": 4.2,
        "volume_ml": 355,
        "price": 3.69,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Easy-drinking light beer with a clean finish.",
        "image_url": "https://placehold.co/200x400?text=Bud+Light",
        "tags": [
            "Light",
            "American",
            "Popular"
        ],
        "rating": 3.7
    },
    {
        "id": "beer-006",
        "name": "Sapporo Premium",
        "brand": "Sapporo",
        "type": "Beer",
        "subtype": "Rice Lager",
        "abv": 5.0,
        "volume_ml": 330,
        "price": 4.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Japanese rice lager with a crisp, clean taste.",
        "image_url": "https://placehold.co/200x400?text=Sapporo+Premium",
        "tags": [
            "Japanese",
            "Rice Lager",
            "Imported"
        ],
        "rating": 4.3
    },
    {
        "id": "beer-007",
        "name": "Budweiser",
        "brand": "Budweiser",
        "type": "Beer",
        "subtype": "Lager",
        "abv": 5.0,
        "volume_ml": 355,
        "price": 3.89,
        "in_stock": true,
        "store_id": "store-001",
        "description": "The 'King of Beers' with a balanced malt-hop flavor.",
        "image_url": "https://placehold.co/200x400?text=Budweiser",
        "tags": [
            "American",
            "Classic",
            "Lager"
        ],
        "rating": 3.9
    },
    {
        "id": "beer-008",
        "name": "Guinness Draught",
        "brand": "Guinness",
        "type": "Beer",
        "subtype": "Stout",
        "abv": 4.2,
        "volume_ml": 440,
        "price": 5.49,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Creamy Irish stout with notes of coffee and chocolate.",
        "image_url": "https://placehold.co/200x400?text=Guinness+Draught",
        "tags": [
            "Irish",
            "Stout",
            "Nitrogenated"
        ],
        "rating": 4.6
    },
    {
        "id": "beer-009",
        "name": "Heineken Lager",
        "brand": "Heineken",
        "type": "Beer",
        "subtype": "Pilsner",
        "abv": 5.0,
        "volume_ml": 330,
        "price": 4.79,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Dutch pilsner with a slightly bitter, refreshing taste.",
        "image_url": "https://placehold.co/200x400?text=Heineken+Lager",
        "tags": [
            "Dutch",
            "Pilsner",
            "Green Bottle"
        ],
        "rating": 4.1
    },
    {
        "id": "beer-010",
        "name": "Samuel Adams Boston Lager",
        "brand": "Samuel Adams",
        "type": "Beer",
        "subtype": "Amber Lager",
        "abv": 5.0,
        "volume_ml": 355,
        "price": 5.29,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Caramel malt sweetness with noble hop bitterness.",
        "image_url": "https://placehold.co/200x400?text=Samuel+Adams+Lager",
        "tags": [
            "Craft",
            "Amber",
            "American"
        ],
        "rating": 4.4
    },
    {
        "id": "beer-001",
        "name": "Hazy IPA",
        "brand": "Sierra Nevada",
        "type": "Beer",
        "subtype": "IPA",
        "abv": 6.7,
        "volume_ml": 355,
        "price": 5.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Juicy, tropical hops with a smooth finish.",
        "image_url": "/images/beers/sierra-nevada-hazy.jpg",
        "tags": [
            "IPA",
            "Hazy",
            "Craft"
        ],
        "rating": 4.3
    },
    {
        "id": "beer-002",
        "name": "Chocolate Stout",
        "brand": "Founders",
        "type": "Beer",
        "subtype": "Stout",
        "abv": 8.5,
        "volume_ml": 355,
        "price": 6.49,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Rich dark chocolate and coffee flavors.",
        "image_url": "/images/beers/founders-stout.jpg",
        "tags": [
            "Stout",
            "Dark",
            "Winter"
        ],
        "rating": 4.6
    },
    {
        "id": "beer-003",
        "name": "Pilsner Lager",
        "brand": "Pilsner Urquell",
        "type": "Beer",
        "subtype": "Pilsner",
        "abv": 4.4,
        "volume_ml": 500,
        "price": 4.29,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Crisp, golden, and perfectly balanced.",
        "image_url": "/images/beers/pilsner-urquell.jpg",
        "tags": [
            "Pilsner",
            "Czech",
            "Classic"
        ],
        "rating": 4.1
    },
    {
        "id": "beer-004",
        "name": "West Coast IPA",
        "brand": "Lagunitas",
        "type": "Beer",
        "subtype": "IPA",
        "abv": 7.2,
        "volume_ml": 355,
        "price": 5.79,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Piney, resinous hops with a bitter finish.",
        "image_url": "/images/beers/lagunitas-ipa.jpg",
        "tags": [
            "IPA",
            "West Coast",
            "Bitter"
        ],
        "rating": 4.4
    },
    {
        "id": "beer-005",
        "name": "Belgian Witbier",
        "brand": "Hoegaarden",
        "type": "Beer",
        "subtype": "Wheat Beer",
        "abv": 4.9,
        "volume_ml": 330,
        "price": 4.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Refreshing with coriander and orange peel.",
        "image_url": "/images/beers/hoegaarden.jpg",
        "tags": [
            "Wheat",
            "Belgian",
            "Summer"
        ],
        "rating": 4.2
    },
    {
        "id": "beer-006",
        "name": "Amber Ale",
        "brand": "New Belgium",
        "type": "Beer",
        "subtype": "Ale",
        "abv": 5.3,
        "volume_ml": 355,
        "price": 5.29,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Caramel malt sweetness with a hoppy balance.",
        "image_url": "/images/beers/new-belgium-amber.jpg",
        "tags": [
            "Amber",
            "Malty",
            "Year-Round"
        ],
        "rating": 4.0
    },
    {
        "id": "beer-007",
        "name": "Sour Ale",
        "brand": "Rodenbach",
        "type": "Beer",
        "subtype": "Sour",
        "abv": 5.2,
        "volume_ml": 330,
        "price": 7.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Tart, fruity, and oak-aged.",
        "image_url": "/images/beers/rodenbach.jpg",
        "tags": [
            "Sour",
            "Belgian",
            "Barrel-Aged"
        ],
        "rating": 4.5
    },
    {
        "id": "beer-008",
        "name": "Session IPA",
        "brand": "Stone Brewing",
        "type": "Beer",
        "subtype": "IPA",
        "abv": 4.5,
        "volume_ml": 355,
        "price": 5.49,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Light-bodied but packed with hop flavor.",
        "image_url": "/images/beers/stone-session.jpg",
        "tags": [
            "IPA",
            "Session",
            "Low ABV"
        ],
        "rating": 4.0
    },
    {
        "id": "beer-009",
        "name": "Porter",
        "brand": "Anchor Brewing",
        "type": "Beer",
        "subtype": "Porter",
        "abv": 5.6,
        "volume_ml": 355,
        "price": 5.89,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Roasty, chocolatey, and smooth.",
        "image_url": "/images/beers/anchor-porter.jpg",
        "tags": [
            "Porter",
            "Dark",
            "Roasty"
        ],
        "rating": 4.3
    },
    {
        "id": "beer-010",
        "name": "Hefeweizen",
        "brand": "Weihenstephaner",
        "type": "Beer",
        "subtype": "Wheat Beer",
        "abv": 5.4,
        "volume_ml": 500,
        "price": 6.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Banana and clove notes with a cloudy appearance.",
        "image_url": "/images/beers/weihenstephaner.jpg",
        "tags": [
            "Hefeweizen",
            "German",
            "Cloudy"
        ],
        "rating": 4.7
    },
    {
        "id": "wine-001",
        "name": "Cabernet Sauvignon",
        "brand": "Caymus",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14.5,
        "volume_ml": 750,
        "price": 89.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Napa Valley classic with dark fruit, cocoa, and velvety tannins.",
        "image_url": "https://placehold.co/200x400?text=Caymus+Cabernet",
        "tags": [
            "Napa",
            "Full-Bodied",
            "Aged"
        ],
        "rating": 4.8,
        "vintage": 2019
    },
    {
        "id": "wine-002",
        "name": "Chardonnay",
        "brand": "Kendall-Jackson",
        "type": "Wine",
        "subtype": "White",
        "abv": 13.5,
        "volume_ml": 750,
        "price": 19.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Creamy California Chardonnay with apple and vanilla notes.",
        "image_url": "https://placehold.co/200x400?text=KJ+Chardonnay",
        "tags": [
            "Oaked",
            "Buttery",
            "California"
        ],
        "rating": 4.2,
        "vintage": 2021
    },
    {
        "id": "wine-003",
        "name": "Prosecco DOC",
        "brand": "La Marca",
        "type": "Wine",
        "subtype": "Sparkling",
        "abv": 11,
        "volume_ml": 750,
        "price": 16.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Italian sparkling wine with green apple and honeysuckle flavors.",
        "image_url": "https://placehold.co/200x400?text=La+Marca+Prosecco",
        "tags": [
            "Sparkling",
            "Italy",
            "Brunch"
        ],
        "rating": 4.3,
        "vintage": 2022
    },
    {
        "id": "wine-004",
        "name": "Pinot Noir",
        "brand": "Belle Glos",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14.1,
        "volume_ml": 750,
        "price": 54.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "California Pinot with cherry, raspberry, and baking spice.",
        "image_url": "https://placehold.co/200x400?text=Belle+Glos+Pinot",
        "tags": [
            "Pinot Noir",
            "Fruit-Forward",
            "California"
        ],
        "rating": 4.6,
        "vintage": 2020
    },
    {
        "id": "wine-005",
        "name": "Sauvignon Blanc",
        "brand": "Cloudy Bay",
        "type": "Wine",
        "subtype": "White",
        "abv": 13,
        "volume_ml": 750,
        "price": 34.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "New Zealand Sauv Blanc with zesty citrus and tropical fruit.",
        "image_url": "https://placehold.co/200x400?text=Cloudy+Bay+Sauv",
        "tags": [
            "Crisp",
            "New Zealand",
            "Acidic"
        ],
        "rating": 4.5,
        "vintage": 2022
    },
    {
        "id": "wine-006",
        "name": "Champagne Brut",
        "brand": "Veuve Clicquot",
        "type": "Wine",
        "subtype": "Sparkling",
        "abv": 12,
        "volume_ml": 750,
        "price": 69.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Iconic French Champagne with brioche, pear, and almond notes.",
        "image_url": "https://placehold.co/200x400?text=Veuve+Clicquot",
        "tags": [
            "Champagne",
            "France",
            "Celebration"
        ],
        "rating": 4.7,
        "vintage": 2018
    },
    {
        "id": "wine-007",
        "name": "Malbec",
        "brand": "Catena",
        "type": "Wine",
        "subtype": "Red",
        "abv": 13.9,
        "volume_ml": 750,
        "price": 24.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Argentinian Malbec with plum, violet, and mocha flavors.",
        "image_url": "https://placehold.co/200x400?text=Catena+Malbec",
        "tags": [
            "Argentina",
            "Bold",
            "Value"
        ],
        "rating": 4.4,
        "vintage": 2021
    },
    {
        "id": "wine-008",
        "name": "Rosé",
        "brand": "Whispering Angel",
        "type": "Wine",
        "subtype": "Rosé",
        "abv": 13,
        "volume_ml": 750,
        "price": 22.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Provence rosé with strawberry, citrus, and mineral notes.",
        "image_url": "https://placehold.co/200x400?text=Whispering+Angel",
        "tags": [
            "Provence",
            "Dry",
            "Summer"
        ],
        "rating": 4.3,
        "vintage": 2022
    },
    {
        "id": "wine-009",
        "name": "Zinfandel",
        "brand": "Ridge Vineyards",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14.5,
        "volume_ml": 750,
        "price": 39.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "California Zin with blackberry, pepper, and smoky oak.",
        "image_url": "https://placehold.co/200x400?text=Ridge+Zinfandel",
        "tags": [
            "Zinfandel",
            "Spicy",
            "California"
        ],
        "rating": 4.5,
        "vintage": 2019
    },
    {
        "id": "wine-010",
        "name": "Riesling",
        "brand": "Dr. Loosen",
        "type": "Wine",
        "subtype": "White",
        "abv": 8.5,
        "volume_ml": 750,
        "price": 17.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "German Riesling with peach, apricot, and bright acidity.",
        "image_url": "https://placehold.co/200x400?text=Dr+Loosen+Riesling",
        "tags": [
            "Germany",
            "Off-Dry",
            "Aromatic"
        ],
        "rating": 4.4,
        "vintage": 2021
    },
    {
        "id": "wine-011",
        "name": "Syrah",
        "brand": "Penfolds",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14,
        "volume_ml": 750,
        "price": 29.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Australian Syrah with black cherry, licorice, and pepper.",
        "image_url": "https://placehold.co/200x400?text=Penfolds+Syrah",
        "tags": [
            "Australia",
            "Peppery",
            "Full-Bodied"
        ],
        "rating": 4.3,
        "vintage": 2020
    },
    {
        "id": "wine-012",
        "name": "Pinot Grigio",
        "brand": "Santa Margherita",
        "type": "Wine",
        "subtype": "White",
        "abv": 12.5,
        "volume_ml": 750,
        "price": 26.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Italian Pinot Grigio with citrus, pear, and almond finish.",
        "image_url": "https://placehold.co/200x400?text=Santa+Margherita",
        "tags": [
            "Italy",
            "Crisp",
            "Light"
        ],
        "rating": 4.2,
        "vintage": 2022
    },
    {
        "id": "wine-013",
        "name": "Merlot",
        "brand": "Duckhorn",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14.5,
        "volume_ml": 750,
        "price": 59.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Napa Merlot with black cherry, cocoa, and silky tannins.",
        "image_url": "https://placehold.co/200x400?text=Duckhorn+Merlot",
        "tags": [
            "Napa",
            "Soft Tannins",
            "Plush"
        ],
        "rating": 4.6,
        "vintage": 2018
    },
    {
        "id": "wine-014",
        "name": "Moscato",
        "brand": "Barefoot",
        "type": "Wine",
        "subtype": "White",
        "abv": 9,
        "volume_ml": 750,
        "price": 8.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Sweet and fizzy with peach, orange blossom, and honey.",
        "image_url": "https://placehold.co/200x400?text=Barefoot+Moscato",
        "tags": [
            "Sweet",
            "Fizzy",
            "Budget"
        ],
        "rating": 3.9,
        "vintage": 2022
    },
    {
        "id": "wine-015",
        "name": "Grenache",
        "brand": "Château de Beaucastel",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14,
        "volume_ml": 750,
        "price": 79.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "French Rhône blend with raspberry, garrigue, and earth.",
        "image_url": "https://placehold.co/200x400?text=Beaucastel+Grenache",
        "tags": [
            "Rhône",
            "Earthy",
            "Medium-Bodied"
        ],
        "rating": 4.7,
        "vintage": 2019
    },
    {
        "id": "wine-016",
        "name": "Chenin Blanc",
        "brand": "Raats",
        "type": "Wine",
        "subtype": "White",
        "abv": 13,
        "volume_ml": 750,
        "price": 22.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "South African Chenin with apple, quince, and wet stone.",
        "image_url": "https://placehold.co/200x400?text=Raats+Chenin",
        "tags": [
            "South Africa",
            "Dry",
            "Mineral"
        ],
        "rating": 4.4,
        "vintage": 2021
    },
    {
        "id": "wine-017",
        "name": "Sangiovese",
        "brand": "Antinori",
        "type": "Wine",
        "subtype": "Red",
        "abv": 13.5,
        "volume_ml": 750,
        "price": 34.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Italian Chianti with cherry, leather, and herbal notes.",
        "image_url": "https://placehold.co/200x400?text=Antinori+Sangiovese",
        "tags": [
            "Chianti",
            "Italy",
            "Food-Friendly"
        ],
        "rating": 4.3,
        "vintage": 2020
    },
    {
        "id": "wine-018",
        "name": "Viognier",
        "brand": "Yalumba",
        "type": "Wine",
        "subtype": "White",
        "abv": 13.5,
        "volume_ml": 750,
        "price": 19.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Australian Viognier with peach, honeysuckle, and spice.",
        "image_url": "https://placehold.co/200x400?text=Yalumba+Viognier",
        "tags": [
            "Australia",
            "Aromatic",
            "Floral"
        ],
        "rating": 4.1,
        "vintage": 2021
    },
    {
        "id": "wine-019",
        "name": "Tempranillo",
        "brand": "Vega Sicilia",
        "type": "Wine",
        "subtype": "Red",
        "abv": 14,
        "volume_ml": 750,
        "price": 199.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Spanish icon with blackberry, tobacco, and cedar aging.",
        "image_url": "https://placehold.co/200x400?text=Vega+Sicilia",
        "tags": [
            "Spain",
            "Aged",
            "Iconic"
        ],
        "rating": 4.9,
        "vintage": 2016
    },
    {
        "id": "wine-020",
        "name": "Gewürztraminer",
        "brand": "Trimbach",
        "type": "Wine",
        "subtype": "White",
        "abv": 13,
        "volume_ml": 750,
        "price": 28.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Alsace Gewürz with lychee, rose petal, and ginger spice.",
        "image_url": "https://placehold.co/200x400?text=Trimbach+Gewurz",
        "tags": [
            "Alsace",
            "Exotic",
            "Aromatic"
        ],
        "rating": 4.5,
        "vintage": 2020
    },
    {
        "id": "vodka-001",
        "name": "Smirnoff No. 21",
        "brand": "Smirnoff",
        "type": "Vodka",
        "subtype": "Classic",
        "abv": 40,
        "volume_ml": 750,
        "price": 16.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Triple-distiled, 10x filtered for crisp purity. The world's #1 vodka.",
        "image_url": "https://placehold.co/200x400?text=Smirnoff+No.21",
        "tags": [
            "Classic",
            "Smooth",
            "Mixable"
        ],
        "rating": 4.0
    },
    {
        "id": "vodka-002",
        "name": "Smirnoff Raspberry",
        "brand": "Smirnoff",
        "type": "Vodka",
        "subtype": "Flavored",
        "abv": 35,
        "volume_ml": 750,
        "price": 18.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Bold raspberry flavor with a sweet finish. Perfect for cocktails.",
        "image_url": "https://placehold.co/200x400?text=Smirnoff+Raspberry",
        "tags": [
            "Flavored",
            "Fruity",
            "Sweet"
        ],
        "rating": 4.2
    },
    {
        "id": "vodka-003",
        "name": "Smirnoff Vanilla",
        "brand": "Smirnoff",
        "type": "Vodka",
        "subtype": "Flavored",
        "abv": 35,
        "volume_ml": 750,
        "price": 18.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Creamy vanilla notes. Ideal for espresso martinis or dessert drinks.",
        "image_url": "https://placehold.co/200x400?text=Smirnoff+Vanilla",
        "tags": [
            "Flavored",
            "Dessert",
            "Vanilla"
        ],
        "rating": 4.1
    },
    {
        "id": "vodka-004",
        "name": "Smirnoff Green Apple",
        "brand": "Smirnoff",
        "type": "Vodka",
        "subtype": "Flavored",
        "abv": 35,
        "volume_ml": 750,
        "price": 18.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Tart green apple flavor. Great with soda or in a sour cocktail.",
        "image_url": "https://placehold.co/200x400?text=Smirnoff+Green+Apple",
        "tags": [
            "Flavored",
            "Tart",
            "Fruity"
        ],
        "rating": 3.9
    },
    {
        "id": "vodka-005",
        "name": "Grey Goose",
        "brand": "Grey Goose",
        "type": "Vodka",
        "subtype": "Premium",
        "abv": 40,
        "volume_ml": 750,
        "price": 32.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "French wheat vodka with a silky texture and subtle sweetness.",
        "image_url": "https://placehold.co/200x400?text=Grey+Goose",
        "tags": [
            "Premium",
            "French",
            "Smooth"
        ],
        "rating": 4.5
    },
    {
        "id": "vodka-006",
        "name": "Tito's Handmade",
        "brand": "Tito's",
        "type": "Vodka",
        "subtype": "Craft",
        "abv": 40,
        "volume_ml": 750,
        "price": 24.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Corn-based vodka distilled 6x. Gluten-free with a clean finish.",
        "image_url": "https://placehold.co/200x400?text=Titos+Vodka",
        "tags": [
            "Craft",
            "Gluten-Free",
            "American"
        ],
        "rating": 4.4
    },
    {
        "id": "vodka-007",
        "name": "Absolut Original",
        "brand": "Absolut",
        "type": "Vodka",
        "subtype": "Classic",
        "abv": 40,
        "volume_ml": 750,
        "price": 22.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Swedish vodka made from winter wheat. Neutral with a hint of grain.",
        "image_url": "https://placehold.co/200x400?text=Absolut+Original",
        "tags": [
            "Classic",
            "Swedish",
            "Versatile"
        ],
        "rating": 4.2
    },
    {
        "id": "vodka-008",
        "name": "New Amsterdam",
        "brand": "New Amsterdam",
        "type": "Vodka",
        "subtype": "Value",
        "abv": 40,
        "volume_ml": 750,
        "price": 14.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Affordable 5x distilled vodka with a clean, crisp profile.",
        "image_url": "https://placehold.co/200x400?text=New+Amsterdam",
        "tags": [
            "Budget",
            "Smooth",
            "American"
        ],
        "rating": 3.8
    },
    {
        "id": "vodka-009",
        "name": "Cîroc",
        "brand": "Cîroc",
        "type": "Vodka",
        "subtype": "Premium",
        "abv": 40,
        "volume_ml": 750,
        "price": 29.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "French vodka made from grapes. Exceptionally smooth with a fruity note.",
        "image_url": "https://placehold.co/200x400?text=Ciroc+Vodka",
        "tags": [
            "Premium",
            "French",
            "Grape-Based"
        ],
        "rating": 4.3
    },
    {
        "id": "vodka-010",
        "name": "Haku",
        "brand": "Haku",
        "type": "Vodka",
        "subtype": "Japanese",
        "abv": 40,
        "volume_ml": 750,
        "price": 34.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Japanese rice vodka with a delicate, slightly sweet finish.",
        "image_url": "https://placehold.co/200x400?text=Haku+Vodka",
        "tags": [
            "Japanese",
            "Rice-Based",
            "Artisanal"
        ],
        "rating": 4.6
    },
    {
        "id": "vodka-011",
        "name": "Belvedere Heritage 176",
        "brand": "Belvedere",
        "type": "Vodka",
        "subtype": "Polish Rye",
        "abv": 40,
        "volume_ml": 750,
        "price": 39.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Polish rye vodka with a creamy texture and hints of vanilla.",
        "image_url": "https://placehold.co/200x400?text=Belvedere+Heritage",
        "tags": [
            "Polish",
            "Rye",
            "Luxury"
        ],
        "rating": 4.7
    },
    {
        "id": "vodka-012",
        "name": "Ketel One Botanical",
        "brand": "Ketel One",
        "type": "Vodka",
        "subtype": "Infused",
        "abv": 30,
        "volume_ml": 750,
        "price": 22.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Naturally infused with fruits and botanicals. Lower ABV for easy sipping.",
        "image_url": "https://placehold.co/200x400?text=Ketel+Botanical",
        "tags": [
            "Infused",
            "Low-ABV",
            "Dutch"
        ],
        "rating": 4.3
    },
    {
        "id": "vodka-013",
        "name": "Chopin Potato",
        "brand": "Chopin",
        "type": "Vodka",
        "subtype": "Potato",
        "abv": 40,
        "volume_ml": 750,
        "price": 29.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Polish potato vodka with a rich, earthy character.",
        "image_url": "https://placehold.co/200x400?text=Chopin+Potato",
        "tags": [
            "Potato",
            "Craft",
            "Earthy"
        ],
        "rating": 4.5
    },
    {
        "id": "vodka-014",
        "name": "Stolichnaya Elit",
        "brand": "Stolichnaya",
        "type": "Vodka",
        "subtype": "Ultra-Premium",
        "abv": 40,
        "volume_ml": 750,
        "price": 49.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Russian vodka filtered through quartz sand and charcoal.",
        "image_url": "https://placehold.co/200x400?text=Stoli+Elit",
        "tags": [
            "Russian",
            "Ultra-Premium",
            "Smooth"
        ],
        "rating": 4.8
    },
    {
        "id": "vodka-015",
        "name": "Reyka",
        "brand": "Reyka",
        "type": "Vodka",
        "subtype": "Icelandic",
        "abv": 40,
        "volume_ml": 750,
        "price": 26.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Distilled with Icelandic glacial water and filtered through lava rocks.",
        "image_url": "https://placehold.co/200x400?text=Reyka",
        "tags": [
            "Icelandic",
            "Glacial",
            "Sustainable"
        ],
        "rating": 4.4
    },
    {
        "id": "vodka-016",
        "name": "Hangar 1 Straight",
        "brand": "Hangar 1",
        "type": "Vodka",
        "subtype": "American Craft",
        "abv": 40,
        "volume_ml": 750,
        "price": 34.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Blend of wheat and grape vodkas. Crisp with a floral nose.",
        "image_url": "https://placehold.co/200x400?text=Hangar+1",
        "tags": [
            "Craft",
            "Small-Batch",
            "California"
        ],
        "rating": 4.6
    },
    {
        "id": "vodka-017",
        "name": "Zubrowka Bison Grass",
        "brand": "Zubrowka",
        "type": "Vodka",
        "subtype": "Flavored",
        "abv": 40,
        "volume_ml": 750,
        "price": 27.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Polish vodka infused with bison grass for a herbal, slightly sweet profile.",
        "image_url": "https://placehold.co/200x400?text=Zubrowka",
        "tags": [
            "Herbal",
            "Polish",
            "Unique"
        ],
        "rating": 4.2
    },
    {
        "id": "vodka-018",
        "name": "Black Cow",
        "brand": "Black Cow",
        "type": "Vodka",
        "subtype": "Milk-Based",
        "abv": 40,
        "volume_ml": 750,
        "price": 44.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "English vodka made from milk whey. Exceptionally creamy.",
        "image_url": "https://placehold.co/200x400?text=Black+Cow",
        "tags": [
            "Milk",
            "Creamy",
            "British"
        ],
        "rating": 4.5
    },
    {
        "id": "vodka-019",
        "name": "Snow Leopard",
        "brand": "Snow Leopard",
        "type": "Vodka",
        "subtype": "Himalayan",
        "abv": 40,
        "volume_ml": 750,
        "price": 31.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Nepalese vodka made with Himalayan spring water and organic grains.",
        "image_url": "https://placehold.co/200x400?text=Snow+Leopard",
        "tags": [
            "Himalayan",
            "Organic",
            "Adventure"
        ],
        "rating": 4.3
    },
    {
        "id": "vodka-020",
        "name": "Ocean Organic",
        "brand": "Ocean",
        "type": "Vodka",
        "subtype": "Sustainable",
        "abv": 40,
        "volume_ml": 750,
        "price": 36.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Hawaiian vodka filtered through coral and blended with deep ocean water.",
        "image_url": "https://placehold.co/200x400?text=Ocean+Vodka",
        "tags": [
            "Sustainable",
            "Hawaiian",
            "Mineral"
        ],
        "rating": 4.4
    },
    {
        "id": "tequila-001",
        "name": "Patrón Silver",
        "brand": "Patrón",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 49.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Ultra-premium blanco with crisp agave and citrus notes.",
        "image_url": "https://placehold.co/200x400?text=Patrón+Silver",
        "tags": [
            "Blanco",
            "Premium",
            "Smooth"
        ],
        "rating": 4.6
    },
    {
        "id": "tequila-002",
        "name": "Don Julio 1942",
        "brand": "Don Julio",
        "type": "Tequila",
        "subtype": "Añejo",
        "abv": 40,
        "volume_ml": 750,
        "price": 149.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Aged 2.5 years in American oak. Caramel and vanilla flavors.",
        "image_url": "https://placehold.co/200x400?text=Don+Julio+1942",
        "tags": [
            "Añejo",
            "Luxury",
            "Aged"
        ],
        "rating": 4.9
    },
    {
        "id": "tequila-003",
        "name": "Espolòn Reposado",
        "brand": "Espolòn",
        "type": "Tequila",
        "subtype": "Reposado",
        "abv": 40,
        "volume_ml": 750,
        "price": 29.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Aged 6 months. Balanced oak and agave with a spicy finish.",
        "image_url": "https://placehold.co/200x400?text=Espolòn+Reposado",
        "tags": [
            "Reposado",
            "Value",
            "Spicy"
        ],
        "rating": 4.4
    },
    {
        "id": "tequila-004",
        "name": "Casamigos Blanco",
        "brand": "Casamigos",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 54.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Smooth with hints of vanilla and agave. Founded by George Clooney.",
        "image_url": "https://placehold.co/200x400?text=Casamigos+Blanco",
        "tags": [
            "Blanco",
            "Celebrity",
            "Smooth"
        ],
        "rating": 4.7
    },
    {
        "id": "tequila-005",
        "name": "Herradura Silver",
        "brand": "Herradura",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 44.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Estate-grown agave with a peppery finish.",
        "image_url": "https://placehold.co/200x400?text=Herradura+Silver",
        "tags": [
            "Blanco",
            "Peppery",
            "Traditional"
        ],
        "rating": 4.5
    },
    {
        "id": "tequila-006",
        "name": "Clase Azul Reposado",
        "brand": "Clase Azul",
        "type": "Tequila",
        "subtype": "Reposado",
        "abv": 40,
        "volume_ml": 750,
        "price": 129.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Aged 8 months in oak. Sweet cooked agave and cinnamon notes.",
        "image_url": "https://placehold.co/200x400?text=Clase+Azul+Reposado",
        "tags": [
            "Reposado",
            "Artisanal",
            "Decorative"
        ],
        "rating": 4.8
    },
    {
        "id": "tequila-007",
        "name": "Jose Cuervo Tradicional Silver",
        "brand": "Jose Cuervo",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 24.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Classic 100% agave tequila with earthy flavors.",
        "image_url": "https://placehold.co/200x400?text=Cuervo+Tradicional",
        "tags": [
            "Blanco",
            "Budget",
            "Classic"
        ],
        "rating": 3.9
    },
    {
        "id": "tequila-008",
        "name": "Avión Reserva 44",
        "brand": "Avión",
        "type": "Tequila",
        "subtype": "Extra Añejo",
        "abv": 40,
        "volume_ml": 750,
        "price": 169.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Aged 44 months. Rich caramel, oak, and dark chocolate notes.",
        "image_url": "https://placehold.co/200x400?text=Avion+44",
        "tags": [
            "Extra Añejo",
            "Ultra-Premium",
            "Sipping"
        ],
        "rating": 4.9
    },
    {
        "id": "tequila-009",
        "name": "Teremana Blanco",
        "brand": "Teremana",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 34.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Dwayne 'The Rock' Johnson's tequila. Smooth with citrus and pepper.",
        "image_url": "https://placehold.co/200x400?text=Teremana+Blanco",
        "tags": [
            "Blanco",
            "Celebrity",
            "Small-Batch"
        ],
        "rating": 4.5
    },
    {
        "id": "tequila-010",
        "name": "1800 Coconut",
        "brand": "1800",
        "type": "Tequila",
        "subtype": "Flavored",
        "abv": 35,
        "volume_ml": 750,
        "price": 27.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Blanco tequila infused with natural coconut flavor.",
        "image_url": "https://placehold.co/200x400?text=1800+Coconut",
        "tags": [
            "Flavored",
            "Tropical",
            "Coconut"
        ],
        "rating": 4.1
    },
    {
        "id": "tequila-011",
        "name": "Fortaleza Blanco",
        "brand": "Fortaleza",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 59.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Traditional stone oven-cooked agave with a bold, earthy profile.",
        "image_url": "https://placehold.co/200x400?text=Fortaleza+Blanco",
        "tags": [
            "Artisanal",
            "Stone Oven",
            "Earthy"
        ],
        "rating": 4.8
    },
    {
        "id": "tequila-012",
        "name": "G4 Reposado",
        "brand": "G4",
        "type": "Tequila",
        "subtype": "Reposado",
        "abv": 40,
        "volume_ml": 750,
        "price": 69.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Aged 6 months in ex-bourbon barrels. Butterscotch and toasted oak notes.",
        "image_url": "https://placehold.co/200x400?text=G4+Reposado",
        "tags": [
            "Small-Batch",
            "Bourbon Barrel",
            "Butterscotch"
        ],
        "rating": 4.7
    },
    {
        "id": "tequila-013",
        "name": "Siete Leguas D'Antaño",
        "brand": "Siete Leguas",
        "type": "Tequila",
        "subtype": "Extra Añejo",
        "abv": 40,
        "volume_ml": 750,
        "price": 199.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Aged 5+ years. Complex flavors of tobacco, dark chocolate, and leather.",
        "image_url": "https://placehold.co/200x400?text=Siete+Leguas+D'Antaño",
        "tags": [
            "Extra Añejo",
            "Aged",
            "Complex"
        ],
        "rating": 4.9
    },
    {
        "id": "tequila-014",
        "name": "Ocho Plata",
        "brand": "Tequila Ocho",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 54.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Single-estate agave with terroir-driven citrus and minerality.",
        "image_url": "https://placehold.co/200x400?text=Ocho+Plata",
        "tags": [
            "Single-Estate",
            "Terroir",
            "Mineral"
        ],
        "rating": 4.6
    },
    {
        "id": "tequila-015",
        "name": "Volcán de Mi Tierra Cristalino",
        "brand": "Volcán de Mi Tierra",
        "type": "Tequila",
        "subtype": "Cristalino",
        "abv": 40,
        "volume_ml": 750,
        "price": 79.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Añejo filtered to remove color while retaining oak complexity.",
        "image_url": "https://placehold.co/200x400?text=Volcán+Cristalino",
        "tags": [
            "Cristalino",
            "Aged",
            "Smooth"
        ],
        "rating": 4.5
    },
    {
        "id": "tequila-016",
        "name": "El Tesoro Paradiso",
        "brand": "El Tesoro",
        "type": "Tequila",
        "subtype": "Extra Añejo",
        "abv": 40,
        "volume_ml": 750,
        "price": 179.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Aged 5 years in cognac casks. Dried fruit and baking spice flavors.",
        "image_url": "https://placehold.co/200x400?text=El+Tesoro+Paradiso",
        "tags": [
            "Cognac Cask",
            "Luxury",
            "Sipping"
        ],
        "rating": 4.9
    },
    {
        "id": "tequila-017",
        "name": "Pasote Blanco",
        "brand": "Pasote",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 49.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Unaged with vibrant agave, pepper, and tropical fruit notes.",
        "image_url": "https://placehold.co/200x400?text=Pasote+Blanco",
        "tags": [
            "Unaged",
            "Tropical",
            "Bright"
        ],
        "rating": 4.4
    },
    {
        "id": "tequila-018",
        "name": "Cascahuín Tahona Blanco",
        "brand": "Cascahuín",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 64.99,
        "in_stock": true,
        "store_id": "store-002",
        "description": "Traditional tahona-crushed agave with a robust, herbaceous profile.",
        "image_url": "https://placehold.co/200x400?text=Cascahuín+Tahona",
        "tags": [
            "Tahona",
            "Herbaceous",
            "Traditional"
        ],
        "rating": 4.7
    },
    {
        "id": "tequila-019",
        "name": "ArteNOM Selección de 1414",
        "brand": "ArteNOM",
        "type": "Tequila",
        "subtype": "Reposado",
        "abv": 40,
        "volume_ml": 750,
        "price": 89.99,
        "in_stock": true,
        "store_id": "store-003",
        "description": "Aged 8 months in American oak. Bold caramel and cinnamon spice.",
        "image_url": "https://placehold.co/200x400?text=ArteNOM+1414",
        "tags": [
            "Single Barrel",
            "Cinnamon",
            "Caramel"
        ],
        "rating": 4.8
    },
    {
        "id": "tequila-020",
        "name": "Wild Common Blanco",
        "brand": "Wild Common",
        "type": "Tequila",
        "subtype": "Blanco",
        "abv": 40,
        "volume_ml": 750,
        "price": 74.99,
        "in_stock": true,
        "store_id": "store-001",
        "description": "Organic agave with a creamy texture and floral-citrus notes.",
        "image_url": "https://placehold.co/200x400?text=Wild+Common",
        "tags": [
            "Organic",
            "Floral",
            "Creamy"
        ],
        "rating": 4.6
    }
];

export const seedInventory = async () => {
  try {
    for (const item of inventoryData) {
      // The path is: /stores/{storeId}/items/{itemId}
      // e.g. /stores/store-002/items/beer-002
      const subcollectionRef = collection(db, "stores", item.store_id, "items");
      const itemDocRef = doc(subcollectionRef, item.id);

      await setDoc(itemDocRef, {
        name: item.name,
        brand: item.brand,
        type: item.type,
        subtype: item.subtype,
        abv: item.abv,
        volume_ml: item.volume_ml,
        price: item.price,
        in_stock: item.in_stock,
        description: item.description,
        image_url: item.image_url,
        tags: item.tags,
        rating: item.rating
      });

      console.log(`Seeded item ${item.id} into store ${item.store_id}!`);
    }
    console.log("Inventory data seeded successfully into store subcollections!");
  } catch (error) {
    console.error("Error seeding inventory:", error);
  }
};