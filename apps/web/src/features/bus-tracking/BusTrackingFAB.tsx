import { useState, useEffect } from 'react';
import { Fab, Badge, Box } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BusTrackingDrawer from './BusTrackingDrawer';

interface BusTrackingFABProps {
  role: 'PARENT' | 'ADMIN';
}

export default function BusTrackingFAB({ role }: BusTrackingFABProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-bus-tracker', handleOpen);
    return () => window.removeEventListener('open-bus-tracker', handleOpen);
  }, []);

  // For Admin, maybe simulate multiple buses active. For Parent, maybe an alert badge.
  const badgeCount = role === 'ADMIN' ? 3 : 1;

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: { xs: 152, md: 96 }, right: 24, zIndex: 9998 }}>
        <Badge 
          badgeContent={badgeCount} 
          color="error" 
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{
            '& .MuiBadge-badge': {
              animation: 'pulse 2s infinite',
              border: '2px solid white',
            }
          }}
        >
          <Fab 
            color="primary" 
            aria-label="bus-tracking"
            onClick={() => setOpen(true)}
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'rgba(59, 130, 246, 0.9)', // Primary blue
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.05) translateY(-4px)',
                bgcolor: 'rgba(37, 99, 235, 0.95)',
                boxShadow: '0 12px 40px rgba(59, 130, 246, 0.5)',
              }
            }}
          >
            <DirectionsBusIcon sx={{ color: 'white', fontSize: 24 }} />
          </Fab>
        </Badge>
      </Box>

      {/* Global styles for pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>

      {/* Render the drawer */}
      <BusTrackingDrawer 
        open={open} 
        onClose={() => setOpen(false)} 
        role={role} 
      />
    </>
  );
}
