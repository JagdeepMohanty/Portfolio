import { memo, useState, useEffect, useMemo } from 'react';
import { getContributionData } from '../services/githubService';

const ContributionCalendar = memo(({ username, isDark }) => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [maxContributions, setMaxContributions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      const data = await getContributionData(username);
      
      if (data.weeks.length === 0) {
        setError(true);
      } else {
        setWeeks(data.weeks);
        const max = Math.max(...data.weeks.flat().map(d => d.count || 0));
        setMaxContributions(max);
      }
      
      setLoading(false);
    };
    fetchData();
  }, [username]);

  const colors = useMemo(() => 
    isDark 
      ? ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353']
      : ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
    [isDark]
  );

  const getColorLevel = (count) => {
    if (count === 0) return 0;
    if (maxContributions === 0) return 0;
    const ratio = count / maxContributions;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  };

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = null;

    weeks.forEach((week, weekIndex) => {
      if (week.length > 0 && week[0].date) {
        const date = new Date(week[0].date);
        const month = date.toLocaleString('default', { month: 'short' });
        
        if (month !== lastMonth) {
          labels.push({ weekIndex, month });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeks]);

  const allDays = useMemo(() => 
    weeks.flatMap((week, weekIndex) =>
      week.slice(0, 7).map((day, dayIndex) => ({
        ...day,
        weekIndex,
        dayIndex
      }))
    ),
    [weeks]
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)' }}>
        Loading contributions...
      </div>
    );
  }

  if (error || weeks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)' }}>
        Unable to load contribution data
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
      <style>{`
        .calendar-container {
          width: 100%;
          display: flex;
          justify-content: center;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0 16px;
        }
        
        .calendar-wrapper {
          display: flex;
          gap: clamp(3px, 0.35vw, 6px);
          align-items: flex-start;
        }

        .day-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-right: clamp(4px, 0.5vw, 8px);
          font-size: 11px;
          color: ${isDark ? '#8b949e' : '#57606a'};
          height: calc(7 * clamp(12px, 1.3vw, 18px) + 6 * clamp(3px, 0.35vw, 6px));
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(52, clamp(12px, 1.3vw, 18px));
          grid-template-rows: repeat(7, clamp(12px, 1.3vw, 18px));
          gap: clamp(3px, 0.35vw, 6px);
          justify-content: center;
        }

        .contribution-square {
          width: 100%;
          height: 100%;
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

        .month-labels {
          display: flex;
          gap: clamp(3px, 0.35vw, 6px);
          padding-left: calc(32px + clamp(4px, 0.5vw, 8px) + clamp(3px, 0.35vw, 6px));
          font-size: 11px;
          color: ${isDark ? '#8b949e' : '#57606a'};
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .month-label {
          width: clamp(12px, 1.3vw, 18px);
          text-align: center;
          min-width: fit-content;
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
          width: clamp(10px, 1.2vw, 16px);
          height: clamp(10px, 1.2vw, 16px);
          border-radius: 2px;
          border: 1px solid ${isDark ? '#30363d' : '#d0d7de'};
        }

        @media (max-width: 640px) {
          .calendar-container {
            padding: 0 8px;
          }
          
          .month-labels {
            padding-left: calc(24px + clamp(4px, 0.5vw, 8px) + clamp(3px, 0.35vw, 6px));
          }
        }
      `}</style>

      {/* Month Labels */}
      <div className="month-labels">
        {monthLabels.map((label, idx) => (
          <div key={idx} className="month-label">
            {label.month}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-container">
        <div className="calendar-wrapper">
          {/* Day Labels */}
          <div className="day-labels">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <div key={day}>
                {idx % 2 === 0 ? day.slice(0, 1) : ''}
              </div>
            ))}
          </div>

          {/* Contribution Grid */}
          <div className="calendar-grid">
            {allDays.map((day, idx) => (
              <div
                key={idx}
                className="contribution-square"
                style={{ backgroundColor: colors[getColorLevel(day.count || 0)] }}
                title={`${day.count || 0} contributions on ${day.date || 'unknown date'}`}
              />
            ))}
          </div>
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
  );
});

ContributionCalendar.displayName = 'ContributionCalendar';

export default ContributionCalendar;
