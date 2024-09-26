import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  const apiKey = '44243fc4b061f13fef1a63aadcb49006'; 

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('City not found! Please try again.');
      setWeather({});
    }
  };

  return (
    <div className="weather-container">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          className="city-input"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="get-weather-button" onClick={getWeather}>
          Get Weather
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather.main && (
        <div className="weather-info">
          <h2 className="city-name">{weather.name}</h2>
          <p className="temperature">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-description">{weather.weather[0].description}</p>
          <p className="humidity">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
