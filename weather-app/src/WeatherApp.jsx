import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); 
  
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    } else {
      fetchWeather('New York');
    }
  }, []);
  
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const apiKey = '44243fc4b061f13fef1a63aadcb49006'; 
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`);
      setWeather(response.data);
      localStorage.setItem('lastCity', cityName); // Store last searched city
    } catch (err) {
      setError('City not found');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (weather) {
      fetchWeather(weather.name); 
    }
  };

  return (
    <div className="weather-container">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          className="city-input"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="get-weather-button" onClick={handleSearch}>
          Get Weather
        </button>
      </div>
      <button className="toggle-unit-button" onClick={toggleUnit}>
        Switch to {unit === 'metric' ? '°F' : '°C'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2 className="city-name">{weather.name}</h2>
          <p className="temperature">{Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p className="weather-description">{weather.weather[0].description}</p>
          <p className="humidity">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
