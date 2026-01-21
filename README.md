# MEAN Coding Test (Node v20 + Angular v16 + TypeScript)

## Tech
- Node.js v20 + Express + TypeScript
- MongoDB (Products + Orders)
- MySQL (Users)
- JWT Auth + bcrypt
- Angular v16 frontend

## ENV File Fields
PORT=3000
MONGO_URI=mongodb_url
MYSQL_HOST=user
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=database
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=7d
OPENWEATHER_API_KEY=API_KEY

## Backend Setup
cd task-backend
npm install
cp .env.example .env
npm run dev

## Frontend Setup
cd task-frontend
npm install
ng serve

## Routes
POST /api/auth/register
POST /api/auth/login

CRUD /api/products (protected)
CRUD /api/orders (protected)

GET /api/weather?city=Ahmedabad (protected)

## Notes
- Products & Orders stored in MongoDB
- Users stored in MySQL
