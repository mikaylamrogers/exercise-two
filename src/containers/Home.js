import React from 'react';

import Header from '../components/Header';

const weatherKey = `e8287c626eae68fcf8dcc499839c724e`;

function Home() {
    // Display:
    // Weather Type (ex. Cloudy)
    // Current Temperature
    // High Temperature
    // Low Temperature
    // Cloudiness
    // Humidity
    // Wind Speed  

    return (
        <div>
            <Header />
            <main className="Home">
                <h2>Weather in Seoul</h2>
                <div className="WeatherInfo">
                    <p>Weather Type: Cloudy</p>
                    <p>Current Temperature: 100 degrees</p>
                    <p>High Temperature: 100 degrees</p>
                    <p>Low Temperature: 80 degrees</p>
                    <p>Cloudiness: 100</p>
                    <p>Humidity: 35%</p>
                    <p>Wind Speed: 3km/h</p>
                </div>
            </main>
        </div>
    );
}

export default Home;