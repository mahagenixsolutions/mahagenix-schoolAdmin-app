import { Paper, Typography, Box } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface BusRouteProgressProps {
  progressPercentage: number;
}

export default function BusRouteProgress({ progressPercentage }: BusRouteProgressProps) {
  // Map progress to a 0-5 index
  const currentIndex = Math.min(Math.max(Math.round((progressPercentage / 100) * 5), 0), 5);
  
  // Calculate remaining distance dynamically
  const distanceRemaining = Math.max(0, parseFloat((5.0 - currentIndex * 1.0).toFixed(1)));

  // Generate timeline items dynamically based on the current step
  const getTimelineItems = () => {
    const baseStops = ['Pickup', 'Stop 1', 'Stop 2', 'Stop 3', 'School'];
    const items: Array<{ name: string; type: 'completed' | 'current' | 'pending' }> = [];

    baseStops.forEach((stop, index) => {
      // If we are at index 1, 3, or 5 (which means between stops), we insert "Current Location"
      if (currentIndex === 1 && index === 1) {
        items.push({ name: 'Current Location', type: 'current' });
      } else if (currentIndex === 3 && index === 3) {
        items.push({ name: 'Current Location', type: 'current' });
      }

      if (index < Math.floor(currentIndex)) {
        items.push({ name: stop, type: 'completed' });
      } else if (index === Math.floor(currentIndex) && currentIndex % 2 === 0) {
        items.push({ name: stop, type: currentIndex === 5 ? 'completed' : 'current' });
      } else {
        items.push({ name: stop, type: 'pending' });
      }
    });

    // Make sure we include a "Current Location" if it falls at other odd indices not covered
    if (currentIndex === 5 && items[items.length - 1].name === 'School') {
      items[items.length - 1].type = 'completed';
    }

    return items;
  };

  const timelineItems = getTimelineItems();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: '20px',
        height: '100%',
        bgcolor: 'white',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08)'
        }
      }}
    >
      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MapIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>
              Route Progress
            </Typography>
          </Box>
          <Box 
            sx={{ 
              bgcolor: 'rgba(59, 130, 246, 0.04)', 
              color: 'primary.main', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '0.75rem' 
            }}
          >
            {progressPercentage}% Done
          </Box>
        </Box>

        {/* Timeline Elements */}
        <Box sx={{ position: 'relative', pl: 1.5 }}>
          {timelineItems.map((item, idx) => {
            const isLast = idx === timelineItems.length - 1;
            
            // Define status colors
            let textColor = '#64748b';
            let iconElement = <Box sx={{ width: 8, height: 8, bgcolor: '#cbd5e1', borderRadius: '50%' }} />;

            if (item.type === 'completed') {
              textColor = '#0f172a';
              iconElement = <CheckCircleIcon sx={{ fontSize: 16, color: '#10b981' }} />;
            } else if (item.type === 'current') {
              textColor = '#0f172a';
              iconElement = (
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 20, color: '#ef4444' }} />
                  <Box 
                    className="pulse-ring" 
                    sx={{ 
                      position: 'absolute', 
                      width: 24, 
                      height: 24, 
                      border: '2px solid rgba(239, 68, 68, 0.4)', 
                      borderRadius: '50%',
                      animation: 'pulse-marker 1.8s infinite'
                    }} 
                  />
                </Box>
              );
            }

            return (
              <Box key={idx} sx={{ display: 'flex', gap: 3, position: 'relative', pb: isLast ? 0 : 3 }}>
                {/* Vertical connecting line */}
                {!isLast && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      left: item.type === 'current' ? 9 : 3.5, 
                      top: item.type === 'current' ? 20 : 12, 
                      bottom: 0, 
                      width: 2, 
                      bgcolor: item.type === 'completed' ? '#10b981' : '#f1f5f9',
                      zIndex: 1
                    }} 
                  />
                )}

                {/* Node Icon */}
                <Box 
                  sx={{ 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 2,
                    mt: 0.25
                  }}
                >
                  {iconElement}
                </Box>

                {/* Text Description */}
                <Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: item.type === 'current' ? 600 : 400, 
                      color: textColor, 
                      fontSize: item.type === 'current' ? '0.875rem' : '0.8125rem' 
                    }}
                  >
                    {item.name}
                  </Typography>
                  {item.type === 'current' && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                      Pulsing active ping
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Helper Footer text for distance remaining */}
      <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          Remaining Distance
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#0f172a', fontSize: '0.8125rem' }}>
          {distanceRemaining} km left
        </Typography>
      </Box>

      {/* Embedded animations for the marker pulse */}
      <style>{`
        @keyframes pulse-marker {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </Paper>
  );
}
