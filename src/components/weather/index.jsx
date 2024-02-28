import React, { useEffect, useState } from 'react'
import './styles.css'
import { Input } from '@mui/material'

export default function Weather() {
    const [inputValue, setInputValue] = useState("karachi")
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData()
    }, [inputValue])

    const fetchData = () => {
        const api = `https://api.weatherapi.com/v1/forecast.json?key=91b4369798474fee84b51233233010&q=${inputValue}&days=3&aqi=no`

        fetch(api)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setWeatherData(data);
                setError(null);
                // console.log("weather-->", data.forecast.forecastday[0].day.avgtemp_c)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setWeatherData(null);
                setError('Error fetching weather data. Please try again later.');
            });
    }

    return (
        <div>
            <div className='container-body'>
                <h1 className='header'>Weather-App
                    {weatherData && <img src={weatherData.forecast.forecastday[0].day.condition.icon} alt={weatherData.forecast.forecastday[0].day.condition.text} />
                    }
                </h1>
                <Input
                    placeholder="Enter city name"
                    style={{ width: "90%", margin: '10px' }}
                    onChange={(e) => setInputValue(e.target.value == "" ? "Karachi" : e.target.value)}
                />
                {weatherData && (
                    <div>
                        <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
                        <p>Temperature: {weatherData.current.temp_c}°C</p>


                        {/* Display forecast information with icons */}
                        <div>
                            <h3>Forecast</h3>
                            {/*   {weatherData.forecast.forecastday.map((day) => (
                                <div key={day.date}>
                                    <p>Date: {day.date}</p>
                                    <p>Temperature: {day.day.avgtemp_c}°C</p>
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                </div>
                            ))} */}
                            <div>
                                <p>Date: {weatherData.forecast.forecastday[0].date}</p>
                                <p>Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C
                                </p>
                            </div>
                        </div>

                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}
