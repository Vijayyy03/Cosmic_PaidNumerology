# Numerology Report Platform

A modern, conversion-optimized numerology report generator with React frontend and FastAPI backend.

## 🚀 Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` with demo mode enabled by default.

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
# Or directly with uvicorn:
# uvicorn main:app --reload --port 8001
```

The API runs on `http://localhost:8000`.

---

## 📁 Project Structure

```
Cosmic_PaidNumerology/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # UI Components
│   │   │   ├── Hero.jsx
│   │   │   ├── WhatIsNumerology.jsx
│   │   │   ├── WhyThisReport.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── NumerologyForm.jsx
│   │   │   ├── ReportDisplay.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── api.js        # API client
│   │   ├── App.jsx           # Main app
│   │   └── index.css         # Tailwind styles
│   └── package.json
│
├── backend/                  # Python FastAPI
│   ├── app/
│   │   ├── numerology.py     # Calculation engine
│   │   └── sheets.py         # Google Sheets integration
│   ├── main.py               # FastAPI app
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## 🔧 Configuration

### Frontend Environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

### Backend Environment

Copy `backend/.env.example` to `backend/.env`:

```env
FRONTEND_URL=http://localhost:5173
PORT=8000
GOOGLE_SHEETS_CREDENTIALS_FILE=credentials.json
GOOGLE_SHEET_ID=your_spreadsheet_id
```

---

## 📊 Google Sheets Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google Sheets API
3. Create a Service Account and download the JSON credentials
4. Save as `backend/credentials.json`
5. Create a Google Sheet and share it with the service account email
6. Copy the Sheet ID from the URL and add to `.env`

**Sheet Structure:**
| Timestamp | Name | Gender | DOB | Language | Life Path # | Destiny # | Status |

---

## 🎨 Features

- **Single-page design** - Smooth scroll between sections
- **Cosmic theme** - Deep purple, gold accents, star animations
- **Form validation** - Real-time inline validation
- **Demo mode** - Works without backend for testing
- **Google Sheets** - Automatic data storage
- **Responsive** - Mobile-first design

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/numerology/generate` | Generate report |

### Generate Report Request

```json
{
  "name": "John Doe",
  "gender": "Male",
  "dob": "15-06-1990",
  "language": "English"
}
```

---

## 🚀 Deployment

### Frontend → Vercel/Netlify

```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend → Render/Railway

Use `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## 📝 License

MIT
