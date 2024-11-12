import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import { Box, Grid, Typography } from '@mui/material';
import RentalList from './RentalList';
export default function RentalLists() {
  const [rentalLists, setRentalLits] = useState([]);

  const { propertyUser } = useAppContextReception();
  const { building_id } = propertyUser;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/aptrentalcontactlist/${building_id}`)
        .then((res) => {
          setRentalLits(res.data.data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [building_id]);

  return (
    <Box>
      <MainCard>
        <Typography
          variant="p"
          component="p"
          sx={{ fontSize: '18px', fontWeight: 'bolder', font: 'poppins', color: '#333', mb: 2, borderBottom: 1, borderColor: '#f1f1f1' }}
        >
          Rental Lists
        </Typography>

        <Box>
          <Grid container spacing={2}>
            {rentalLists.map((rentalList) => (
              <Grid item xs={3} key={rentalList.apartment_contactid}>
                <RentalList rentalList={rentalList}> </RentalList>
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
}
