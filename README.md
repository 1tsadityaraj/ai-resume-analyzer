<p align="center">
  <img src="https://img.icons8.com/3d-fluency/94/brain.png" width="80" alt="ATS Logo"/>
</p>

<h1 align="center">🧠 AI Resume Analyzer</h1>

<p align="center">
  <strong>An intelligent, end-to-end Applicant Tracking System (ATS) engineered to streamline recruitment.<br>Powered by Google Gemini AI, it autonomously evaluates resumes against job descriptions to provide instant match scores, <br>identify skill gaps, and surface top candidates—drastically reducing manual screening time.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</p>

<p align="center">
  <strong>🚀 <a href="https://client-blue-xi.vercel.app">Live Demo (Frontend)</a></strong> | <strong>☁️ <a href="https://ai-resume-analyzer-22f8.onrender.com/">Live API (Backend)</a></strong>
</p>

---

## 📸 Screenshots

### Dashboard
> Real-time KPI cards, monthly application trends, and top skills detection — all in one glance.

![Dashboard](./screenshots/dashboard.png)

---

### Resume Analyzer
> Upload a PDF resume and paste a job description. The AI instantly evaluates ATS compatibility, identifies skill gaps, and provides actionable suggestions. Also features a dynamic "Extracted Skills from Resume" visualization section highlighting the exact AI-detected skills.

![Resume Analyzer](./screenshots/resume-analyzer.png)

---

### Candidates
> Browse, search, and filter all analyzed candidates. View detailed analysis with a single click.

![Candidates](./screenshots/candidates.png)

---

### Job Postings
> Create and manage job requisitions. Automatically find candidate matches for active openings and view dynamic intelligent job recommendations with beautifully polished UI progress bars, skill chips, and live metric calculations.

![Job Postings](./screenshots/jobs.png)

---

### Analytics & Insights
> Visualize recruitment data with area charts, bar charts, and donut charts — monthly uploads, score distributions, and top skills at a glance.

![Analytics](./screenshots/analytics.png)

---

### Job Finder
> AI-powered job & internship recommendations naturally mapped from extracted candidate skills. Features fluid hover animations, dynamic match score badges, elegant skeleton loaders, and intelligent edge case handling (e.g., missing apply URLs and graceful empty states).

![Job Finder](./screenshots/job-finder.png)

---

### Settings
> Manage profile information, toggle dark/light theme, and configure your Google Gemini API key.

![Settings](./screenshots/settings.png)

---

## ✨ Core Features & Business Impact

| Feature | Business Value |
|---|---|
| 🤖 **Automated Screening** | Powered by Google Gemini AI, it reads and evaluates resumes instantly, eliminating hours of manual parsing |
| 📊 **Precision Match Scoring** | Delivers objective, percentage-based compatibility scores to help recruiters rank candidates immediately |
| 🔍 **Skill Gap Analysis** | Automatically maps a candidate's skills against job requirements, highlighting exact matches and missing proficiencies |
| 📈 **Recruitment Analytics** | Visualizes application trends, average candidate quality, and top skills through a sleek, real-time dashboard |
| 💼 **Smart Job Sourcing** | Recommends relevant job openings based on a candidate's extracted profile to build dynamic talent pipelines |
| 👥 **Talent Pool Management** | A centralized hub to search, filter, and review analyzed candidates with a single click |
| 📝 **Job Requisitions** | Easily create and manage job postings and defining required skills for the AI to benchmark against |
| ⚡ **Actionable Insights** | Generates tailored improvement suggestions to help candidates optimize their profiles and stand out |
| 🎨 **Premium UX/UI** | Built with an engaging, accessible, and responsive interface featuring dark mode, animations, and zero-loading-state perception |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** with Vite 7 for blazing-fast HMR
- **TailwindCSS 4** for utility-first styling
- **Framer Motion** for smooth animations & transitions
- **Recharts** for interactive data visualizations (Line, Area, Bar, Pie charts)
- **Lucide React** for beautiful, consistent icons
- **SWR** for efficient data fetching & caching
- **React Router DOM v7** for client-side routing

