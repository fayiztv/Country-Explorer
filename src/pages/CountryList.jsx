import { useEffect, useState } from "react";
import { apiCache, countriesAPI } from "../services/api";
import SearchBar from "../components/SearhBar";
import Filters from "../components/Filters";
import CountryCard from "../components/CountryCard";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [region, setRegion] = useState("");
  const [population, setPopulation] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
  const timer = setTimeout(() => {
    setSearch(searchInput);
  }, 500); // 500ms debounce

  return () => clearTimeout(timer);
}, [searchInput]);


  useEffect(() => {
    const fetchCountries = async () => {
      // Checck cache first
      if (apiCache.countries) {
        setCountries(apiCache.countries);
        return;
      }

      try {
        const res = await countriesAPI.get(
          "/all?fields=name,flags,capital,currencies,languages,region,subregion,population,timezones,cca3"
        );
        apiCache.countries = res.data; // store in cache
        setCountries(res.data);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };

    fetchCountries();
  }, []);

  const filtered = countries
    .filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (region ? c.region === region : true))
    .filter((c) => {
      if (population === "LOW") return c.population < 10000000;
      if (population === "MID")
        return c.population >= 10000000 && c.population <= 50000000;
      if (population === "HIGH") return c.population > 50000000;
      return true;
    });

  const itemsPerPage = 10;
  const visible = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={searchInput}
          onChange={(val) => {
            setSearchInput(val);
            setPage(1);
          }}
        />
        <Filters
          region={region}
          setRegion={(val) => {
            setRegion(val);
            setPage(1);
          }}
          population={population}
          setPopulation={(val) => {
            setPopulation(val);
            setPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No countries found. Try a different search or filter.
          </p>
        ) : (
          visible.map((c) => <CountryCard key={c.cca3} country={c} />)
        )}
      </div>

      <div className="flex gap-2 mt-4 items-center">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CountryList;
