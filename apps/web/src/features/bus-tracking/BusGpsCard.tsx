import { Paper, Typography, Box } from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SyncIcon from '@mui/icons-material/Sync';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

interface BusGpsCardProps {
  signalStrength: string;
  lastSync: string;
  accuracy: string;
  batteryStatus: string;
}

export default function BusGpsCard({ signalStrength, lastSync, accuracy, batteryStatus }: BusGpsCardProps) {
  // Clean up accuracy formatting (e.g. "± 4 meters" -> "±4m")
  const formattedAccuracy = accuracy.toLowerCase().includes('meter') 
    ? accuracy.replace(/\s*meters?/gi, 'm').replace(/\s+/g, '')
    : accuracy;

  const widgets = [
    {
      label: 'Signal',
      value: 'Excellent',
      subValue: signalStrength,
      icon: <SignalCellularAltIcon sx={{ fontSize: 16, color: '#10b981' }} />
    },
    {
      label: 'Accuracy',
      value: formattedAccuracy,
      subValue: 'GPS Verified',
      icon: <GpsFixedIcon sx={{ fontSize: 16, color: '#6366f1' }} />
    },
    {
      label: 'Battery',
      value: batteryStatus,
      subValue: 'Device Active',
      icon: <BatteryChargingFullIcon sx={{ fontSize: 16, color: '#10b981' }} />
    },
    {
      label: 'Last Sync',
      value: '5 sec ago',
      subValue: lastSync.split(' ')[0], // Show the time part
      icon: <SyncIcon sx={{ fontSize: 16, color: '#06b6d4', animation: 'spin-sync 6s linear infinite' }} />
    }
  ];

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
        {/* Title */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: '#0f172a',
            mb: 3
          }}
        >
          GPS Diagnostics
        </Typography>

        {/* 2x2 Responsive Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {widgets.map((widget, idx) => (
            <div key={idx}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  bgcolor: '#f8fafc', // Layered card surface
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#f1f5f9'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {widget.label}
                  </Typography>
                  {widget.icon}
                </Box>
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#0f172a', fontSize: '0.9375rem', lineHeight: 1.2 }}>
                    {widget.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                    {widget.subValue}
                  </Typography>
                </Box>
              </Box>
            </div>
          ))}
        </div>
      </Box>

      {/* Style for sync spin animation */}
      <style>{`
        @keyframes spin-sync {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Paper>
  );
}
