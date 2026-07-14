<h1 align="center">
  <br />
  ✦ Naji Ahmad Javahir — Portfolio
  <br />
</h1>

<p align="center">
  <strong>A production-grade, full-stack personal portfolio with an interactive 3D UI, a RESTful backend, and a custom-built CMS admin panel.</strong>
</p>

<p align="center">
  <a href="https://najiahmad.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-najiahmad.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
   
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
   
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
   
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<br />

---

## 📌 Overview

This is a **full-stack portfolio application** built from the ground up to showcase projects, skills, articles, and coding profiles — with a live backend, file upload support, and a dedicated admin panel for content management.

The project is split into three independent workspaces:

| Workspace        | Description                           | Port     |
| ---------------- | ------------------------------------- | -------- |
| `my-portfolio` | Public-facing React + Vite frontend   | `5173` |
| `server`       | Express.js REST API + MongoDB backend | `5001` |
| `admin-panel`  | Private React CMS dashboard           | `5174` |

---

## ✨ Features

### 🌐 Portfolio Frontend (`my-portfolio`)

- **Interactive 3D background** powered by Three.js / React Three Fiber with WebGL detection & graceful fallback
- **Particle system** with `@tsparticles` for ambient visual effects
- **Smooth page transitions** via Framer Motion with `AnimatePresence`
- **Dynamic content** — Projects, Skills, and Settings fetched live from the backend API
- **Contact form** with EmailJS integration (no backend required for emails)
- **Resume download** served directly from the backend
- **Sections:** Hero · About · Skills · Projects · Articles · Coding Profiles · CTA · Contact
- **Fully responsive** layout with dark-mode design
- **SEO optimized** with Open Graph, Twitter Card, and meta tags
- **Deployed on Vercel** with SPA rewrite rules

### ⚙️ Backend API (`server`)

- **Express.js** REST API (v5)
- **MongoDB Atlas** via Mongoose ODM
- **File uploads** with Multer (PDF resume management)
- **CORS** enabled for cross-origin frontend requests
- **Static file serving** for uploaded assets
- **Models:** `Project` · `Skill` · `Message` · `Settings`

#### API Endpoints

| Method     | Endpoint                   | Description                |
| ---------- | -------------------------- | -------------------------- |
| `GET`    | `/api/projects`          | Fetch all projects         |
| `POST`   | `/api/projects`          | Create a new project       |
| `PUT`    | `/api/projects/:id`      | Update a project           |
| `DELETE` | `/api/projects/:id`      | Delete a project           |
| `GET`    | `/api/skills`            | Fetch all skills           |
| `POST`   | `/api/skills`            | Add a new skill            |
| `GET`    | `/api/messages`          | Fetch all contact messages |
| `POST`   | `/api/messages`          | Submit a contact message   |
| `PUT`    | `/api/messages/:id/read` | Mark a message as read     |
| `DELETE` | `/api/messages/:id`      | Delete a message           |
| `GET`    | `/api/settings`          | Fetch site settings        |
| `POST`   | `/api/settings`          | Update site settings       |
| `POST`   | `/api/upload-resume`     | Upload a PDF resume        |

### 🛠️ Admin Panel (`admin-panel`)

- Private CMS dashboard built with React 19 + Vite
- Manage **Projects**, **Skills**, **Messages**, and **Site Settings**
- Resume **upload & replacement** UI
- Smooth transitions powered by Framer Motion
- Icons via Lucide React & React Icons
- Communicates with the backend via Axios

---

## 🧰 Tech Stack

### Frontend

| Technology                   | Purpose                       |
| ---------------------------- | ----------------------------- |
| React 18                     | UI framework                  |
| Vite 5                       | Build tool & dev server       |
| React Router v7              | Client-side routing           |
| Framer Motion                | Animations & page transitions |
| Three.js + React Three Fiber | 3D scene rendering            |
| @tsparticles                 | Particle background effects   |
| EmailJS                      | Client-side email delivery    |
| React Icons                  | Icon library                  |

### Backend

