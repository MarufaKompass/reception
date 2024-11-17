import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import { Box, Grid, Typography } from '@mui/material';
import ServicePerList from './ServicePerList';
import ServicesLoader from 'loader/ServicesLoader';

export default function Service() {
  const [servicesLists, setServiceLists] = useState([]);
  console.log('servicesLists'), servicesLists;
  const { propertyUser } = useAppContextReception();
  const { building_id } = propertyUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`https://api.hellokompass.com/reception/aptservicecontacts/${building_id}`);
        setServiceLists(response.data.data);
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
          Services Lists
        </Typography>

        <Box>
          {loading ? (
            <Box>
              <ServicesLoader></ServicesLoader>
              <ServicesLoader></ServicesLoader>
              <ServicesLoader></ServicesLoader>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {servicesLists.map((servicesList) => (
                <Grid item xs={3} key={servicesList.bcontact_id}>
                  <ServicePerList servicesList={servicesList}> </ServicePerList>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </MainCard>
    </Box>
  );
}
