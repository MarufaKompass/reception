import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DashboardCheckIn from 'components/svg/DashboardCheckIn';
export default function HotelDashboard() {
  const [isHoveredHotel, setIsHoveredHotel] = useState(false);
  const handleHoverHotelLeave = () => {
    setIsHoveredHotel(false);
  };

  const handleHoverHotel = () => {
    navigate('/hotelCheckIn');
  };
  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: 'block',
          '&:hover': {
            button: {
              color: '#fff',
              backgroundColor: '#12A9B2'
            }
          }
        }}
        onMouseEnter={handleHoverCheck}
        onMouseLeave={handleHoverHotelLeave}
      >
        <Button
          onClick={handleHoverHotel}
          variant="outlined"
          size="medium"
          sx={{
            my: 1,
            color: isHoveredHotel ? '#fff' : '#12A9B2',
            border: 1,
            borderColor: '#12A9B2',
            fontSize: 20,
            '&:hover': {
              color: '#fff',
              backgroundColor: '#12A9B2'
            },
            '& svg path': {
              stroke: isHoveredHotel ? '#fff' : '#12A9B2'
            }
          }}
          startIcon={<DashboardCheckIn></DashboardCheckIn>}
        >
          <Typography variant="p">Hotel Check In</Typography>
        </Button>
      </Box>
    </Box>
  );
}
