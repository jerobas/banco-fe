const Searchbar = ({ searchbarState }) => {
    const { searchInput, setSearchInput } = searchbarState;

    const handleSearchInputChange = (e) => {
        const inputVal = e.target.value;
        setSearchInput(inputVal);
    };

    return <input
        placeholder="Buscar sala..."
        onChange={handleSearchInputChange}
        value={searchInput}
    />
}

export default Searchbar;