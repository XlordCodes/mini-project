# 🛡️ Email Phishing Detection System

A machine learning-powered application that analyzes email content to detect phishing attempts.

**Built for:** Project Demonstration
**Tech Stack:** Python FastAPI + React + TypeScript + URLBert ML Model

---

## 🚀 Quick Start (Demo Setup)

### Prerequisites
- Python 3.8+
- Node.js 16+
- Internet connection (to download ML model)

### Step 1: Download ML Model
```bash
cd urlbert-tiny-v4-phishing-classifier
python3 download_model.py
```
*This downloads the URLBert model from Hugging Face (~10-15 MB). Takes 1-2 minutes.*

### Step 2: Install Backend Dependencies
```bash
# Install Python packages
python3 -m pip install -r requirements.txt
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

---

## 🎬 Running the Demo

### Option A: Manual Start (Recommended)

**Terminal 1 - Backend:**
```bash
cd urlbert-tiny-v4-phishing-classifier
python3 phish_api.py
```
Backend runs at: `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: `http://localhost:5173`

### Option B: Using Scripts

**Terminal 1:**
```bash
./start-backend.sh
```

**Terminal 2:**
```bash
./start-frontend.sh
```

---

## 📱 How to Use

1. Open browser to `http://localhost:5173`
2. Paste email content into the text area
3. Click "Analyze Email"
4. See phishing risk percentage

### Test Examples

**Safe Email:**
```
Hi, this is a message from support@google.com
Visit our official site: https://www.google.com
```

**Phishing Email:**
```
URGENT! Your account has been locked.
Click here immediately: http://192.168.1.1/verify@paypal-secure.com
Login now or account will be deleted!
```

---

## 🏗️ Project Structure

```
project/
├── urlbert-tiny-v4-phishing-classifier/  # Backend
│   ├── phish_api.py                      # FastAPI server
│   ├── download_model.py                 # Model downloader
│   ├── requirements.txt                  # Python dependencies
│   └── model.safetensors                 # ML model (after download)
│
├── frontend/                             # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── EmailAnalyzer.tsx         # Main UI component
│   │   ├── App.tsx                       # App container
│   │   └── main.tsx                      # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── .env                                  # Environment variables
├── start-backend.sh                      # Backend startup script
├── start-frontend.sh                     # Frontend startup script
└── README.md                             # This file
```

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if model is downloaded
ls -lh urlbert-tiny-v4-phishing-classifier/model.safetensors

# If file is tiny (< 1 KB), download again
cd urlbert-tiny-v4-phishing-classifier
python3 download_model.py
```

### "pip: command not found"
```bash
# Install pip
curl https://bootstrap.pypa.io/get-pip.py | python3
```

### Frontend can't connect to backend
1. Make sure backend is running on port 8080
2. Check browser console for errors
3. Verify `.env` has: `VITE_API_URL=http://localhost:8080`

### Port already in use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

---

## 📊 About the ML Model

**Model:** URLBert Tiny v4 Phishing Classifier
**Source:** Hugging Face (CrabInHoney/urlbert-tiny-v4-phishing-classifier)
**Accuracy:** 99.07%
**Size:** 3.69M parameters
**Purpose:** Analyzes URLs and text patterns to detect phishing attempts

The model uses BERT (Bidirectional Encoder Representations from Transformers) fine-tuned specifically for URL and phishing detection.

---

## 🎓 Demo Presentation Tips

1. **Show the model download** - Demonstrates you understand ML deployment
2. **Test both safe and phishing examples** - Shows model accuracy
3. **Explain the tech stack** - FastAPI for async API, React for UI, BERT for ML
4. **Discuss real-world applications** - Email clients, browser extensions
5. **Mention limitations** - Model only analyzes text/URLs, not images or attachments

---

## 📝 API Documentation

### POST `/predict`
Analyzes text content for phishing indicators.

**Request:**
```json
{
  "text": "Email content here..."
}
```

**Response:**
```json
{
  "text": "Email content here...",
  "predictions": [
    {
      "class": "phishing",
      "probability": 0.8534
    }
  ]
}
```

---

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **PyTorch** - Deep learning framework
- **Transformers** - Hugging Face library
- **URLBert** - Specialized BERT model

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

---

## ⚠️ Notes for School Project

- This is a **demonstration project** for educational purposes
- Not production-ready (no authentication, rate limiting, etc.)
- Model downloaded from public Hugging Face repository
- Uses localhost connections only
- No data is stored or logged

---

## 📚 Learning Resources

- [URLBert Model](https://huggingface.co/CrabInHoney/urlbert-tiny-v4-phishing-classifier)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Transformers Library](https://huggingface.co/docs/transformers/)

---

## 👥 Credits

- **URLBert Model:** CrabInHoney (Hugging Face)
- **Dataset:** ealvaradob/phishing-dataset
- **Frameworks:** FastAPI, React, PyTorch, Transformers

---

**Project Status:** Demo Ready ✅
**Last Updated:** 2025-10-08
