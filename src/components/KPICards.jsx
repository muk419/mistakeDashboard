import './KPICards.css';

function KPICards({ data }) {
  const totalResponses = data.length;

  const uniqueEmployees = new Set(data.map((d) => d.name)).size;

  const attendedCount = data.filter(
    (d) => d.attended.toLowerCase() === 'yes'
  ).length;
  const attendanceRate = totalResponses > 0
    ? Math.round((attendedCount / totalResponses) * 100)
    : 0;

  const ratings = data.map((d) => Number(d.rating)).filter((r) => !isNaN(r) && r > 0);
  const avgRating = ratings.length > 0
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : '-';

  const cards = [
    { label: 'Total Responses', value: totalResponses, icon: '#' },
    { label: 'Participants', value: uniqueEmployees, icon: '@' },
    { label: 'Attendance Rate', value: `${attendanceRate}%`, icon: '%' },
    { label: 'Avg Rating (1-5)', value: avgRating, icon: '*' },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card) => (
        <div key={card.label} className="kpi-card">
          <div className="kpi-icon">{card.icon}</div>
          <div className="kpi-info">
            <span className="kpi-value">{card.value}</span>
            <span className="kpi-label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KPICards;
