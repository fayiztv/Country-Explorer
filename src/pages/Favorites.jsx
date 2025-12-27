import { useState } from "react";
import CountryCard from "../components/CountryCard";
import Filters from "../components/Filters";
import SearchBar from "../components/SearhBar";
import { useFavorites } from "../context/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [population, setPopulation] = useState("");
  const [page, setPage] = useState(1);

  const filtered = favorites
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

  if (favorites.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold mb-2">Favorites</h1>
        <p className="text-gray-500">
          You haven’t added any favorite countries yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Favorites ❤️</h1>

      <div className="flex flex-col gap-4 pb-4 md:flex-row md:items-center md:justify-between">
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
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
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favorites;
