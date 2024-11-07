import React from 'react';

import { Box, Typography } from '@mui/material';
import { useAppContextReception } from 'AppContextReception';
import FloorModal from './FloorModal';

export default function RentalList({ apartmentList }) {
  const { apartment_contactname, apartment_contactphone } = apartmentList;

  const { rentalId, setRentalId } = useAppContextReception();
  console.log('rentalId', rentalId);

  const handleRentalId = () => {
    setRentalId(rentalId);
    // handleOpenApartment();
  };

//   const [floor, setFloor] = useState(false);
//   const handleOpenFloor = () => setFloor(true);
//   const handleCloseFloor = () => setFloor(false);
  return (
    <Box>
      <Box
        sx={{ boxShadow: '3', px: 2, py: 1, mt: 1, cursor: 'pointer', borderRadius: '5px', '&:hover': { backgroundColor: '#fbe3ff' } }}
        onClick={handleRentalId}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 'bolder', font: 'poppins', color: '#333' }}>{apartment_contactname}</Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: 'bolder', font: 'poppins', color: '#333' }}>{apartment_contactphone}</Typography>
      </Box>

      <FloorModal ></FloorModal>
    </Box>
  );
}
// floor={floor} handleOpenFloor={handleOpenFloor} handleCloseFloor={handleCloseFloor} 