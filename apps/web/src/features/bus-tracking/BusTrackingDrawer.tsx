import { useState, useEffect } from 'react';
import { Drawer, Box, CircularProgress, Typography } from '@mui/material';
import BusTrackingHeader from './BusTrackingHeader';
import HeroTrackingCard from './HeroTrackingCard';
import BusStatusCards from './BusStatusCards';
import BusInformationCard from './BusInformationCard';
import BusRouteProgress from './BusRouteProgress';
import BusGpsCard from './BusGpsCard';

interface BusTrackingDrawerProps {
  open: boolean;
  onClose: () => void;
  role: 'PARENT' | 'ADMIN';
}

const MOCK_ROUTE = [
  { lat: 12.9716, lng: 77.5946 },
  { lat: 12.9750, lng: 77.5980 },
  { lat: 12.9800, lng: 77.6000 },
  { lat: 12.9850, lng: 77.6050 },
  { lat: 12.9900, lng: 77.6100 },
  { lat: 12.9950, lng: 77.6150 },
];

export default function BusTrackingDrawer({ open, onClose, role }: BusTrackingDrawerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Simulate loading and live GPS updates
  useEffect(() => {
    if (!open) return;

    setLoading(true);
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const updateTimer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MOCK_ROUTE.length);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 10000); // Update every 10 seconds

    return () => {
      clearTimeout(loadTimer);
      clearInterval(updateTimer);
    };
  }, [open]);

  const progressPercentage = Math.round((currentIdx / (MOCK_ROUTE.length - 1)) * 100);

  // Drawer Content
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2, bgcolor: '#f8fafc' }}>
          <CircularProgress size={40} />
          <Typography color="text.secondary">Connecting to Fleet GPS...</Typography>
        </Box>
      );
    }

    const isInactive = currentIdx === MOCK_ROUTE.length - 1;
    const status = isInactive ? 'INACTIVE' : 'ACTIVE';

    return (
      <Box sx={{ bgcolor: '#f8fafc', minHeight: '100%' }}>
        <BusTrackingHeader 
           busNumber="14" 
           status={status} 
           lastUpdated={lastUpdated} 
           onClose={onClose} 
        />
        
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Hero Tracking Card (Map + Details Panel) */}
          <HeroTrackingCard 
            busNumber="14"
            route="East Zone"
            status={status}
            eta={isInactive ? 'Arrived' : '08:45 AM'}
            driverName="John Doe"
            lastUpdated={lastUpdated}
            routePath={MOCK_ROUTE}
            currentLocationIndex={currentIdx}
            speed={currentIdx === 0 || isInactive ? 0 : 32}
          />

          {/* Quick Stats KPI Grid Section */}
          <BusStatusCards 
            status={status} 
            eta={isInactive ? 'Arrived' : '08:45 AM'} 
            speed={currentIdx === 0 || isInactive ? 0 : 32} 
            gpsSignal="Strong"
            route="East Zone"
          />

          {/* 3-Column Detailed Data Grid Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div>
              <BusRouteProgress progressPercentage={progressPercentage} />
            </div>
            <div>
              <BusInformationCard 
                 busNumber="14"
                 driverName="John Doe"
                 driverPhone="+91 98765 43210"
                 vehicleReg="AP39 AB 1234"
              />
            </div>
            <div>
              <BusGpsCard 
                 signalStrength="-65 dBm"
                 lastSync={lastUpdated}
                 accuracy="± 4 meters"
                 batteryStatus="92%"
              />
            </div>
          </div>

        </Box>
      </Box>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { 
            width: { xs: '100%', sm: 700, md: 900, lg: 1100 }, 
            bgcolor: '#f8fafc' 
          }
        }
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </Box>
    </Drawer>
  );
}
