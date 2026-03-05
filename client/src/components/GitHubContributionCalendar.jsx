import { memo, useState, useEffect, useMemo } from 'react';

const GitHubContributionCalendar = memo(({ isDark }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/JagdeepMohanty');
        const data = await response.json();
        
        if (data.contributions && Array.isArray(data.contributions)) {
          setContributions(data.contributions);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch contributions:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getColorLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const colors = useMemo(() => 
    isDark
      ? ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353']
      : ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
    [isDark]
  );

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = null;

    contributions.forEach((day, index) => {
      if (day.date) {
        const date = new Date(day.date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        if (month !== lastMonth) {
          labels.push({ index, month });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [contributions]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)' }}>
        Loading contributions...
      </div>
    );
  }

  if (error || contributions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)' }}>
        Unable to load contribution data
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <style>{`
        .calendar-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .month-labels-row {
          display: grid;
          grid-template-columns: repeat(52, 1fr);
          gap: clamp(2px, 0.3vw, 4px);
          width: 100%;
          padding: 0 clamp(8px, 2vw, 16px);
          box-sizing: border-box;
        }

        .month-label {
          font-size: 11px;
          color: ${isDark ? '#8b949e' : '#57606a'};
          text-align: center;
          height: 16px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .calendar-grid-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 clamp(8px, 2vw, 16px);
          box-sizing: border-box;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(52, 1fr);
          grid-template-rows: repeat(7, 1fr);
          gap: clamp(2px, 0.3vw, 4px);
          width: 100%;
          max-width: 100%;
        }

        .contribution-square {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 2px;
          border: 1px solid ${isDark ? '#30363d' : '#d0d7de'};
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .contribution-square:hover {
          transform: scale(1.15);
          box-shadow: 0 0 8px ${isDark ? 'rgba(38, 166, 65, 0.6)' : 'rgba(25, 97, 39, 0.6)'};
          z-index: 10;
          position: relative;
        }

        .legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: ${isDark ? '#8b949e' : '#57606a'};
          flex-wrap: wrap;
        }

        .legend-square {
          width: clamp(10px, 1.2vw, 14px);
          height: clamp(10px, 1.2vw, 14px);
          border-radius: 2px;
          border: 1px solid ${isDark ? '#30363d' : '#d0d7de'};
        }

        @media (max-width: 640px) {
          .calendar-grid {
            gap: clamp(1px, 0.2vw, 3px);
          }
          
          .month-labels-row {
            gap: clamp(1px, 0.2vw, 3px);
          }
        }
      `}</style>

      <div className="calendar-wrapper">
        {/* Month Labels */}
        <div className="month-labels-row">
          {Array.from({ length: 52 }).map((_, weekIndex) => {
            const label = monthLabels.find(l => l.index >= weekIndex * 7 && l.index < (weekIndex + 1) * 7);
            return (
              <div key={weekIndex} className="month-label">
                {label && label.index === weekIndex * 7 ? label.month : ''}
              </div>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid-container">
          <div className="calendar-grid">
            {contributions.slice(0, 364).map((day, idx) => (
              <div
                key={idx}
                className="contribution-square"
                style={{ backgroundColor: colors[getColorLevel(day.count || 0)] }}
                title={`${day.count || 0} contributions on ${day.date || 'unknown date'}`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <span>Less</span>
          {colors.map((color, idx) => (
            <div key={idx} className="legend-square" style={{ backgroundColor: color }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
});

GitHubContributionCalendar.displayName = 'GitHubContributionCalendar';

export default GitHubContributionCalendar;
