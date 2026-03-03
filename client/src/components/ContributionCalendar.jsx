import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import githubService from '../services/githubService';

const ContributionCalendar = memo(({ username, isDark, theme }) => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const data = await githubService.getContributions(username);
      setWeeks(data);
      
      if (data.length > 0) {
        const max = Math.max(...data.flat());
        setMaxContributions(max);
      }
      
      setLoading(false);
    };
    fetchData();
  }, [username]);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;

  const colorMap = useMemo(() => ({
    dark: ['#0d0d0d', '#2a2000', '#5c4500', '#a67c00', '#eab308'],
    light: ['#f3f4f6', '#fde68a', '#facc15', '#f59e0b', '#d97706']
  }), []);

  const colors = isDark ? colorMap.dark : colorMap.light;

  const getColorLevel = useCallback((count) => {
    if (count === 0) return 0;
    if (maxContributions === 0) return 0;
    
    const ratio = count / maxContributions;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  }, [maxContributions]);

  const { displayWeeks, squareSize, gap, columnCount } = useMemo(() => {
    let size, spacing;
    
    if (isMobile) {
      size = 7;
      spacing = 1.5;
    } else if (isTablet) {
      size = 10;
      spacing = 2;
    } else {
      size = 13;
      spacing = 3;
    }

    const display = isMobile && weeks.length > 12 ? weeks.slice(-12) : weeks;
    
    return { 
      displayWeeks: display, 
      squareSize: size, 
      gap: spacing,
      columnCount: display.length
    };
  }, [weeks, isMobile, isTablet]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)' }}>
        Loading contributions...
      </div>
    );
  }

  if (weeks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)' }}>
        No contribution data available
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
      <style>{`
        .contribution-square {
          transition: all 0.2s ease;
        }
        .contribution-square:hover {
          transform: scale(1.2);
          box-shadow: 0 0 12px ${isDark ? 'rgba(234, 179, 8, 0.6)' : 'rgba(217, 119, 6, 0.6)'};
          z-index: 10;
          position: relative;
        }
      `}</style>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {/* Calendar Grid */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: `${gap}px`, alignItems: 'flex-start' }}>
            {/* Day labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingRight: '4px', height: `${(squareSize + gap) * 7 - gap}px` }}>
              {['Mon', 'Wed', 'Fri'].map((day) => (
                <div key={day} style={{ fontSize: `${squareSize > 10 ? '11px' : '9px'}`, color: isDark ? 'rgba(234, 179, 8, 0.5)' : 'rgba(146, 64, 14, 0.5)', height: `${squareSize}px`, display: 'flex', alignItems: 'center' }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution Grid - Chronological order */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columnCount}, ${squareSize}px)`, gap: `${gap}px`, justifyContent: 'center' }}>
              {displayWeeks.flatMap((week, weekIndex) =>
                week.slice(0, 7).map((count, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="contribution-square"
                    style={{
                      width: `${squareSize}px`,
                      height: `${squareSize}px`,
                      backgroundColor: colors[getColorLevel(count)],
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                    title={`${count} contributions`}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: `${gap + 1}px`, fontSize: `${squareSize > 10 ? '11px' : '9px'}`, color: isDark ? 'rgba(234, 179, 8, 0.6)' : 'rgba(146, 64, 14, 0.6)' }}>
          <span>Less</span>
          {colors.map((color, index) => (
            <div key={index} style={{ width: `${squareSize - 1}px`, height: `${squareSize - 1}px`, backgroundColor: color, borderRadius: '2px' }} />
          ))}
          <span>More</span>
        </div>

        {isMobile && weeks.length > 12 && (
          <div style={{ fontSize: '11px', color: isDark ? 'rgba(234, 179, 8, 0.5)' : 'rgba(146, 64, 14, 0.5)', textAlign: 'center', marginTop: '8px' }}>
            Showing last 12 weeks
          </div>
        )}
      </div>
    </div>
  );
});

ContributionCalendar.displayName = 'ContributionCalendar';

export default ContributionCalendar;
