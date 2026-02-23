import logging
import os
from pathlib import Path

import torch
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BertForSequenceClassification, BertTokenizerFast

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Phishing URL Classifier API",
    description="API for classifying URLs as phishing or legitimate using BERT",
    version="1.0.0",
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Model setup
class ModelLoader:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        # Use the directory containing this script for model path resolution
        self.model_path = Path(__file__).parent.resolve()
        self.load_model()

    def load_model(self):
        try:
            self.tokenizer = BertTokenizerFast.from_pretrained(self.model_path)
            self.model = BertForSequenceClassification.from_pretrained(self.model_path)
            self.model.to(self.device)
            self.model.eval()
            logger.info(f"Model loaded successfully on {self.device}")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise

    def predict(self, text):
        try:
            inputs = self.tokenizer(
                text,
                return_tensors="pt",
                truncation=True,
                max_length=64,
                padding=True,
            )
            inputs = {k: v.to(self.device) for k, v in inputs.items()}

            with torch.no_grad():
                outputs = self.model(**inputs)
                probabilities = torch.softmax(outputs.logits, dim=1)

            prob_phishing = float(probabilities[0][1].cpu())
            return prob_phishing
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            return None


# Initialize model
model_loader = ModelLoader()


# Request model
class Query(BaseModel):
    text: str


# Prediction endpoint
@app.post("/predict")
async def predict(query: Query):
    try:
        phishing_probability = model_loader.predict(query.text)
        if phishing_probability is not None:
            return {
                "text": query.text,
                "predictions": [
                    {
                        "class": "phishing" if phishing_probability > 0.5 else "legitimate",
                        "probability": round(phishing_probability, 4),
                    }
                ],
            }
        else:
            return {"error": "Failed to generate prediction"}
    except Exception as e:
        return {"error": str(e)}


# Health check endpoint
@app.get("/health")
async def health():
    return {"status": "healthy"}


# Run server
if __name__ == "__main__":
    logger.info("Starting server on http://0.0.0.0:8080")
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
