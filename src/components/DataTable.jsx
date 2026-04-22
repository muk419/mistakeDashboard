import { useState } from 'react';
import './DataTable.css';

function DataTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortConfig.key] || '';
    const bVal = b[sortConfig.key] || '';
    const cmp = aVal.localeCompare(bVal);
    return sortConfig.direction === 'asc' ? cmp : -cmp;
  });

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  const columns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'name', label: 'Name' },
    { key: 'attended', label: 'Attended' },
    { key: 'lessonsLearned', label: 'Key Lessons' },
    { key: 'improvements', label: 'How It Helped' },
    { key: 'rating', label: 'Rating' },
    { key: 'suggestions', label: 'Suggestions' },
    { key: 'comfortable', label: 'Comfortable' },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Session Responses</h3>
        <span className="record-count">{data.length} records</span>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)} className="sortable">
                  {col.label}
                  <span className="sort-indicator">{getSortIndicator(col.key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="no-data">
                  No records found
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr key={row.id}>
                  <td className="row-number">{index + 1}</td>
                  <td className="nowrap">{row.timestamp}</td>
                  <td className="employee-name">{row.name}</td>
                  <td>
                    <span className={`badge ${row.attended.toLowerCase() === 'yes' ? 'badge-green' : 'badge-red'}`}>
                      {row.attended}
                    </span>
                  </td>
                  <td>{row.lessonsLearned}</td>
                  <td>{row.improvements}</td>
                  <td className="rating-cell">{row.rating}</td>
                  <td>{row.suggestions}</td>
                  <td>
                    <span className={`badge ${row.comfortable.toLowerCase() === 'yes' ? 'badge-green' : 'badge-red'}`}>
                      {row.comfortable}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
