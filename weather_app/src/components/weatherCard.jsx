// src/WeatherCard.js
import React, { useState } from "react";
import axios from "axios";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8574e698f875817a600e2c9f4f227e19`
      )
      .then((response) => {
        setWeather(response.data);
        setError("");
      })
      .catch((error) => {
        setError("City not found");
        setWeather(null);
      });
  };

  return (
    <div className="card">
      <h2>Weather App</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
