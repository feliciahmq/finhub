# FinHub - Data Dashboard

This is a Data Dashboard project built using MERN stack, and integrated with simple machine learning predictions using regression-js. This project did not account for proper data visualisations! :>

## Frontend
- Vite + React
- Redux Toolkit
- Material UI
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB

## Getting Started
1. Clone the repository
``` bash
git clone git@github.com:feliciahmq/finhub.git
cd finhub
```
2. Install dependencies for client and server
``` bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server 
npm install
```
3. Set up .env file in server directory
``` bash
MONGO_URL=your_mongodb_connection_string
PORT=5000
```
4. Run application
``` bash
# Run backend server
cd server
npm run dev

# Run frontend client
cd ../client 
npm run dev
```
