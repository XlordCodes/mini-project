#!/bin/bash
# Start Backend Server for Demo

cd urlbert-tiny-v4-phishing-classifier

echo "🚀 Starting Phishing Detection Backend..."
echo "================================================"

# Check if model exists
if [ ! -f "model.safetensors" ] || [ $(stat -f%z "model.safetensors" 2>/dev/null || stat -c%s "model.safetensors" 2>/dev/null) -lt 1000 ]; then
    echo "❌ Model file missing or corrupted!"
    echo ""
    echo "Please download the model first:"
    echo "  python3 download_model.py"
    echo ""
    exit 1
fi

# Check if dependencies are installed
python3 -c "import fastapi, uvicorn, transformers, torch" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  Missing dependencies. Installing..."
    python3 -m pip install -r requirements.txt --quiet
fi

echo ""
echo "✓ Model loaded"
echo "✓ Dependencies installed"
echo ""
echo "Starting server on http://localhost:8080"
echo "Press Ctrl+C to stop"
echo ""

python3 phish_api.py
