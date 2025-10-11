#!/usr/bin/env python3
"""
Download the URLBert model from Hugging Face
"""
from transformers import BertTokenizerFast, BertForSequenceClassification

print("Downloading URLBert phishing classifier model from Hugging Face...")
print("This may take a few minutes...")

model_name = "CrabInHoney/urlbert-tiny-v4-phishing-classifier"

try:
    tokenizer = BertTokenizerFast.from_pretrained(model_name)
    model = BertForSequenceClassification.from_pretrained(model_name)

    print("\nSaving model to current directory...")
    tokenizer.save_pretrained("./")
    model.save_pretrained("./")

    print("\n✓ Model downloaded successfully!")
    print("You can now run: python3 phish_api.py")

except Exception as e:
    print(f"\n✗ Error downloading model: {e}")
    print("\nPlease ensure you have internet connection and try again.")
    print("You may also need to install: pip install transformers torch")
