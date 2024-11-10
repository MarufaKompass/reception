import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContextReception } from 'AppContextReception';
// handleOpenApartment
export default function DeliveryFloorList({ deliveryList,handleOpenRental  }) {
  const { apartment_name, apartment_id } = deliveryList;
  const { setApartmentId } = useAppContextReception();

  // console.log(apartmentId);

  const handleApartmentId = () => {
    setApartmentId(apartment_id);
    handleOpenRental();
  };

  return (
    <>
      <Box
        onClick={handleApartmentId}
        sx={{
          boxShadow: 3,
          width: '80px',
          height: '80px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: '0.3s',
          '&:hover': {
            backgroundColor: '#f0e6ff'
          }
        }}
      >
        <Typography sx={{ fontWeight: 'bold', font: 'poppins', fontSize: '16px', color: '#333' }}> {apartment_name}</Typography>
      </Box>
    </>
  );
}
