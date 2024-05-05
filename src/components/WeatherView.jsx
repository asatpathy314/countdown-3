import Grid from '@mui/material/Grid'; 
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Grid';
import WeatherIcon from './WeatherIcon';

export default function WeatherView( {currentWeather, hourlyForecast, dailyForecast, mostPopularArticles}  ) {
    return (
        <>
        {
            currentWeather && hourlyForecast && dailyForecast ? (
                <Grid container spacing={3}>
                    <Grid xl>
                        <h1>NYT Articles</h1>
                        <Stack>
                            {mostPopularArticles['results'].slice(0, 5).map((article, index) => {
                                return (
                                    <Item key={index}>
                                        <h2>{article['title']}</h2>
                                        <p>{article['abstract']}</p>
                                    </Item>
                                )
                            })}
                        </Stack>
                    </Grid>
                    <Grid xl={6}>
                        <Item>
                            <h1>Weather in {currentWeather['name']}</h1>
                            <Stack>
                                <Item>
                                        <h2>Current Weather</h2>
                                    <Stack direction="row" spacing={2}>
                                        <WeatherIcon icon={currentWeather['weather'][0]['icon']} temperature={currentWeather['main']['temp']} />
                                    </Stack>
                                </Item>
                                <Item>
                                    <h2>Hourly Forecast</h2>
                                    <Stack direction="row" spacing={2}>
                                        {hourlyForecast['list'].slice(0, 7).map((hour, index) => {
                                            const date = (new Date(parseInt(hour['dt']) * 1000)).toLocaleString();
                                            return <WeatherIcon key={index} icon={hour['weather'][0]['icon']} temperature={hour['main']['temp']} date={date} />
                                        })}
                                    </Stack>
                                </Item>
                                <Item>
                                    <h2>Daily Forecast</h2>
                                    <Stack direction="row" spacing={2}>
                                        {dailyForecast['list'].slice(0, 7).map((day, index) => {
                                            const date = (new Date(parseInt(day['dt']) * 1000)).toLocaleString();
                                            return <WeatherIcon key={index} icon={day['weather'][0]['icon']} temperature={day['temp']['day']} date={date}/>
                                        })}
                                    </Stack>
                                </Item>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xl>
                    </Grid>
                </Grid>
            ) : (
                <h1>Loading...</h1>
            )
        }
        </>
    );
}
//            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt='weather icon' />