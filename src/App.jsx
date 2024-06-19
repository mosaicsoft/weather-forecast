import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Location } from "./Location";
import { Loading } from "./Loading";

import Select from "./Select";

export default function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [err, setErr] = useState("");

  async function fetchWeather() {
    setLoading(true);
    const URL_FETCH_CITY = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`;
    const response = await fetch(URL_FETCH_CITY);
    const location_data = await response.json();

    if (!location_data.results) {
      setLoading(false);
      setErr("Unable to find");
      return;
    }

    setErr("");
    const location = location_data.results[0];

    setLocation({
      city: location.name,
      country: location.country,
      countryCode: location.country_code,
      latitude: location.latitude,
      longitude: location.longitude,
    });

    const URL_FETCH_WEATHER = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&timezone=auto&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset`;

    const api_response = await fetch(URL_FETCH_WEATHER);
    const weather_data = await api_response.json();
    setWeather(weather_data);

    setLoading(false);
  }

  useEffect(() => {
    if (search.length > 3) {
      fetchWeather();
    } else {
      setLocation({});
      setWeather({});
      setErr("");
    }
  }, [search]);

  return (
    <div className="container">
      <div className="panel">
        <h1>Weather Forecast</h1>
        <div className="form">
          <Select setSearch={setSearch} setLocation={setLocation} />

          {Object.keys(location).length > 0 && (
            <div className="location">
              {err && <div>Unable to find</div>}
              {loading ? <Loading /> : <Location location={location} />}
            </div>
          )}
        </div>
        {Object.keys(location).length > 0 && <Card weather={weather} />}
      </div>
    </div>
  );
}
