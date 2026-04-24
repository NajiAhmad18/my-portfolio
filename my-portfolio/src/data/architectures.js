// Architecture configuration for each project.
// Each project has: clients, a gateway layer, services, and a db layer.

export const architectures = {
  1: {
    title: 'Microservices Architecture',
    clients: ['Web Client', 'Mobile App'],
    gateway: { name: 'API Gateway', color: '#3b82f6', role: 'Routes requests, enforces rate limiting & authentication.' },
    services: [
      { id: 'auth',        name: 'Auth Service',     color: '#8b5cf6', role: 'JWT token issuance, OAuth2, and session validation.' },
      { id: 'patient',     name: 'Patient Service',  color: '#10b981', role: 'CRUD for patient profiles, records, and history.' },
      { id: 'doctor',      name: 'Doctor Service',   color: '#14b8a6', role: 'Doctor profiles, availability, and schedule management.' },
      { id: 'appointment', name: 'Booking Service',  color: '#f59e0b', role: 'Appointment creation, conflict detection, and reminders.' },
      { id: 'video',       name: 'Telemedicine',     color: '#ef4444', role: 'WebRTC signaling server for live video consultations.' },
      { id: 'ai',          name: 'AI Diagnostics',   color: '#ec4899', role: 'ML model inference for AI-based symptom checking.' },
      { id: 'payment',     name: 'Payment Service',  color: '#6366f1', role: 'Stripe integration for secure billing and invoicing.' },
      { id: 'notify',      name: 'Notification',     color: '#f97316', role: 'Email & SMS alerts via RabbitMQ message queues.' },
    ],
    db: 'MongoDB / Redis / PostgreSQL',
  },

  2: {
    title: 'MVC REST Architecture',
    clients: ['Web Browser'],
    gateway: { name: 'Express REST API', color: '#ec4899', role: 'MVC router — validates requests and delegates to controllers.' },
    services: [
      { id: 'auth',     name: 'Auth Module',      color: '#8b5cf6', role: 'JWT login, email OTP verification via SendGrid.' },
      { id: 'user',     name: 'User Management',  color: '#3b82f6', role: 'Role-based dashboards: Customer, Provider, Recycler, Admin.' },
      { id: 'service',  name: 'Service Module',   color: '#10b981', role: 'Repair & recycling service listings and bookings.' },
      { id: 'maps',     name: 'Maps Integration', color: '#f59e0b', role: 'Google Maps API for location-based service discovery.' },
      { id: 'track',    name: 'Lifecycle Tracker',color: '#14b8a6', role: 'Tracks product lifecycle from repair to recycling.' },
      { id: 'notify',   name: 'Notification',     color: '#f97316', role: 'SendGrid email alerts for bookings and updates.' },
    ],
    db: 'MongoDB (Mongoose ODM)',
  },

  3: {
    title: 'Full-Stack MERN Architecture',
    clients: ['Web Browser'],
    gateway: { name: 'Express REST API', color: '#14b8a6', role: 'RESTful API layer with MVC architecture and JWT middleware.' },
    services: [
      { id: 'auth',     name: 'Auth Service',     color: '#8b5cf6', role: 'JWT-based user registration, login, and session management.' },
      { id: 'listings', name: 'Listings Module',  color: '#10b981', role: 'Property CRUD: photos, pricing, location, and availability.' },
      { id: 'booking',  name: 'Booking Engine',   color: '#3b82f6', role: 'Stay reservation with availability calendar and conflict checks.' },
      { id: 'reviews',  name: 'Reviews Module',   color: '#f59e0b', role: 'Star ratings and text reviews for properties and hosts.' },
      { id: 'payment',  name: 'Payment Service',  color: '#6366f1', role: 'Secure card processing and booking confirmations.' },
    ],
    db: 'MongoDB Atlas',
  },

  4: {
    title: 'PHP MVC Architecture',
    clients: ['Web Browser'],
    gateway: { name: 'PHP Backend (MVC)', color: '#f59e0b', role: 'PHP router dispatches requests to controllers via MVC pattern.' },
    services: [
      { id: 'auth',     name: 'Auth Module',         color: '#8b5cf6', role: 'Session-based login with role-based access control (RBAC).' },
      { id: 'rx',       name: 'Prescription Upload',  color: '#ef4444', role: 'Secure file upload and digital prescription management.' },
      { id: 'products', name: 'Product Catalogue',   color: '#10b981', role: 'Medicines listing, categories, stock levels, and search.' },
      { id: 'orders',   name: 'Order Processing',    color: '#3b82f6', role: 'Cart management, order placement, and status tracking.' },
      { id: 'admin',    name: 'Admin Dashboard',     color: '#ec4899', role: 'Admin panel for managing inventory, users, and orders.' },
    ],
    db: 'MySQL (Relational)',
  },

  5: {
    title: 'Java Web Application Architecture',
    clients: ['Web Browser'],
    gateway: { name: 'Java Servlet / Controller', color: '#8b5cf6', role: 'HTTP request handler dispatching to business logic layer.' },
    services: [
      { id: 'auth',    name: 'Auth Module',       color: '#3b82f6', role: 'User registration, login, and role-based authorization.' },
      { id: 'auction', name: 'Auction Manager',   color: '#f59e0b', role: 'Create auctions, set start/end times and reserve prices.' },
      { id: 'bidding', name: 'Bid Engine',        color: '#10b981', role: 'Real-time bid placement with outbid detection logic.' },
      { id: 'history', name: 'Bid History',       color: '#ec4899', role: 'Full audit trail of all bids per auction and per user.' },
      { id: 'notify',  name: 'Notification',      color: '#f97316', role: 'Email alerts when a user is outbid or wins an auction.' },
    ],
    db: 'MySQL (JDBC)',
  },
};
