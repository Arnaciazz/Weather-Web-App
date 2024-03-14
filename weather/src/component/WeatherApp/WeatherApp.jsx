import React, { useState } from 'react'; 
import './WeatherApp.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const WeatherApp = () => {
    const api_key = "b88eebb9f43790efe0941aab81b6de2b";
    const [Wicon, setWicon] = useState(cloud_icon); // Initialize with appropriate default value

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`; // Use correct units parameter
        const response = await fetch(url);
        const data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;

        // Adjust weather icon logic
        const iconCode = data.weather[0].icon;
        if (iconCode === '01d' || iconCode === '01n') {
            setWicon(clear_icon);
        } else if (iconCode === '02d' || iconCode === '02n') {
            setWicon(cloud_icon);
        } else if (iconCode === '03d' || iconCode === '03n') {
            setWicon(drizzle_icon);
        } else if (iconCode === '04d' || iconCode === '04n') {
            setWicon(rain_icon); // Change to rain_icon?
        } else if (iconCode === '09d' || iconCode === '09n') {
            setWicon(rain_icon);
        } else if (iconCode === '10d' || iconCode === '10n') {
            setWicon(rain_icon);
        } else if (iconCode === '13d' || iconCode === '13n') {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weatherimage">
                <img src={Wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
