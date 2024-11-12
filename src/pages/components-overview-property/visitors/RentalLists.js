import React, { useEffect, useState } from 'react';
import { useAppContextReception } from 'AppContextReception';
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import axiosInstance from 'utils/axios.config';
import RentalList from './RentalList';
import FloorModal from './FloorModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4
};

export default function RentalLists({ handleCloseApartment, apartmentList }) {
  const { apartmentId } = useAppContextReception();
  // ({handleCloseApartment,apartmentList}

  const [apartmentLists, setApartmentLists] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/aprtrentlist?aprt_id=${apartmentId}`)
        .then((res) => {
          setApartmentLists(res.data.data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [apartmentId]);

  const [floor, setFloor] = useState(false);
  const handleOpenFloor = () => setFloor(true);
  const handleCloseFloor = () => setFloor(false);
  return (
    <Box>
      <Modal
        open={apartmentList}
        onClose={handleCloseApartment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="p" component="p" sx={{ fontSize: '18px', fontWeight: 'bolder', font: 'poppins', color: '#333', mb: 2 }}>
            Apartment Rental Lists
          </Typography>
          <Box>
            {apartmentLists.map((apartmentList) => (
              <Box key={apartmentList.apartment_contactid}>
                <RentalList
                  apartmentList={apartmentList}
                  handleCloseApartment={handleCloseApartment}
                  handleOpenFloor={handleOpenFloor}
                ></RentalList>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>

      <FloorModal floor={floor} handleOpenFloor={handleOpenFloor} handleCloseFloor={handleCloseFloor}></FloorModal>
    </Box>
  );
}
