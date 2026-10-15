# ShadowIntern

<p align="center">
  <strong>Simulate the Internship. Build the Experience. Earn Your Edge.</strong>
</p>

ShadowIntern is a gamified software internship simulation platform designed to help aspiring developers experience the workflows, challenges, and expectations of a professional engineering team.

It brings together simulated workplace tasks, AI-generated mentorship, code reviews, peer collaboration, career progression, and performance tracking in a single interactive dashboard.

> **Project status:** Prototype / active development. Some workflows use mock data and in-memory storage. AI-powered features require a valid Gemini API key.

## ✨ Features

### 👤 Shadow Profile
- Personalized developer profile and technical role selection.
- Shadow Score and XP-based progression.
- Competency tracking across code quality, architecture, security, debugging, collaboration, and documentation.
- Work history, certifications, and internship progress.
- Time tracking for simulated internship sessions.

### 💻 Internship Simulation Hub
- Explore simulated internship tracks inspired by software engineering roles.
- Track internship progress, deadlines, and sprint activity.
- Clock in and clock out of simulated work sessions.
- Practice handling tasks and workplace scenarios.
- Track performance through a gamified scoring system.

### 🤖 AI-Powered Workplace Simulations
Powered by the Google GenAI SDK, the backend includes AI-assisted features such as:

- **AI Code Evaluation:** Evaluate code submissions and receive structured feedback.
- **Peer Review:** Generate code snippets containing bugs and practice reviewing them.
- **Engineering Manager Guidance:** Receive simulated workplace guidance based on sprint progress.
- **Workplace Events:** Experience simulated stand-ups, bug reports, and changing priorities.
- **Team Chat:** Interact with AI-generated workplace personas.
- **Daily Check-ins:** Generate stand-up prompts and progress-related messages.

### 🗺️ Career Roadmap
- Visualize progress toward selected career paths.
- Track company-related milestones and progression.
- Explore skills and competencies relevant to different technical tracks.

### 🛍️ Internship Marketplace
- Browse simulated internship tracks.
- Explore track requirements, difficulty levels, duration, skills, and pricing.
- Discover locked and available tracks.
- View company-inspired opportunities across multiple technical domains.

### 📊 Analytics and Progress Visualization
- Interactive charts for competency and performance data.
- Progress indicators and activity summaries.
- Gamified scoring to encourage consistent learning.
- Visual feedback on simulated work submissions.

### ⌨️ Interactive Dashboard
- Responsive dashboard layout.
- Command palette for navigating key sections.
- Animated interface components and transitions.
- Searchable command actions and keyboard shortcuts.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Vite | Frontend tooling and production builds |
| Tailwind CSS 4 | Utility-first styling |
| Motion | Animations and interactive transitions |
| Recharts | Charts and performance visualization |
| Lucide React | Interface icons |
| Express.js | Backend server and API routes |
| Google GenAI SDK | AI-powered simulation features |
| Firebase | Dependency included in the project; integration should be verified before deployment |
| React Markdown | Markdown rendering |
| clsx and tailwind-merge | Conditional and conflict-aware CSS classes |

## 🚀 Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — a current version compatible with the project's dependencies.
- npm.
- Git.
- A Google Gemini API key if you want to use the AI-powered features.

### 1. Clone the repository

```bash
git clone https://github.com/Raveesh06/ShadowIntern.git
cd ShadowIntern
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Obtain an API key from [Google AI Studio](https://aistudio.google.com/).

Keep the API key private. Do not commit your `.env` file or expose server-side secrets in frontend code.

Some interface features can be explored without an API key, but AI-powered API requests may fail until the key is configured.

### 4. Start the development server

```bash
npm run dev
```

The Express server is configured to run on port `3000`.

Open the application at:

**http://localhost:3000**

If port 3000 is already in use, stop the conflicting process or update the server configuration.

## 📁 Project Structure

```text
ShadowIntern/
├── src/
│   ├── App.tsx          # Main application and UI components
│   ├── main.tsx         # React application entry point
│   ├── index.css        # Global styles and design tokens
│   └── lib/
│       └── utils.ts     # Shared styling utility
├── server.ts            # Express server and API endpoints
├── index.html           # HTML entry point
├── package.json         # Dependencies and npm scripts
├── package-lock.json    # Dependency lockfile, if present
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

Additional configuration files and assets may exist in the repository.

## 🔌 API Overview

The Express backend exposes endpoints for authentication, simulation, workplace interactions, and AI-assisted feedback.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | Create a simulated user account |
| POST | `/api/auth/login` | Authenticate against the prototype's in-memory user data |
| GET | `/api/profile` | Retrieve a user profile |
| GET | `/api/tracks` | Retrieve available internship tracks |
| POST | `/api/simulation/clock
