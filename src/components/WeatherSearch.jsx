import { useState } from "react";
import LocationSelect from "./CountrySelect";
import { useNavigate } from 'react-router-dom';

const WeatherSearch = () => {
    const [countryCode, setCountryCode] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        if ( countryCode && zipCode ) {
            navigate(`/weather-results?countryCode=${countryCode}&zipCode=${zipCode}`);
        }
        e.preventDefault()
    }

    return (
        <>
            <div>
                <h1>What&apos;s the weather in...</h1>
                <LocationSelect 
                    setCountryCode={setCountryCode}
                    setZipCode={setZipCode}
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    )
}

export default WeatherSearch;