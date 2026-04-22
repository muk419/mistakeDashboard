import { useState, useEffect, useMemo } from 'react';
import { fetchMistakesData } from './utils/excelReader';
import KPICards from './components/KPICards';
import Filters from './components/Filters';
import DataTable from './components/DataTable';
import './App.css';

// Data source: Google Sheet via Vite proxy (avoids CORS)
// To use local file instead, change to: '/data/mistakes.xlsx'
const EXCEL_URL = '/api/sheet';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    attended: '',
    comfortable: '',
    rating: '',
  });

  useEffect(() => {
    fetchMistakesData(EXCEL_URL)
      .then((rows) => {
        setData(rows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const attendOptions = useMemo(() => {
    return [...new Set(data.map((d) => d.attended).filter(Boolean))].sort();
  }, [data]);

  const comfortOptions = useMemo(() => {
    return [...new Set(data.map((d) => d.comfortable).filter(Boolean))].sort();
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        row.name.toLowerCase().includes(searchLower) ||
        row.lessonsLearned.toLowerCase().includes(searchLower) ||
        row.improvements.toLowerCase().includes(searchLower) ||
        row.suggestions.toLowerCase().includes(searchLower);

      const matchesAttended = !filters.attended || row.attended === filters.attended;
      const matchesComfortable = !filters.comfortable || row.comfortable === filters.comfortable;
      const matchesRating = !filters.rating || row.rating === filters.rating;

      return matchesSearch && matchesAttended && matchesComfortable && matchesRating;
    });
  }, [data, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading data from Google Sheet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Learning from Mistakes</h1>
        <p>Session feedback dashboard</p>
      </header>
      <main className="app-main">
        <KPICards data={filteredData} />
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          attendOptions={attendOptions}
          comfortOptions={comfortOptions}
        />
        <DataTable data={filteredData} />
      </main>
    </div>
  );
}

export default App;
