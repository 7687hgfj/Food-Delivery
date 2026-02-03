# Online Food Delivery Order Manager

A full-stack web application to add, manage, filter, and assign food delivery orders with a clean, modern UI.

## Features
- Add orders with validation and auto-generated IDs
- View all orders in a responsive card layout
- Filter by paid status and max delivery distance
- Assign the nearest unpaid order within a distance
- Clear status badges and assignment panel

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express
- State: React hooks
- Data: In-memory array

## Local Development

1. Install dependencies

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

2. Configure environment variables

Create `backend/.env`:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

3. Start the app

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000` by default.

## Deployment
- Frontend: Render
- Backend: Render

Deployment link: `TBD`
https://food-delivery-2-yd1o.onrender.com/
