import WeatherView from '../components/WeatherView';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/Weather.css';

// The OpenWeatherMap API was not working for me, so I decided to use the Google Maps API instead as a POC.
// The code can be refactored for OpenWeatherAPI incredibly easily.

export default function Weather() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [mostPopularArticles, setMostPopularArticles] = useState(null);

    useEffect(() => {
        const queryUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchParams.get('zipCode')}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        fetch(queryUrl)
            .then(response => response.json())
            .then(json => (json['results'][0]['geometry']['location']))
            .then(coordinates => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates['lat']}&lon=${coordinates['lng']}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
                    .then(response => response.json())
                    .then(json => {
                        console.log('1st', json);
                        setCurrentWeather(json);
                    }) //current weather object
                fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${coordinates['lat']}&lon=${coordinates['lng']}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
                    .then(response => response.json())
                    .then(json => {
                        console.log('2nd', json);
                        setHourlyForecast(json);
                    })
                fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates['lat']}&lon=${coordinates['lng']}&cnt=7&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
                    .then(response => response.json())
                    .then(json => {
                        console.log('3rd', json);
                        setDailyForecast(json);
                    })
            }
            )
        console.log(`https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`)
        fetch(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                console.log('4th', json);
                setMostPopularArticles(json);
            })
    }, [searchParams])
    //rendering done below
    return (
        <div className='container-weather'>
            <WeatherView 
            currentWeather={currentWeather} 
            hourlyForecast={hourlyForecast} 
            dailyForecast={dailyForecast} 
            mostPopularArticles={mostPopularArticles} />
        </div>
    )
}