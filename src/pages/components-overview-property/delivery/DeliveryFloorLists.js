import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
// import propertyVisitor from '../../../assets/images/img/propertyVisitors.png';
import axiosInstance from 'utils/axios.config';
import DeliveryFloorList from './DeliveryFloorList';
import RentalListModal from './RentalListModal';
// import FloorModal from './FloorModal';
// import RentalLists from './RentalLists';
import PropertyVisitorsLoader from 'loader/PropertyVisitorsLoader';
export default function DeliveryFloorLists() {
  const [deliveryLists, setDeliveryLists] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axiosInstance
        .get('https://api.hellokompass.com/reception/apartmentlist')
        .then((res) => {
          setDeliveryLists(res.data.data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false)); // Set loading to false when done
    };

    fetchData();
  }, []);

  const [rentalListId, setRentalListId] = useState(false);
  const handleOpenRental = () => setRentalListId(true);
  const handleCloseRental = () => setRentalListId(false);

  const dynamicTexts = ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];
  const dynamicTexts2 = ['6th Floor', '7th Floor', '8th Floor'];

  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', font: 'poppins', pb: 4 }}> Floor and room Selection</Typography>
      </Box>

      {loading ? (
        <PropertyVisitorsLoader></PropertyVisitorsLoader>
      ) : (
        <>
          <Grid container spacing={3} sx={{ my: 2 }}>
            <Grid item xs={3}>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                  {deliveryLists.slice(0, 15).map((deliveryList, index) => (
                    <React.Fragment key={deliveryList.apartment_id}>
                      <Grid item xs={4}>
                        <DeliveryFloorList deliveryList={deliveryList} handleOpenRental={handleOpenRental} />
                      </Grid>
                      {(index + 1) % 3 === 0 && (
                        <Grid item xs={12} sx={{ position: 'relative' }}>
                          <Typography
                            variant="body1"
                            align="left"
                            sx={{
                              position: 'absolute',
                              top: '-113px',
                              left: 24,
                              width: '100%',
                              fontWeight: 'bolder',
                              fontSize: '14px',
                              font: 'poppins',
                              color: '#333'
                            }}
                          >
                            {dynamicTexts[Math.floor(index / 3)] || 'Default Text'}
                          </Typography>
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                  {deliveryLists.slice(15, 30).map((deliveryList, index) => (
                    <React.Fragment key={deliveryList.apartment_id}>
                      <Grid item xs={4}>
                        <DeliveryFloorList deliveryList={deliveryList} handleOpenRental={handleOpenRental} />
                      </Grid>
                      {(index + 1) % 3 === 0 && (
                        <Grid item xs={12} sx={{ position: 'relative' }}>
                          <Typography
                            variant="body1"
                            align="left"
                            sx={{
                              position: 'absolute',
                              top: '-113px',
                              left: 24,
                              width: '100%',
                              fontWeight: 'bolder',
                              fontSize: '14px',
                              font: 'poppins',
                              color: '#333'
                            }}
                          >
                            {dynamicTexts2[Math.floor(index / 3)] || 'Default Text'}
                          </Typography>
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <RentalListModal handleCloseRental={handleCloseRental} rentalListId={rentalListId}></RentalListModal>
    </Box>
  );
}
