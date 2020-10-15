import React, {  useState, useEffect, useMemo  } from 'react';
import axios from 'axios';
import {  useHistory  } from 'react-router-dom';

import Header from '../components/Header';
import WeatherImage from "../components/WeatherImage";

const weatherKey = `e8287c626eae68fcf8dcc499839c724e`;

function Home() {
    const history = useHistory();

    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Chicago");

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`
            )
            .then(function (response) {
                // successful request
                const weather = response.data;
                setWeatherData(weather);
            })
            .catch(function (error) {
                // error
                console.log(error);
            });
    }, [city]);

    useEffect(() => {   
        const searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        const city = urlParams.get("city");
        if (city) {
            setCity(city);
        }
    }, [history]);

    const { 
        cloudiness,
        cloudinessValue,
        currentTemp, 
        highTemp, 
        humidity,
        lowTemp, 
        weatherType,
        windSpeed,
    } = useMemo(() => {
        let cloudiness = '';
        let cloudinessValue = 0;
        let currentTemp = '';
        let highTemp = '';
        let humidity = '';
        let lowTemp = '';
        let weatherType = '';
        let windSpeed = '';

        if (weatherData) {
            cloudiness = weatherData.clouds.all + '%'; // Type: String (not always able to do math)
            cloudinessValue = weatherData.clouds.all; // Type: Number (can do math)
            currentTemp = Math.round(weatherData.main.temp) + '°';
            highTemp = Math.round(weatherData.main.temp_max) + '°';
            humidity = weatherData.main.humidity + '%';
            lowTemp = Math.round(weatherData.main.temp_min) + '°';
            weatherType = weatherData.weather[0].description;
            windSpeed = weatherData.wind.speed + ' m/h';
        }

        return { 
            cloudiness,
            cloudinessValue,
            currentTemp,
            highTemp,
            humidity,
            lowTemp,
            weatherType,
            windSpeed,
         };
    }, [weatherData]);

    // Display:
    // Weather Type (ex. Cloudy)
    // Current Temperature
    // High Temperature
    // Low Temperature
    // Cloudiness
    // Humidity
    // Wind Speed  

    console.log("weatherData", weatherData);

    return (
        <div>
            <Header />
            <main className="Home" >
                <div className="Head" style={{ background: `linear-gradient(rgba(${parseInt(currentTemp.slice(0, -1)) > 80 ? "255, 0, 195" : "0, 195, 255"}, ${parseInt(cloudiness.slice(0, -1)) / 250 + 1}), rgba(${parseInt(currentTemp.slice(0, -1)) > 80 ? "255, 162, 0" : "211, 145, 235"}, ${parseInt(cloudiness.slice(0, -1)) / 150 + .5 }))`, }} >
                    <h2 className="city"> {city} </h2>
                        <div className="navBar">   
                            {/* OTHER CITIES */}
                            <nav>                             
                                <a href="/?city=Manila">manila</a>
                                <a href="/?city=Paris">paris</a>
                                <a href="/?city=Honolulu">honolulu</a>
                                <a href="/?city=Philadelphia">philly</a>
                            </nav>
                        </div>
                </div>


                    {/* ICON */}
                    <div className="WeatherInfo_Display">
                        <div className="Icon"><WeatherImage weatherType={weatherType}  /></div>
                        <h3 className="weatherInfo_Current">{currentTemp}</h3>
                    </div>
                     
                     
                <div className="WeatherInfo"  >
                <p className="weatherInfo_Type">"{weatherType}"</p>

                    <table>
                        
                        <tr>
                            <td><p className="WeatherDetails">high temperature </p></td>
                            <td><p className="Numbers">{highTemp}</p></td>
                        </tr>

                        <tr>
                            <td><p className="WeatherDetails">low temperature </p></td>
                            <td><p className="Numbers">{lowTemp}</p></td>
                        </tr>

                        <tr>
                            <td><p className="WeatherDetails">cloudiness </p></td>
                            <td><p className="Numbers">{cloudiness}</p></td>
                        </tr>

                        <tr>
                            <td><p className="WeatherDetails">humidity </p></td>
                            <td><p className="Numbers">{humidity}</p></td>
                        </tr>

                        <tr>
                            <td><p className="WeatherDetails">wind speed </p></td>
                            <td><p className="Numbers">{windSpeed}</p></td>
                        </tr>
                    </table>


                </div>
            </main>
        </div>
    );
}

export default Home;