# Adit - Task Management Application

Adit is a full-stack task management application consisting of a Node.js/Express backend and a React/Vite/Tailwind CSS frontend. It supports user registration, role-based authorization, and comprehensive task CRUD actions.

---

## Project Structure

```text
├── backend/            # Express.js REST API
└── frontend/           # React SPA (Vite + Tailwind CSS v4)
```

---

## Backend (Express REST API)

The backend is built with Express, Node.js, MongoDB (Mongoose), and utilizes JWT (JSON Web Tokens) stored in HttpOnly cookies for secure session authentication.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Database Instance (local or Atlas)

### Setup & Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=8080
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/adit
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

### Running Locally

To run the backend locally in development mode (with hot reloading via `nodemon`):
```bash
npm run dev
```

The server will start on `http://localhost:8080`.

### API Endpoints

#### Authentication (`/auth`)
- `POST /auth/signup` - Register a new user. Expects `{ name, email, password, role }`.
- `POST /auth/login` - Login user and set HttpOnly session cookie. Expects `{ email, password }`.
- `POST /auth/logout` - Logout user and clear session cookie.
- `GET /auth/me` - Retrieve currently authenticated user context (protected by JWT middleware).

#### Tasks (`/task`)
*All task endpoints are protected and require a valid authenticated session.*
- `GET /task` - List tasks. Admins see all tasks. Regular users see only their own. Supports optional query filtering by status (e.g., `/task?status=PENDING`).
- `GET /task/:id` - Retrieve details for a specific task. Access restricted to creator or admins.
- `POST /task` - Create a new task. Expects `{ title, description, status }`.
- `PUT /task/:id` - Update an existing task. Access restricted to creator or admins. Expects `{ title, description, status }`.
- `DELETE /task/:id` - Delete an existing task. Access restricted to creator or admins.

---

## Frontend (React Single Page Application)

The frontend is built using React, Vite, and Tailwind CSS v4, providing an interactive task management dashboard.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup & Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

### Running Locally

To start the Vite development server locally:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

To compile a highly optimized static bundle of the client application into the `dist/` directory:
```bash
npm run build
```

---

## Deployment & Production Considerations

### 1. Cross-Site Cookies (CORS)
When the frontend and backend are hosted on separate domains (e.g., Frontend on Vercel and Backend on Render), browsers enforce cross-site cookie restrictions:
- In **production**, the backend must issue cookies with `sameSite: "none"` and `secure: true` (requires HTTPS).
- The `CORS_ORIGIN` env variable in the backend must match your production frontend URL (e.g., `https://adit-app.vercel.app`), and `credentials: true` must be enabled.

### 2. Client-Side SPA Routing (Vercel)
If deploying the frontend to Vercel, a `vercel.json` file is required in the `/frontend` directory to handle client-side routing. This rewrites all sub-paths back to the entry point `index.html` to prevent `404 Not Found` errors on page refresh:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