### Backend
- **Node.js** with **Express 5**
- **MongoDB** with **Mongoose** ODM
- **MongoDB Memory Server** for zero-config local development
- **Google Generative AI SDK** (`@google/generative-ai`) for Gemini API integration
- **Multer** for PDF file upload handling
- **pdf-parse** for extracting text content from resumes

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # Design system primitives
│   │   │   ├── AnalysisResult.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── UploadDropzone.jsx
│   │   ├── pages/             # Application pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx       # Resume Analyzer page
│   │   │   ├── Candidates.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── JobFinder.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Settings.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service layer
│   │   └── utils/             # Design system & utilities
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Express Backend
│   ├── controllers/           # Route handlers
│   ├── models/                # Mongoose schemas
│   │   ├── Candidate.js
│   │   ├── Job.js
│   │   └── Settings.js
│   ├── routes/                # API route definitions
│   │   ├── resume.js
│   │   ├── candidateRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── jobFinderRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── settingsRoutes.js
│   ├── services/              # Business logic (AI analysis)
│   ├── uploads/               # Uploaded resume files
│   ├── index.js               # Server entry point
│   └── package.json
│
├── screenshots/               # UI screenshots
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5001
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> **Note:** MongoDB is handled automatically using an in-memory server (`mongodb-memory-server`). No external MongoDB installation is required for local development.

Start the backend server:

```bash
npm run dev
```

The server will start on `http://localhost:5001`.

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

### 4. Open in Browser

Navigate to [http://localhost:5173](http://localhost:5173) and start analyzing resumes! 🎉

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/resume/analyze` | Upload & analyze a resume PDF against a job description |
| `GET` | `/api/candidates` | Get all analyzed candidates |
| `DELETE` | `/api/candidates/:id` | Delete a candidate record |
| `GET` | `/api/jobs` | Get all job postings |
| `POST` | `/api/jobs` | Create a new job posting |
| `DELETE` | `/api/jobs/:id` | Delete a job posting |
| `GET` | `/api/job-finder` | Get AI-powered job recommendations based on candidate skills |
| `GET` | `/api/analytics` | Get analytics data (monthly uploads, score distribution, top skills) |
| `GET` | `/api/settings` | Get application settings |
| `PUT` | `/api/settings` | Update application settings (e.g., API key) |

---

## 🎨 Design Highlights

- **Glassmorphism cards** with subtle shadows and rounded corners
- **Gradient accents** on active navigation and buttons
- **Staggered animations** on page load using Framer Motion
- **Skeleton loading states** for smooth data transitions
- **Responsive layout** with a persistent sidebar navigation
- **Dark mode support** with seamless theme toggling
- **Interactive charts** with hover tooltips and smooth curves
- **Color-coded scoring** — Green (≥80), Yellow (≥50), Red (<50)

---

## 📝 How It Works

1. **Upload Resume** — Drop a PDF resume on the upload zone
2. **Paste Job Description** — Enter the target job's requirements
3. **AI Analysis** — Google Gemini parses your resume text and evaluates it against the job description
4. **Get Results** — View your ATS match score, matched/missing skills, and personalized improvement tips
5. **Find Jobs** — Instantly get AI-curated job recommendations and direct platform search links based on your skills
6. **Track Candidates** — All analyzed resumes are saved and searchable in the Candidates dashboard

---

## 🚀 Deployment

### Backend (Render)
1. Provide the repository access to Render.
2. Set the build command to `npm install` and the start command to `npm start` in the `server` directory.
3. Add your environment variables: `PORT=5001` and `GEMINI_API_KEY`.
4. Deploy the webservice. Your backend API will be available on the Render URL.

### Frontend (Vercel)
1. Ensure your client's `api.js` points to the deployed backend URL (or uses a `VITE_API_URL` env variable).
2. Through the Vercel CLI or Dashboard, import the repository and set the Root Directory to `client`.
3. Vercel automatically detects the Vite framework and runs `npm run build`.
4. Wait for it to deploy and get your live frontend link.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <strong>Aditya Raj</strong>
</p>
