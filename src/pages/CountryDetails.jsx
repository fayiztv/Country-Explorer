import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiCache, countriesAPI, weatherAPI } from "../services/api";

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (apiCache.countryDetails[code]) {
        const cachedCountry = apiCache.countryDetails[code];
        setCountry(cachedCountry);

        if (cachedCountry.capital?.[0]) {
          fetchWeather(cachedCountry.capital[0]);
        }
        return;
      }

      try {
        const countryRes = await countriesAPI.get(`/alpha/${code}`);
        const c = countryRes.data[0];
        apiCache.countryDetails[code] = c;
        setCountry(c);

        // If capital exists, fetch weather
        if (c.capital?.[0]) {
          fetchWeather(c.capital[0]);
        } else {
          setWeatherError("Capital city not available for this country.");
        }
      } catch (error) {
        console.error("Country API error:", error);
      }
    };

    fetchData();
  }, [code]);

  const fetchWeather = async (capital) => {
    if (apiCache.weather[capital]) {
      setWeather(apiCache.weather[capital]);
      return;
    }
    setWeatherLoading(true);
    setWeatherError("");

    try {
      const res = await weatherAPI.get("/weather", {
        params: {
          q: capital,
          units: "metric",
          appid: import.meta.env.VITE_WEATHER_API_KEY,
        },
      });

      apiCache.weather[capital] = res.data;
      setWeather(res.data);
    } catch (error) {
      if (error.response) {
        // API responded with error
        if (error.response.status === 404) {
          setWeatherError("Weather data not found for this city.");
        } else if (error.response.status === 429) {
          setWeatherError(
            "Weather API rate limit exceeded. Please try again later."
          );
        } else {
          setWeatherError("Failed to fetch weather data.");
        }
      } else {
        // Network error
        setWeatherError("Network error while fetching weather data.");
      }
    } finally {
      setWeatherLoading(false);
    }
  };

  if (!country) {
    return <p className="p-4">Loading country details...</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold m-5">Country Details</h1>
      <div className="p-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-48 md:h-64 object-cover rounded"
        />
        <div className="flex flex-col items-start text-left space-y-2">
          <div className="items-start text-left space-y-2">
            <h1 className="font-bold text-cyan-700">
              Name: {country.name.common}
            </h1>

            <p className="font-bold text-cyan-700">
              Capital: {country.capital?.[0] || "N/A"}
            </p>
            <p className="font-bold text-cyan-700">Region: {country.region}</p>
            <p className="font-bold text-cyan-700">
              Sub-region: {country.subregion}
            </p>
            <p className="font-bold text-cyan-700">
              Population: {country.population.toLocaleString()}
            </p>
            <p className="font-bold text-cyan-700">
              Languages: {Object.values(country.languages || {}).join(", ")}
            </p>
            <p className="font-bold text-cyan-700">
              Currencies:{" "}
              {Object.values(country.currencies || {})
                .map((c) => `${c.name} (${c.symbol})`)
                .join(", ")}
            </p>
            <p className="font-bold text-cyan-700 break-words">
              <span className="font-semibold">Time zones:</span>{" "}
              {(country.timezones || []).join(", ")}
            </p>
          </div>
          <div className="mt-6 border p-4 rounded">
            <h1 className="font-bold mb-2 text-3xl">Weather Details</h1>

            {weatherLoading && <p>Loading weather data...</p>}

            {weatherError && <p className="text-red-600">{weatherError}</p>}

            {weather && !weatherLoading && (
              <>
                <p>🌡 Temperature: {weather.main.temp}°C</p>
                <p>🌥 Condition: {weather.weather[0].description}</p>
                <p>💧 Humidity: {weather.main.humidity}%</p>
                <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetails;
