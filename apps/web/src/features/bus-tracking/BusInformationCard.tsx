import { Paper, Typography, Box, Avatar, Divider, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

interface BusInformationCardProps {
  busNumber: string;
  driverName: string;
  driverPhone: string;
  vehicleReg: string;
}

export default function BusInformationCard({
  busNumber,
  driverName,
  driverPhone,
  vehicleReg
}: BusInformationCardProps) {
  // Get driver initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

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
          Bus Profile
        </Typography>

        {/* Driver Avatar Header Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 64, 
              height: 64, 
              mb: 1.5,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
            }}
          >
            {getInitials(driverName)}
          </Avatar>
          <Typography variant="body1" sx={{ fontWeight: 500, color: '#0f172a', fontSize: '0.9375rem' }}>
            {driverName}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            Primary Route Driver
          </Typography>
        </Box>

        <Divider sx={{ my: 2.5, borderColor: '#f1f5f9' }} />

        {/* Details list */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              Bus Number
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#0f172a', fontSize: '0.8125rem' }}>
              Bus {busNumber}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              Plate Number
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#0f172a', fontSize: '0.8125rem' }}>
              {vehicleReg}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modern call to action button */}
      <Box sx={{ mt: 4 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => window.open(`tel:${driverPhone}`)}
          startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
          sx={{
            py: 1.25,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.8125rem',
            bgcolor: '#f1f5f9',
            color: '#0f172a',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#e2e8f0',
              boxShadow: 'none'
            }
          }}
        >
          Call Driver
        </Button>
      </Box>
    </Paper>
  );
}
