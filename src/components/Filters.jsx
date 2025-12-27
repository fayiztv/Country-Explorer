const Filters = ({ region, setRegion, population, setPopulation }) => {
  return (
    <div className="flex flex-col gap-3 w-full md:flex-row md:w-auto">
      <select
        className="border p-3 w-full"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="">All Regions</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Oceania</option>
      </select>

      <select
        className="border p-2 w-full"
        value={population}
        onChange={(e) => setPopulation(e.target.value)}
      >
        <option value="">All Population</option>
        <option value="LOW">&lt; 10M</option>
        <option value="MID">10M – 50M</option>
        <option value="HIGH">&gt; 50M</option>
      </select>
    </div>
  );
};


export default Filters;
