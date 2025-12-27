import { useEffect, useState } from "react";
import { countriesAPI } from "../services/api";
import SearchBar from "../components/SearhBar";
import Filters from "../components/Filters";
import CountryCard from "../components/CountryCard";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [population, setPopulation] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    countriesAPI
      .get(
        "/all?fields=name,flags,capital,currencies,languages,region,subregion,population,timezones,cca3"
      )
      .then((res) => setCountries(res.data));
  }, []);

  const filtered = countries
    .filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    )
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

  return (
    <div className="p-4">
      <div>
        <SearchBar value={search} onChange={(val) => {
            setSearch(val)
            setPage(1);
        }}/>
        <Filters
          region={region}
          setRegion={(val)=>{
            setRegion(val)
            setPage(1);
          }}
          population={population}
          setPopulation={(val)=>{
            setPopulation(val)
            setPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {visible.map((c) => (
          <CountryCard key={c.cca3} country={c} />
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default CountryList;
