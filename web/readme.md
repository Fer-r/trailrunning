# Trail Running Web Application

A React-based web application for managing and participating in trail running events.

## 🚀 Features

- User authentication system
- Trail running events listing
- Event registration system
- Responsive design for mobile and desktop
- Protected routes for authenticated users
- Interactive race details with maps (coming soon)

## 📦 Project Structure

```plaintext
src/
├── components/
│   ├── ProtectedRoute - Authentication wrapper component
│   ├── RaceList - Main race listing component
│   └── RaceCard - Individual race display card
├── hooks/
│   └── useFetch - Custom hook for API data fetching
├── context/
│   └── AuthContext - Authentication context provider
└── pages/
    ├── Login - User authentication page
    ├── Home - Landing page with race listings
    └── Profile - User profile page (protected)
```

## 🔧 Environment Setup

This project uses environment variables for configuration. For security reasons, the actual `.env` file is not included in version control.

1. Rename the provided `.env.example` file to `.env`:

```bash
copy .env.example .env
```

2. Update the variables in your new `.env` file with your actual values:

```env
VITE_URL_API=your_api_url # Must NOT end with trailing slash
```

> **Important**: The `.env` file contains sensitive information and is included in `.gitignore`. Never commit this file to version control.

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables as described above
4. Start the development server:

```bash
npm run dev
```

## 💻 Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- Context API for state management

## 📱 Responsive Design

The application is fully responsive with:

- Mobile approach
- Adaptive layouts
- Touch-friendly interfaces

