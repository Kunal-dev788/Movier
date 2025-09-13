# 🎬 Movie Explorer

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![OMDb API](https://img.shields.io/badge/API-OMDb-orange?logo=imdb)](https://www.omdbapi.com/)

A **React + TypeScript** movie search app powered by the **OMDb API**.  
You can search for movies, view detailed info, rate them with a ⭐ custom star rating system, and maintain your own **Watched List**.  

---

## 🌟 Features
- 🔍 Search movies in real-time using **OMDb API**  
- 📖 View detailed movie info (title, year, runtime, director, actors, genre, plot)  
- ⭐ Rate movies with a custom **star rating system**  
- 📌 Add/remove movies from a **Watched List**  
- 💾 Watched movies are **persisted in localStorage** (via custom `useLocalStorage` hook)  
- 📊 See a summary of your watched movies  
- ⚡ Debounced search for smooth user experience  
- 🎨 Responsive, clean UI with reusable React components  

---

## 🛠️ Tech Stack
- ⚛️ [React](https://react.dev/) (with Hooks)  
- 🟦 [TypeScript](https://www.typescriptlang.org/)  
- 🎞️ [OMDb API](https://www.omdbapi.com/) (for movie data)  
- 🖌️ CSS for styling  

---

## 📸 Screenshots
![App Screenshot](/public/screenshots/demo1.png)  
![App Screenshot](/public/screenshots/demo2.png)
![App Screenshot](/public/screenshots/demo3.png)
![App Screenshot](/public/screenshots/demo4.png)  

## 🎥 Demo Video:
https://github.com/user-attachments/assets/1bc4b235-4667-4ad1-8aae-15c4bc78b267

---

## Project Live on:
👉 https://exploremovier.netlify.app

---

## 🚀 Getting Started

### 1. Clone the repository
- git clone https://github.com/Kunal-dev788/Movier
- cd Movier

### 2. Install dependencies
- npm install

### 3. Add your API key
#### Create a .env file in the root directory and add:
- VITE_OMDB_API_KEY=your_api_key_here

### 4. Run the project
- npm run dev

