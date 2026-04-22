import './Filters.css';

function Filters({ filters, onFilterChange, attendOptions, comfortOptions }) {
  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Search by name or lessons..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Attended</label>
        <select
          value={filters.attended}
          onChange={(e) => onFilterChange('attended', e.target.value)}
        >
          <option value="">All</option>
          {attendOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Comfortable</label>
        <select
          value={filters.comfortable}
          onChange={(e) => onFilterChange('comfortable', e.target.value)}
        >
          <option value="">All</option>
          {comfortOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => onFilterChange('rating', e.target.value)}
        >
          <option value="">All</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      {(filters.search || filters.attended || filters.comfortable || filters.rating) && (
        <button
          className="clear-btn"
          onClick={() => {
            onFilterChange('search', '');
            onFilterChange('attended', '');
            onFilterChange('comfortable', '');
            onFilterChange('rating', '');
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default Filters;
