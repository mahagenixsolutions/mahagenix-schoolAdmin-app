import { Box, Paper, Typography } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SensorsIcon from '@mui/icons-material/Sensors';
import RouteIcon from '@mui/icons-material/Route';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface BusStatusCardsProps {
  status: 'ACTIVE' | 'DELAYED' | 'INACTIVE';
  eta: string;
  speed: number;
  gpsSignal: string;
  route: string;
}

export default function BusStatusCards({ status, eta, speed, gpsSignal, route }: BusStatusCardsProps) {
  const getStatusDot = () => {
    switch (status) {
      case 'ACTIVE': return '#10b981'; // Emerald
      case 'DELAYED': return '#f59e0b'; // Amber
      case 'INACTIVE': return '#ef4444'; // Rose
      default: return '#6b7280';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'ACTIVE': return 'Active';
      case 'DELAYED': return 'Delayed';
      case 'INACTIVE': return 'Inactive';
      default: return status;
    }
  };

  const cards = [
    {
      value: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, bgcolor: getStatusDot(), borderRadius: '50%' }} />
          <span>{getStatusLabel()}</span>
        </Box>
      ),
      label: 'Bus operating normally',
      icon: <RadioButtonCheckedIcon sx={{ color: getStatusDot(), fontSize: 18 }} />,
      bgColor: 'rgba(16, 185, 129, 0.04)'
    },
    {
      value: eta,
      label: 'Estimated Arrival',
      icon: <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 18 }} />,
      bgColor: 'rgba(59, 130, 246, 0.04)'
    },
    {
      value: `${speed} km/h`,
      label: 'Current Speed',
      icon: <SpeedIcon sx={{ color: '#f59e0b', fontSize: 18 }} />,
      bgColor: 'rgba(245, 158, 11, 0.04)'
    },
    {
      value: gpsSignal,
      label: 'GPS Signal',
      icon: <SensorsIcon sx={{ color: '#06b6d4', fontSize: 18 }} />,
      bgColor: 'rgba(6, 182, 212, 0.04)'
    },
    {
      value: `${route} Zone`,
      label: 'Current Route',
      icon: <RouteIcon sx={{ color: '#8b5cf6', fontSize: 18 }} />,
      bgColor: 'rgba(139, 92, 246, 0.04)'
    }
  ];

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          fontSize: '0.75rem', 
          fontWeight: 600, 
          color: '#64748b', 
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}
      >
        Quick Stats
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {cards.map((card, idx) => (
          <div key={idx} style={{ flex: '1 1 180px', minHeight: 110 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '20px',
                bgcolor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.01)',
                transition: 'all 0.25s ease',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)'
                }
              }}
            >
              {/* Soft background shape/tint */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: 0, 
                  width: 44, 
                  height: 44, 
                  bgcolor: card.bgColor, 
                  borderRadius: '0 0 0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {card.icon}
              </Box>
 
              <Box sx={{ mt: 1 }}>
                <Typography 
                  variant="h5" 
                  component="div"
                  sx={{ 
                    fontWeight: 500, 
                    color: '#0f172a',
                    fontSize: '1.125rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2
                  }}
                >
                  {card.value}
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 400, 
                    color: 'text.secondary', 
                    fontSize: '0.75rem',
                    mt: 1,
                    display: 'block'
                  }}
                >
                  {card.label}
                </Typography>
              </Box>
            </Paper>
          </div>
        ))}
      </div>
    </Box>
  );
}
