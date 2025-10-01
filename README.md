# 🏠 House Price Prediction

A complete **house price prediction project** combining a Flask backend API and a modern Next.js 15 frontend for real-time predictions.

---

## ✨ Project Overview

This project predicts house prices based on key features using machine learning models. The frontend is a **Next.js 15** application, while the backend is built with **Flask** exposing REST API endpoints.

**Main Features Implemented:**
- Flask API serving house price predictions
- Next.js frontend UI connected to the API
- Multiple predictor models: Linear Regression & Random Forest
- Clean input structure: Size, Bedrooms, Bathrooms, Location, Year Built
- Real-time results display on the frontend
- Responsive design for desktop, tablet, and mobile

---

## 🚀 Quick Start

### Backend (Flask)
1. Install dependencies:
bash
pip install -r requirements.txt

npm run dev


🤖 Predictor-1 (Linear Regression)

Simple and fast predictions

Good for baseline estimates

🌲 Predictor-2 (Random Forest)

Handles non-linear patterns

Higher accuracy for complex data

Note: The frontend allows users to select the predictor model and see results instantly.


Example JSON Payload:
{
  "Size_sqft": 2500,
  "Bedrooms": 3,
  "Bathrooms": 2,
  "Location": "Suburb",
  "YearBuilt": 2010,
  "model": "rf"
}


🛠️ Tech Stack

Backend: Flask, Python, Scikit-learn, Pandas

Frontend: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Lucide React

Machine Learning Models: Linear Regression, Random Forest

📱 Responsive Design

The frontend works seamlessly across:

Desktop (1024px+)

Tablet (768px - 1023px)

Mobile (320px - 767px)

🎨 Design Features

Modern card UI with gradients and shadows

Easy-to-use form inputs

Real-time prediction results

Predictor selection for comparison



=== Thanks You 