| Technology           | Purpose                         |
| -------------------- | ------------------------------- |
| Node.js + Express 5  | REST API server                 |
| MongoDB + Mongoose 9 | Database & ODM                  |
| Multer               | File/resume upload handling     |
| dotenv               | Environment variable management |
| CORS                 | Cross-origin resource sharing   |
| Nodemon              | Development auto-restart        |

### Admin Panel

| Technology      | Purpose                   |
| --------------- | ------------------------- |
| React 19        | UI framework              |
| Vite 8          | Build tool                |
| Axios           | HTTP client for API calls |
| Framer Motion   | UI animations             |
| Lucide React    | Icon set                  |
| React Router v7 | Navigation                |

---

## 📁 Project Structure

```
Portfolio/
├── my-portfolio/          # Public-facing frontend
│   ├── src/
│   │   ├── components/    # UI sections (Hero, About, Projects, …)
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── Skills/
│   │   │   ├── Projects/
│   │   │   ├── Articles/
│   │   │   ├── CodingProfiles/
│   │   │   ├── Contact/
│   │   │   ├── Footer/
│   │   │   └── Navbar/
│   │   ├── data/          # Static data (skills, projects, articles)
│   │   ├── hooks/         # Custom React hooks (useSettings, …)
│   │   ├── context/       # React context providers
│   │   └── styles/        # Global CSS stylesheets
│   ├── public/            # Static assets
│   ├── vercel.json        # Vercel SPA rewrite rules
│   └── vite.config.js
│
├── server/                # Express REST API
│   ├── models/            # Mongoose schemas
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Message.js
│   │   └── Settings.js
│   ├── uploads/           # Uploaded resume files (git-ignored)
│   ├── scripts/           # Utility/seed scripts
│   └── index.js           # Main server entry point
│
└── admin-panel/           # Private CMS dashboard
    ├── src/
    │   ├── components/
    │   │   └── Admin/     # All admin UI panels
    │   ├── data/
    │   ├── hooks/
    │   └── styles/
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A **MongoDB Atlas** cluster URI (or a local MongoDB instance)

---

### 1. Clone the Repository

```bash
git clone https://github.com/NajiAhmad18/my-portfolio.git
cd Portfolio
```

---

### 2. Set Up the Backend Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
PORT=5001
```

Start the development server:

```bash
npm run dev
```

The API will be running at `http://localhost:5001`.

---

### 3. Set Up the Portfolio Frontend

```bash
cd ../my-portfolio
npm install
npm run dev
```

The portfolio will be running at `http://localhost:5173`.

> **Note:** The frontend fetches projects, skills, and settings from the backend. Make sure the server is running first.

---

### 4. Set Up the Admin Panel

```bash
cd ../admin-panel
npm install
npm run dev
```

The admin panel will be running at `http://localhost:5174`.

---

## 🌍 Deployment

### Frontend — Vercel

The `my-portfolio` workspace is deployed on **Vercel**. The `vercel.json` configures SPA rewrites so all routes resolve to `index.html`.

```bash
cd my-portfolio
npm run build
# Deploy via Vercel CLI or push to a connected GitHub repo
```

### Backend — Any Node.js Host

Deploy the `server/` directory to any Node.js-compatible platform (Railway, Render, Fly.io, etc.). Ensure the `MONGODB_URI` and `PORT` environment variables are set in the hosting environment.

---

## 🔑 Environment Variables

| Variable        | Location        | Description                                           |
| --------------- | --------------- | ----------------------------------------------------- |
| `MONGODB_URI` | `server/.env` | MongoDB Atlas connection string                       |
| `PORT`        | `server/.env` | Port the Express server listens on (default:`5001`) |

---

## 🧑‍💻 Author

**Naji Ahmad Javahir**Full-Stack Software Engineer

- 🌐 Portfolio: [najiahmad.vercel.app](https://najiahmad.vercel.app/)
- 💼 GitHub: [@NajiAhmad18](https://github.com/NajiAhmad18)

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).

---

<p align="center">
  Built with ☕ and way too many browser tabs.
</p>
