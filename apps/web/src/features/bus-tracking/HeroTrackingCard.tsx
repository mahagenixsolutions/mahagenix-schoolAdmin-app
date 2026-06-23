import { Box, Typography, Card, Avatar } from '@mui/material';
import BusTrackingMap from './BusTrackingMap';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

interface Point {
  lat: number;
  lng: number;
}

interface HeroTrackingCardProps {
  busNumber: string;
  route: string;
  status: 'ACTIVE' | 'DELAYED' | 'INACTIVE';
  eta: string;
  driverName: string;
  lastUpdated: string;
  routePath: Point[];
  currentLocationIndex: number;
  speed?: number;
}

export default function HeroTrackingCard({
  busNumber,
  route,
  status,
  eta,
  driverName,
  lastUpdated,
  routePath,
  currentLocationIndex,
  speed = 32,
}: HeroTrackingCardProps) {
  
  const getStatusColor = () => {
    switch (status) {
      case 'ACTIVE': return '#10b981';
      case 'DELAYED': return '#f59e0b';
      case 'INACTIVE': return '#ef4444';
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

  const isInactive = status === 'INACTIVE';

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '20px',
        bgcolor: 'white',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        overflow: 'hidden',
        border: 'none',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        }
      }}
    >
      {/* Use a native flex container instead of MUI Grid for reliability */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Left Side: Info Panel — ~30% on desktop, 100% on mobile */}
        <div style={{ 
          flex: '0 0 280px', 
          maxWidth: 300,
          padding: 28, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          backgroundColor: '#fdfdfe',
          borderRight: '1px solid #f1f5f9',
          boxSizing: 'border-box',
        }}>
          <div>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography 
                  variant="caption" 
                  sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.65rem' }}
                >
                  Live Monitor
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: '#0f172a', mt: 0.5 }}
                >
                  Bus {busNumber}
                </Typography>
              </Box>
              
              {/* Status badge */}
              <Box 
                sx={{ 
                  display: 'flex', alignItems: 'center', gap: 0.75, 
                  bgcolor: `${getStatusColor()}14`, px: 1.25, py: 0.5, 
                  borderRadius: '9999px', color: getStatusColor(),
                  fontSize: '0.7rem', fontWeight: 600
                }}
              >
                <Box 
                  sx={{ 
                    width: 6, height: 6, bgcolor: getStatusColor(), borderRadius: '50%',
                    animation: 'pulse-dot 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite'
                  }} 
                />
                {getStatusLabel()}
              </Box>
            </Box>

            {/* Route */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.7rem' }}>
                Assigned Route
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400, color: '#334155', mt: 0.25 }}>
                {route} Route
              </Typography>
            </Box>

            {/* ETA */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="caption" 
                sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <QueryBuilderIcon sx={{ fontSize: 13 }} />
                Estimated Arrival
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ fontWeight: 300, color: '#0f172a', letterSpacing: '-0.04em', mt: 0.75, lineHeight: 1 }}
              >
                {eta}
              </Typography>
            </Box>
          </div>

          {/* Driver footer */}
          <Box sx={{ pt: 2.5, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Avatar sx={{ width: 30, height: 30, bgcolor: '#f1f5f9', color: '#64748b' }}>
              <PersonIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b', fontSize: '0.775rem' }}>
                {driverName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                Driver In-Service
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Right Side: LIVE GPS MAP — fills remaining width */}
        <div style={{ 
          flex: '1 1 0',
          minWidth: 300,
          minHeight: 440,
          position: 'relative',
        }}>
          <BusTrackingMap 
            routePath={routePath} 
            currentLocationIndex={currentLocationIndex}
            busNumber={busNumber}
            eta={eta}
            speed={isInactive ? 0 : speed}
            lastUpdated={lastUpdated}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @media (max-width: 768px) {
          .hero-card-layout > div:first-child {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid #f1f5f9 !important;
          }
        }
      `}
      </style>
    </Card>
  );
}
