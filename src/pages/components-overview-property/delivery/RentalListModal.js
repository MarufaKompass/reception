import React, { useEffect, useState } from 'react';
import { useAppContextReception } from 'AppContextReception';
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import axiosInstance from 'utils/axios.config';
import RentalModalList from './RentalModalList';
import AddDeliveryModal from './AddDeliveryModal';

// import FloorModal from './FloorModal';

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

export default function RentalListModal({ handleCloseRental, rentalListId }) {
  const { apartmentId } = useAppContextReception();
  // ({handleCloseApartment,apartmentList}
  const [rentalIdLists, setRentalIdLists] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/aprtrentlist?aprt_id=${apartmentId}`)
        .then((res) => {
          setRentalIdLists(res.data.data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [apartmentId]);
  const [addDeliveryList, setAddDeliveryList] = useState(false);
  const handleOpenDelivery = () => setAddDeliveryList(true);
  const handleCloseDelivery = () => setAddDeliveryList(false);
  return (
    <Box>
      <Modal open={rentalListId} onClose={handleCloseRental} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="p" component="p" sx={{ fontSize: '18px', fontWeight: 'bolder', font: 'poppins', color: '#333', mb: 2 }}>
            Apartment Rental Lists
          </Typography>
          <Box>
            {rentalIdLists?.map((rentalIdList) => (
              <Box key={rentalIdList.apartment_contactid}>
                <RentalModalList
                  rentalIdList={rentalIdList}
                   handleOpenDelivery={handleOpenDelivery}
                   handleCloseDelivery={handleCloseDelivery}
                   handleCloseRental={handleCloseRental}
                ></RentalModalList>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
      <AddDeliveryModal
        handleCloseDelivery={handleCloseDelivery}
        addDeliveryList={addDeliveryList}
      ></AddDeliveryModal>
    </Box>
  );
}
