import { memo, useState, useEffect, useMemo } from 'react';
import { getContributionData } from '../services/githubService';

const ContributionCalendar = memo(({ username, isDark }) => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [maxContributions, setMaxContributions] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;

  const darkColors = ['#0d1117', '#161b22', '#0e4429', '#006d32', '#26a641'];
  const lightColors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
  const colors = isDark ? darkColors : lightColors;

  const getColorLevel = (count) => {
    if (count === 0) return 0;
    if (maxContributions === 0) return 0;
    const ratio = count / maxContributions;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  };

  const { displayWeeks, cellSize, gap } = useMemo(() => {
    let size, spacing;
    
    if (isMobile) {
      size = 'clamp(8px, 2vw, 12px)';
      spacing = 'clamp(2px, 0.3vw, 4px)';
    } else if (isTablet) {
      size = 'clamp(12px, 1.8vw, 16px)';
      spacing = 'clamp(3px, 0.4vw, 5px)';
    } else {
      size = 'clamp(14px, 1.5vw, 18px)';
      spacing = 'clamp(4px, 0.5vw, 6px)';
    }

    const display = isMobile && weeks.length > 16 ? weeks.slice(-16) : weeks;
    
    return { displayWeeks: display, cellSize: size, gap: spacing };
  }, [weeks, isMobile, isTablet]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = null;

    displayWeeks.forEach((week, weekIndex) => {
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
  }, [displayWeeks]);

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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      <style>{`
        .contribution-cell {
          transition: all 0.2s ease;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        .contribution-cell:hover {
          transform: scale(1.15);
          box-shadow: 0 0 8px ${isDark ? 'rgba(38, 166, 65, 0.6)' : 'rgba(25, 97, 39, 0.6)'};
          z-index: 10;
          position: relative;
        }
        .calendar-grid {
          display: grid;
          grid-auto-flow: column;
          grid-template-rows: repeat(7, ${cellSize});
          gap: ${gap};
          justify-content: center;
        }
        .month-labels {
          display: grid;
          grid-template-columns: repeat(${displayWeeks.length}, ${cellSize});
          gap: ${gap};
          width: fit-content;
          padding-left: 32px;
        }
        .day-labels {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-right: 8px;
          height: calc((${cellSize} + ${gap}) * 7 - ${gap});
        }
      `}</style>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {/* Month labels */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="month-labels">
            {displayWeeks.map((_, weekIndex) => {
              const label = monthLabels.find(l => l.weekIndex === weekIndex);
              return (
                <div key={weekIndex} style={{ fontSize: '11px', color: isDark ? '#8b949e' : '#57606a', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {label ? label.month : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: gap, alignItems: 'flex-start' }}>
            {/* Day labels */}
            <div className="day-labels">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div key={day} style={{ fontSize: '11px', color: isDark ? '#8b949e' : '#57606a', display: 'flex', alignItems: 'center' }}>
                  {idx % 2 === 0 ? day.slice(0, 1) : ''}
                </div>
              ))}
            </div>

            {/* Contribution Grid - 7 rows x N columns */}
            <div className="calendar-grid">
              {displayWeeks.flatMap((week, weekIndex) =>
                week.slice(0, 7).map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="contribution-cell"
                    style={{
                      backgroundColor: colors[getColorLevel(day.count || 0)],
                      borderRadius: '2px',
                      border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', fontSize: '12px', color: isDark ? '#8b949e' : '#57606a', width: '100%', paddingRight: '32px' }}>
          <span>Less</span>
          {colors.map((color, index) => {
            const squareSize = `calc(${cellSize} - 2px)`;
            return (
              <div key={index} style={{ width: squareSize, height: squareSize, backgroundColor: color, borderRadius: '2px', border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}` }} />
            );
          })}
          <span>More</span>
        </div>

        {isMobile && weeks.length > 16 && (
          <div style={{ fontSize: '11px', color: isDark ? '#8b949e' : '#57606a', textAlign: 'center' }}>
            Showing last 16 weeks
          </div>
        )}
      </div>
    </div>
  );
});

ContributionCalendar.displayName = 'ContributionCalendar';

export default ContributionCalendar;
