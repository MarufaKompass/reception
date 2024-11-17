import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import { Box, Grid, Typography } from '@mui/material';
import RentalList from './RentalList';
import RentListsLoader from 'loader/RentListsLoader';
export default function RentalLists() {
  const [rentalLists, setRentalLists] = useState([]);

  const { propertyUser } = useAppContextReception();
  const { building_id } = propertyUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`https://api.hellokompass.com/reception/aptrentalcontactlist/${building_id}`);
        setRentalLists(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
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
          {loading ? (
            <Box>
              <RentListsLoader></RentListsLoader>
              <RentListsLoader></RentListsLoader>
              <RentListsLoader></RentListsLoader>
              <RentListsLoader></RentListsLoader>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {rentalLists.map((rentalList) => (
                <Grid item xs={3} key={rentalList.apartment_contactid}>
                  <RentalList rentalList={rentalList}> </RentalList>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </MainCard>
    </Box>
  );
}
