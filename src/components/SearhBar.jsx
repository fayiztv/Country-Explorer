const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full md:w-1/3"
    />
  );
};

export default SearchBar;
