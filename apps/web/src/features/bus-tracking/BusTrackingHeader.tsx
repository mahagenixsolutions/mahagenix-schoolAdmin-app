import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

interface BusTrackingHeaderProps {
  busNumber: string;
  status: 'ACTIVE' | 'DELAYED' | 'INACTIVE';
  lastUpdated: string;
  onClose: () => void;
}

export default function BusTrackingHeader({
  busNumber,
  status,
  lastUpdated,
  onClose,
}: BusTrackingHeaderProps) {
  const getStatusColor = () => {
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

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f1f5f9',
        px: 3,
        py: 1.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DirectionsBusIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: '#0f172a',
              letterSpacing: '-0.01em',
              lineHeight: 1.2 
            }}
          >
            Bus Tracking
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small" 
          sx={{ 
            color: '#64748b', 
            bgcolor: '#f1f5f9', 
            '&:hover': { bgcolor: '#e2e8f0', color: '#0f172a' },
            width: 28,
            height: 28
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            fontSize: '0.75rem', 
            fontWeight: 400, 
            color: '#64748b' 
          }}
        >
          Bus {busNumber}
        </Typography>
        <Typography sx={{ color: '#cbd5e1', fontSize: '0.75rem' }}>•</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 6, height: 6, bgcolor: getStatusColor(), borderRadius: '50%' }} />
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '0.75rem', 
              fontWeight: 500, 
              color: getStatusColor() 
            }}
          >
            {getStatusLabel()}
          </Typography>
        </Box>
        <Typography sx={{ color: '#cbd5e1', fontSize: '0.75rem' }}>•</Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            fontSize: '0.75rem', 
            color: '#64748b' 
          }}
        >
          Last update {lastUpdated}
        </Typography>
      </Box>
    </Box>
  );
}
