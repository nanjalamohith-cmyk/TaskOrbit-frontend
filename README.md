# TaskOrbit Frontend - 3D Daily Planner

Futuristic, glassmorphic daily task planner web interface with interactive 3D perspective tilt effects, dynamic particle animations, and real-time mission velocity metrics.

## Features
- **Cosmic Glassmorphism Design System**: Translucent cards (`backdrop-filter: blur(16px)`), luminous neon accents, and ambient floating orbs.
- **3D Card Perspective Tilt**: Interactive gyro tilt on hover with dynamic specular reflection glare.
- **Velocity Tracker & Progress Ring**: Live SVG circular progress ring indicating real-time completion percentage.
- **Task Management**:
  - Validated task creation with inline alerts
  - One-click status toggling with celebratory `canvas-confetti` bursts
  - Visual status badges (Pending cyan pulse, Completed green checkmark, Overdue coral tag)
  - Edit task modal & Delete confirmation modal
- **Filter Tabs**: All Missions, In Orbit, Completed with smooth sliding indicator pill.
- **Dark & Light Modes**: Seamless theme switcher persisted in `localStorage`.
- **Toast Notifications**: Built-in notifications for all user actions.

## Tech Stack
- **React 18**
- **Vite**
- **Axios**
- **Canvas-Confetti**
- **Lucide-React Icons**
- **Vanilla CSS**

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure API endpoint in `.env`:
   ```env
   VITE_API_URL=http://localhost:8081/api
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
   *The application will open at `http://localhost:5173`.*
