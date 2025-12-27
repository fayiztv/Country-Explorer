import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { countriesAPI, weatherAPI } from "../services/api";

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesAPI.get(`/alpha/${code}`).then((res) => {
      const c = res.data[0];
      setCountry(c);

      if (c.capital?.[0]) {
        weatherAPI
          .get("/weather", {
            params: {
              q: c.capital[0],
              units: "metric",
              appid: import.meta.env.VITE_WEATHER_API_KEY,
            },
          })
          .then((res) => setWeather(res.data))
          .catch(() => {});
      }
    });
  }, [code]);

  if (!country) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 flex justify-between">
      <img src={country.flags.png} className="w-3xl" />
      <div className="flex flex-col justify-items-start">
        <h1 className="text-3xl font-bold">{country.name.common}</h1>

        <p>Capital: {country.capital?.[0]}</p>
        <p>Region: {country.region}</p>
        <p>Sub-region: {country.subregion}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Languages: {Object.values(country.languages || {}).join(", ")}</p>
        <p>
          Currencies:{" "}
          {Object.values(country.currencies || {})
            .map((c) => `${c.name} (${c.symbol})`)
            .join(", ")}
        </p>
        <p>Time zones: {(country.timezones || []).join(", ")}</p>

        {weather && (
          <div className="mt-4 border p-4">
            <h2 className="font-bold">Weather</h2>
            <p>Temp: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
