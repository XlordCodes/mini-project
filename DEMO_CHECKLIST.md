# ✅ Demo Setup Checklist

Use this checklist before your presentation to ensure everything works!

---

## Before Demo Day

### 1. Download the Model ⬇️
```bash
cd urlbert-tiny-v4-phishing-classifier
python3 download_model.py
```
- [ ] Model downloaded successfully
- [ ] File size is > 1 MB (check with `ls -lh model.safetensors`)

### 2. Test Backend 🔧
```bash
cd urlbert-tiny-v4-phishing-classifier
python3 phish_api.py
```
- [ ] No error messages
- [ ] Shows "Model loaded successfully"
- [ ] Shows "Starting server on http://0.0.0.0:8080"
- [ ] Press Ctrl+C to stop

### 3. Test Frontend 💻
```bash
cd frontend
npm install
npm run dev
```
- [ ] No error messages
- [ ] Browser opens to http://localhost:5173
- [ ] UI loads correctly
- [ ] Press Ctrl+C to stop

### 4. Test Full Integration 🔗
With both backend and frontend running:
- [ ] Paste test email in text box
- [ ] Click "Analyze Email"
- [ ] Risk percentage appears
- [ ] No errors in browser console (F12)

---

## Test Examples Ready

### Safe Email Example
```
Hello,

Thank you for contacting Google Support.
Please visit our official website: https://www.google.com

Best regards,
Google Team
```
**Expected Result:** Low risk (< 30%)

### Phishing Email Example
```
URGENT SECURITY ALERT!

Your account has been compromised. Click here NOW:
http://192.168.1.1/secure-login@paypal.com

If you don't verify within 24 hours, your account will be deleted!
```
**Expected Result:** High risk (> 70%)

---

## Demo Day - Start Sequence

### 15 Minutes Before Presentation
1. Open 2 terminal windows
2. Navigate to project folder in both

### Terminal 1 - Backend
```bash
cd urlbert-tiny-v4-phishing-classifier
python3 phish_api.py
```
Wait for "Model loaded successfully"

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Wait for "Local: http://localhost:5173"

### Browser
- Open: http://localhost:5173
- Have both test examples ready in a text file
- Test once before presenting

---

## What to Show

1. **Introduction** (1 min)
   - Explain phishing problem
   - Show the UI

2. **Safe Email Demo** (2 min)
   - Paste safe example
   - Click Analyze
   - Show low risk score
   - Explain why it's safe

3. **Phishing Email Demo** (2 min)
   - Paste phishing example
   - Click Analyze
   - Show high risk score
   - Point out suspicious indicators

4. **Technical Overview** (2 min)
   - Backend: FastAPI + URLBert ML model
   - Frontend: React + TypeScript
   - 99% accuracy model from Hugging Face
   - Real-time analysis

---

## Troubleshooting During Demo

### Backend not responding
- Check Terminal 1 - is it running?
- Look for error messages
- Restart: Ctrl+C, then `python3 phish_api.py`

### Frontend shows error
- Check browser console (F12)
- Verify backend is running
- Check URL is http://localhost:5173

### "Cannot connect to backend"
- Is backend running on port 8080?
- Restart both backend and frontend
- Check .env file has correct API URL

---

## Questions You Might Get

**Q: How accurate is the model?**
A: 99.07% accuracy on the phishing dataset. Uses URLBert, a specialized BERT model trained on phishing URLs.

**Q: What does it analyze?**
A: It analyzes text patterns, URL structures, and suspicious indicators like IP addresses, redirects, and urgent language.

**Q: How long did this take to build?**
A: [Your answer - mention learning ML integration, FastAPI, React, etc.]

**Q: Could this be production-ready?**
A: Not yet - would need authentication, rate limiting, logging, and proper security measures for production.

**Q: What technologies did you use?**
A: Backend: Python, FastAPI, PyTorch, Transformers. Frontend: React, TypeScript, Vite, Tailwind CSS.

---

## Emergency Backup Plan

If live demo fails:
1. Have screenshots ready
2. Have a recorded video demo
3. Explain the architecture on paper
4. Show the code in your editor

---

## Final Checks (5 min before)

- [ ] Both terminals open and ready
- [ ] Backend starts without errors
- [ ] Frontend loads correctly
- [ ] Tested both examples successfully
- [ ] Browser window positioned for audience viewing
- [ ] Terminal text size increased for visibility
- [ ] Test examples in text file ready to copy-paste

---

**Good luck with your presentation! 🎓**
