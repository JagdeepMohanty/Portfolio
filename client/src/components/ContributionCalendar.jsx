import { memo, useMemo } from 'react';

const ContributionCalendar = memo(({ username, isDark }) => {
  // Generate mock contribution data (in production, fetch from GitHub API)
  const contributionData = useMemo(() => {
    const weeks = 53;
    const data = [];
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        // Random contribution level (0-4)
        const level = Math.floor(Math.random() * 5);
        weekData.push(level);
      }
      data.push(weekData);
    }
    return data;
  }, []);

  const colors = ['#0d0d0d', '#2a2000', '#5c4500', '#a67c00', '#eab308'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Wed', 'Fri'];

  const squareSize = window.innerWidth < 768 ? 10 : window.innerWidth < 1024 ? 12 : 14;
  const gap = window.innerWidth < 768 ? 3 : 4;

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch'
    }}>
      <style>{`
        .calendar-container::-webkit-scrollbar {
          display: none;
        }
        .contribution-square {
          transition: all 0.2s ease;
        }
        .contribution-square:hover {
          transform: scale(1.15);
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.6);
          z-index: 10;
        }
      `}</style>
      
      <div className="calendar-container" style={{
        display: 'inline-block',
        minWidth: '100%',
        padding: '12px 0'
      }}>
        {/* Month labels */}
        <div style={{
          display: 'flex',
          marginBottom: '8px',
          paddingLeft: '32px'
        }}>
          {months.map((month, index) => (
            <div
              key={month}
              style={{
                fontSize: '14px',
                color: '#eab308',
                fontWeight: 500,
                width: `${(squareSize + gap) * 4.33}px`,
                textAlign: 'left'
              }}
            >
              {month}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'flex', gap: `${gap}px` }}>
          {/* Day labels */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingRight: '8px',
            height: `${(squareSize + gap) * 7 - gap}px`
          }}>
            {days.map((day, index) => (
              <div
                key={day}
                style={{
                  fontSize: '12px',
                  color: 'rgba(234, 179, 8, 0.6)',
                  height: `${squareSize}px`,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Contribution squares */}
          <div style={{ display: 'flex', gap: `${gap}px` }}>
            {contributionData.map((week, weekIndex) => (
              <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
                {week.map((level, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="contribution-square"
                    style={{
                      width: `${squareSize}px`,
                      height: `${squareSize}px`,
                      backgroundColor: colors[level],
                      borderRadius: '4px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    title={`${level} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '16px',
          gap: '8px',
          fontSize: '12px',
          color: 'rgba(234, 179, 8, 0.7)'
        }}>
          <span>Less</span>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: color,
                borderRadius: '3px'
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
