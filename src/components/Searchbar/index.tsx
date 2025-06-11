const Searchbar = ({ searchbarState }) => {
  const { searchInput, setSearchInput } = searchbarState;

  const handleSearchInputChange = (e) => {
    const inputVal = e.target.value;
    setSearchInput(inputVal);
  };

  return (
    <input
      placeholder="Buscar sala..."
      onChange={handleSearchInputChange}
      value={searchInput}
      className="w-full px-4 py-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#333] focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  );
};

export default Searchbar;
