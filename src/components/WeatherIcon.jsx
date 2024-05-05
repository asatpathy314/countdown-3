import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

function kelvinToFarhenheit(temperature) {
    return Math.round((temperature - 273.15) * 9/5 + 32)
}

export default function WeatherIcon({ icon, temperature, date }) {
    temperature = kelvinToFarhenheit(parseFloat(temperature))
    return (
        <Card sx={{display: 'inline-block'}}>
            <CardContent>
                    <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt='weather icon' />
                    <p>{temperature}°F</p>
                    {date && <p>{date}</p>}
            </CardContent>
        </Card>
    )
}