import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DashboardCheckIn from 'components/svg/DashboardCheckIn';
import { useNavigate } from 'react-router-dom';
export default function HotelDashboard() {
  const [isHoveredHotel, setIsHoveredHotel] = useState(false);
  const handleHoverHotelLeave = () => {
    setIsHoveredHotel(false);
  };

  const navigate = useNavigate();
  const handleHoverHotel = () => {
    navigate('/hotelCheckIn');
  };
  return (
    <Box height="85vh" display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Box variant="p" sx={{ fontSize: 30 }}>
          <Typography sx={{ color: '#12A9B2', fontSize: 30, font: 'poppins', fontWeight: 'bold', textTransform: 'uppercase' }} variant="p">
            Welcome
          </Typography>{' '}
          <Typography variant="p" sx={{ fontSize: 30, font: 'poppins', fontWeight: 'bold', textTransform: 'uppercase' }}>
            To
          </Typography>{' '}
          <Typography sx={{ color: '#12A9B2', fontSize: 30, font: 'poppins', fontWeight: 'bold', textTransform: 'uppercase' }} variant="p">
            KOMPASS
          </Typography>
        </Box>
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
          // onMouseEnter={handleHoverCheck}
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
    </Box>
  );
}
