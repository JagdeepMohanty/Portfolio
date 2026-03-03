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
      size = 7;
      spacing = 1;
    } else if (isTablet) {
      size = 10;
      spacing = 2;
    } else {
      size = 13;
      spacing = 2;
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
        }
        .contribution-cell:hover {
          transform: scale(1.15);
          box-shadow: 0 0 8px ${isDark ? 'rgba(38, 166, 65, 0.6)' : 'rgba(25, 97, 39, 0.6)'};
          z-index: 10;
          position: relative;
        }
      `}</style>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {/* Month labels */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingLeft: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${displayWeeks.length}, ${cellSize}px)`, gap: `${gap}px`, width: 'fit-content' }}>
            {displayWeeks.map((_, weekIndex) => {
              const label = monthLabels.find(l => l.weekIndex === weekIndex);
              return (
                <div key={weekIndex} style={{ fontSize: '11px', color: isDark ? '#8b949e' : '#57606a', height: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {label ? label.month : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: `${gap}px`, alignItems: 'flex-start' }}>
            {/* Day labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingRight: '8px', height: `${(cellSize + gap) * 7 - gap}px` }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div key={day} style={{ fontSize: '11px', color: isDark ? '#8b949e' : '#57606a', height: `${cellSize}px`, display: 'flex', alignItems: 'center' }}>
                  {idx % 2 === 0 ? day.slice(0, 1) : ''}
                </div>
              ))}
            </div>

            {/* Contribution Grid - 7 rows x N columns */}
            <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7, 1fr)', gap: `${gap}px`, justifyContent: 'center' }}>
              {displayWeeks.flatMap((week, weekIndex) =>
                week.slice(0, 7).map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="contribution-cell"
                    style={{
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
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
          {colors.map((color, index) => (
            <div key={index} style={{ width: `${cellSize - 2}px`, height: `${cellSize - 2}px`, backgroundColor: color, borderRadius: '2px', border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}` }} />
          ))}
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
