from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import BertTokenizerFast, BertForSequenceClassification
import torch
import os
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model setup
class ModelLoader:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        # Update path to use raw string and correct directory
        self.model_path = "./"
        self.load_model()

    def load_model(self):
        try:
            self.tokenizer = BertTokenizerFast.from_pretrained(self.model_path)
            self.model = BertForSequenceClassification.from_pretrained(self.model_path)
            self.model.to(self.device)
            self.model.eval()  # Set model to evaluation mode
            print(f"Model loaded successfully on {self.device}")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def predict(self, text):
        try:
            # Tokenize input
            inputs = self.tokenizer(
                text,
                return_tensors="pt",
                truncation=True,
                max_length=64,
                padding=True
            )
            inputs = {k: v.to(self.device) for k, v in inputs.items()}

            # Get prediction
            with torch.no_grad():
                outputs = self.model(**inputs)
                probabilities = torch.softmax(outputs.logits, dim=1)
                
            # Get probability of phishing (class 1)
            prob_phishing = float(probabilities[0][1].cpu())
            return prob_phishing
        except Exception as e:
            print(f"Prediction error: {str(e)}")
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
                        "probability": round(phishing_probability, 4)
                    }
                ]
            }
        else:
            return {"error": "Failed to generate prediction"}
    except Exception as e:
        return {"error": str(e)}

# Run server
if __name__ == "__main__":
    print(f"Starting server on http://0.0.0.0:8080")
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")