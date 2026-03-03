import { memo, useState, useEffect, useMemo } from 'react';

const ContributionCalendar = memo(({ username, isDark, theme }) => {
  const [contributionData, setContributionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Fetch from GitHub API (public endpoint for contribution data)
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const data = await response.json();
        
        if (data.contributions) {
          // Transform data into weeks format
          const weeks = [];
          let currentWeek = [];
          
          data.contributions.forEach((day, index) => {
            currentWeek.push(day.count);
            if ((index + 1) % 7 === 0 || index === data.contributions.length - 1) {
              weeks.push([...currentWeek]);
              currentWeek = [];
            }
          });
          
          setContributionData(weeks);
        }
      } catch (error) {
        console.error('Failed to fetch contributions:', error);
        // Fallback to empty data
        setContributionData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const colors = isDark 
    ? ['#0d0d0d', '#2a2000', '#5c4500', '#a67c00', '#eab308']
    : ['#f3f4f6', '#fde68a', '#facc15', '#f59e0b', '#d97706'];
  
  const getColorLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Wed', 'Fri'];

  // Responsive square sizes
  const getSquareSize = () => {
    if (typeof window === 'undefined') return 14;
    const width = window.innerWidth;
    if (width < 480) return 7;
    if (width < 640) return 8;
    if (width < 1024) return 11;
    return 14;
  };

  const getGap = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 480) return 1.5;
    if (width < 640) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const [squareSize, setSquareSize] = useState(getSquareSize());
  const [gap, setGap] = useState(getGap());

  useEffect(() => {
    const handleResize = () => {
      setSquareSize(getSquareSize());
      setGap(getGap());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(234, 179, 8, 0.7)' }}>
        Loading contributions...
      </div>
    );
  }

  if (contributionData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(234, 179, 8, 0.7)' }}>
        No contribution data available
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <style>{`
        .contribution-square {
          transition: all 0.2s ease;
        }
        .contribution-square:hover {
          transform: scale(1.15);
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.6);
          z-index: 10;
          position: relative;
        }
      `}</style>
      
      <div style={{
        display: 'inline-block',
        maxWidth: '100%'
      }}>
        {/* Month labels */}
        <div style={{
          display: 'flex',
          marginBottom: '8px',
          paddingLeft: `${squareSize + gap + 24}px`,
          fontSize: `${squareSize > 10 ? '14px' : '11px'}`,
          color: isDark ? '#eab308' : '#92400e',
          fontWeight: 500
        }}>
          {months.map((month, index) => (
            <div
              key={month}
              style={{
                width: `${(squareSize + gap) * 4.33}px`,
                textAlign: 'left',
                flexShrink: 0
              }}
            >
              {month}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ 
          display: 'flex', 
          gap: `${gap}px`,
          justifyContent: 'center'
        }}>
          {/* Day labels */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingRight: '8px',
            height: `${(squareSize + gap) * 7 - gap}px`
          }}>
            {[0, 2, 4].map((index) => (
              <div
                key={index}
                style={{
                  fontSize: `${squareSize > 10 ? '12px' : '10px'}`,
                  color: isDark ? 'rgba(234, 179, 8, 0.6)' : 'rgba(146, 64, 14, 0.6)',
                  height: `${squareSize}px`,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {days[index / 2]}
              </div>
            ))}
          </div>

          {/* Contribution squares */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(53, minmax(0, 1fr))`,
            gap: `${gap}px`,
            width: '100%',
            maxWidth: '100%'
          }}>
            {contributionData.slice(0, 53).map((week, weekIndex) => (
              week.slice(0, 7).map((count, dayIndex) => {
                const level = getColorLevel(count);
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="contribution-square"
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      backgroundColor: colors[level],
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    title={`${count} contributions`}
                  />
                );
              })
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '16px',
          gap: `${gap + 2}px`,
          fontSize: `${squareSize > 10 ? '12px' : '10px'}`,
          color: isDark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(146, 64, 14, 0.7)',
          paddingRight: '4px'
        }}>
          <span>Less</span>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: color,
                borderRadius: '3px',
                flexShrink: 0
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
});

ContributionCalendar.displayName = 'ContributionCalendar';

export default ContributionCalendar;
