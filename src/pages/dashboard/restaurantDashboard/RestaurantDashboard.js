import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DashboardCheckIn from 'components/svg/DashboardCheckIn';
import { useNavigate } from 'react-router-dom';
export default function RestaurantDashboard() {
  const [isHoveredRestaurant, setIsHoveredRestaurant] = useState(false);
  const handleHoverRestaurantLeave = () => {
    setIsHoveredRestaurant(false);
  };

  const navigate = useNavigate();
  const handleHoverRestaurant = () => {
    navigate('/restaurantCheckIn');
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
          onMouseLeave={handleHoverRestaurantLeave}
        >
          <Button
            onClick={handleHoverRestaurant}
            variant="outlined"
            size="medium"
            sx={{
              my: 1,
              color: isHoveredRestaurant ? '#fff' : '#12A9B2',
              border: 1,
              borderColor: '#12A9B2',
              fontSize: 20,
              '&:hover': {
                color: '#fff',
                backgroundColor: '#12A9B2'
              },
              '& svg path': {
                stroke: isHoveredRestaurant ? '#fff' : '#12A9B2'
              }
            }}
            startIcon={<DashboardCheckIn></DashboardCheckIn>}
          >
            <Typography variant="p">Check In</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
