const Filters = ({ region, setRegion, population, setPopulation }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <select
        className="border p-3"
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
        className="border p-2"
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
