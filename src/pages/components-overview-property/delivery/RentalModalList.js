import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContextReception } from 'AppContextReception';

export default function RentalModalList({ rentalIdList ,handleOpenDelivery , handleCloseRental}) {
  const { apartment_contactname, apartment_contactphone, krgid, building_id } = rentalIdList;

  const { setRentalId, setBuildingId } = useAppContextReception();

  const handleRentalId = () => {
    setRentalId(krgid);
    setBuildingId(building_id);
    handleOpenDelivery();
    handleCloseRental();
  };

  return (
    <Box>
      <Box
        sx={{ boxShadow: '3', px: 2, py: 1, mt: 1, cursor: 'pointer', borderRadius: '5px', '&:hover': { backgroundColor: '#fbe3ff' } }}
        onClick={handleRentalId}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 'bolder', font: 'poppins', color: '#333' }}>{apartment_contactname}</Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 'bolder', font: 'poppins', color: '#333' }}>{apartment_contactphone}</Typography>
      </Box>
    </Box>
  );
}
