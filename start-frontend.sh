#!/bin/bash
# Start Frontend for Demo

cd frontend

echo "🚀 Starting Frontend..."
echo "================================================"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "⚠️  Installing dependencies..."
    npm install
fi

echo ""
echo "✓ Dependencies ready"
echo ""
echo "Starting frontend on http://localhost:5173"
echo "Press Ctrl+C to stop"
echo ""

npm run dev
