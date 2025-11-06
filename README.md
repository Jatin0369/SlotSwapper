# SlotSwapper

SlotSwapper is a MERN-based peer-to-peer time-slot swapping platform. Users can create calendar events, mark them as swappable, browse others’ swappable slots, and exchange time slots through a request/accept workflow.

## Live Demo

Frontend: https://slot-swapper-five-kappa.vercel.app
Backend API: [<BACKEND_RENDER_URL>](https://slotswapper-ezyn.onrender.com)

## Features
- User authentication (JWT)
- Create / view / delete events
- Mark events as BUSY or SWAPPABLE
- Marketplace of swappable slots
- Send/receive swap requests
- Accept/reject requests
- Ownership swapped automatically on acceptance
- Responsive Tailwind UI

## Tech Stack
- React (Vite)
- Tailwind CSS
- Node.js + Express
- MongoDB Atlas
- JWT Auth

## Folder Structure
SlotSwapper/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   └── .env
└── README.md

## Local Setup

### Clone repo
git clone https://github.com/Jatin0369/SlotSwapper.git

cd SlotSwapper

## Backend Setup
cd backend
npm install

Create `.env`:

MONGO_URI=mongodb_atlas_uri
JWT_SECRET=secret
PORT=5000

Backend → http://localhost:5000

## Frontend Setup
cd ../frontend
npm install
Create `.env`:

VITE_API_URL=http://localhost:5000


Frontend → http://localhost:5173

## API Endpoints

### Auth
POST /auth/signup  
POST /auth/login  

### Events
GET    /events  
POST   /events  
PUT    /events/:id  
DELETE /events/:id  

### Swap
GET    /swap/swappable-slots  
POST   /swap/request  
GET    /swap/incoming  
GET    /swap/outgoing  
POST   /swap/response/:id  

## Swap Logic
1) User marks event as SWAPPABLE  
2) Others view it in marketplace  
3) Request sent with chosen slot  
4) Target user accepts/rejects  
5) If accepted → both event owners swap, status becomes BUSY  
6) If rejected → status reverts  

## Deployment

### Backend → Render
- Root: backend
- Build: npm install
- Start: npm start
- Env: MONGO_URI=
JWT_SECRET=

### Frontend → Vercel
- Root: frontend
- Build: npm run build
- Output: dist
- Env: VITE_API_URL=BACKEND_URL

  ## Env Summary
Backend:
MONGO_URI=
JWT_SECRET=
PORT=

Frontend:
VITE_API_URL=

## Test Users
email: userA@example.com
password: 123456

email: userB@example.com
password: 123456


## Future Enhancements
- WebSocket realtime updates
- Calendar UI
- Email notifications
- Swap history

## Security Notes
- JWT in localStorage
- .env ignored
- HTTPS recommended

## Author
Jatin Malhotra


