import { useAppContextReception } from 'AppContextReception';
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function FloorList({ propertyVisitor, handleOpenApartment }) {
  const { apartment_name, apartment_id } = propertyVisitor;
  const { setApartmentId } = useAppContextReception();

  const handleApartmentId = () => {
    setApartmentId(apartment_id);
    handleOpenApartment();
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
        <Typography sx={{ fontWeight: 'bold', fontFamily: 'poppins', fontSize: '16px', color: '#333' }}> {apartment_name}</Typography>
      </Box>
    </>
  );
}
