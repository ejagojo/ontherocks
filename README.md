# On The Rocks


## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

## Cloning and Running the Application in local

Clone the repo
```bash
https://github.com/ejagojo/ontherocks.git
```

Install dependencies
```bash
npm install
```

Start the development server

```bash
npm run dev
```

## Application design

#### Components

1. **StoreLocator** Component : 
- Allows users to view and select a partnered liquor store based on location or inventory.
- Displays real-time store information pulled from a backend service.

2. **Inventory** Component :
- Shows the liquor products available at a selected store, categorized by type (e.g., Vodka, Whiskey, Beer, Wine).
- Provides filtering and searching capabilities to help users quickly find specific items.

3. **Cart** Component:
- Manages the items users have selected for purchase.
- Displays item details, subtotal, taxes, and allows for quantity updates or item removal.

4. **Loyalty Program** Component:
- Tracks and displays user reward points and available promotions.
- Allows users to redeem discounts based on their points balance.