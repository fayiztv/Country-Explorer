import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const { addFavs, removeFavs, isFavs } = useFavorites();

  const fav = isFavs(country.cca3);

  return (
    <div className="border rounded p-4 shadow">
      <img src={country.flags.png} className="h-32 w-full object-cover" />
      <h2 className="font-bold mt-2">{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Region: {country.region}</p>
      <p>Population: {country.population.toLocaleString()}</p>

      <div className="flex justify-between mt-2">
        <button
          className="text-blue-600"
          onClick={() => navigate(`/country/${country.cca3}`)}
        >
          View
        </button>

        <button
          onClick={() =>
            fav ? removeFavs(country.cca3) : addFavs(country)
          }
        >
          {fav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default CountryCard;
