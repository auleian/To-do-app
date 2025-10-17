const SearchBar = () => {
  return (
    <div className="d-flex align-items-center gap-2 mb-4">
      <div className="input-group flex-grow-1">
        <input type="text" className="form-control border-end-0" placeholder="Search" />
        <span className="input-group-text bg-white">
          <i className="bi bi-search"></i>
        </span>
      </div>
      <button className="btn btn-outline-secondary" type="button">
        <i className="bi bi-funnel"></i>
      </button>
    </div>
  );
};

export default SearchBar;
