import React from 'react';
import { Box,Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import DeliveryFloorLists from './DeliveryFloorLists';
import { useNavigate } from 'react-router-dom';
export default function Delivery() {
  const navigate = useNavigate();
  const handleCourierList = () => {
    navigate('/listOfCourier');
  };
  return (
    <Box>
      <MainCard>
      <Box onClick={handleCourierList} sx={{ cursor: 'pointer' ,textAlign:'right' }}>
          <Typography
            sx={{ color: '#F7941D', fontFamily: 'poppins', fontSize: '16px', fontWeight: 'medium', textDecoration: 'underline', pt: 0.5 }}
          >
            Courier List
          </Typography>
        </Box>
        <DeliveryFloorLists></DeliveryFloorLists>
      </MainCard>
    </Box>
  );
}
