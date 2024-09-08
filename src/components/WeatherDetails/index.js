import { Component } from "react";

import './index.css'

class WeatherDetails extends Component {
    state = {weatherData: {}}

    componentDidMount = () => {
        this.getWeatherData()
    }

    getWeatherData = async () => {
        const {match} = this.props
        const {params} = match
        const {name} = params
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9c94f50d678012707ede580816eeaa14`)
        const data = await response.json()
        console.log(data)
        const updatedData = {
            name: data.name,
            temp: data.main.temp,
            weather: data.weather[0].main,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            wind: data.wind.speed,
        }
        this.setState({weatherData: updatedData})
    }

    render() {
        const {weatherData} = this.state
        const {name, temp, weather, feelsLike, humidity, wind} = weatherData
        return (
            <div className="weather-container">
                <div className="container">
                    <div className="top">
                        <div className="location">
                            <p>{name}</p>
                        </div>
                        <div className="temp">
                            <h1>{Math.round(temp - 273.15)}°C</h1>
                        </div>
                        <div className="description">
                            <p>{weather}</p>
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="feels">
                            <p className="bold">{Math.round(feelsLike - 273.15)}°</p>
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            <p className="bold">{humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                        <p className="bold">{wind}km/h</p>
                        <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherDetails