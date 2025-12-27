# 🌍 Country Explorer Dashboard

A simple responsive React application that allows users to explore country data, view detailed information, check current weather, and manage favorite countries.

Built as part of a React Developer machine test.

---

## 🚀 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Axios
- Context API
- LocalStorage

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/fayiztv/Country-Explorer
cd country-explorer

### 2️⃣ Install dependencies
npm install

### 3️⃣ Start the development server
npm run dev

### The application will run at: http://localhost:5173

---------------

### 🔑 API Key Configuration

This project uses the OpenWeatherMap API for fetching weather data.

Steps to configure:

1 - Create a free account at
https://openweathermap.org/api

2 - Generate an API key

3 - Create a .env file in the project root: VITE_WEATHER_API_KEY=your_api_key_here

4 - Restart the dev server after adding the key: npm run dev

----------------

### ✨ Features

✅ Core Features

 - Fetch and display all countries using REST Countries API

 - Country card view with:
  Flag
  Country name
  Capital
  Region
  Population

 - Pagination (10 countries per page)

 - Search countries by name

 - Filter countries by:
  Region
  Population range

 - Country details page with:
  Flag (large view)
  Capital
  Region & Sub-region
  Population
  Languages
  Time zones

 - Weather information for the capital city:
  Temperature
  Weather condition
  Humidity
  Wind speed

 - Favorites feature:
  Mark / unmark countries
  Persisted using LocalStorage
  Separate Favorites page

----------------

### ⭐ Bonus Features

 - Debounced search input for better performance

 - Client-side API caching to avoid refetching same data

 - Loading states and error handling (invalid city, rate limit)

 - Fully responsive UI (mobile & desktop)

------------------

### 📌 Author

Muhammed Fayiz T V
React / MERN Stack Developer