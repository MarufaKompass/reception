import React, { useEffect, useState } from 'react';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import MainCard from 'components/MainCard';
import { Box, Typography } from '@mui/material';
export default function HotelView() {
  const [hotelView, setHotelView] = useState('');
  const { comId, hotelViewId } = useAppContextReception();

  const { status} = hotelView;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/showbooking?booking_id=${hotelViewId}&company_id=${comId}`)
        .then((res) => {
          console.log(res.data.data);
          setHotelView(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [comId]);

  return (
    <MainCard>
      <Box>
        <Typography variant="h3">Booking Information   {status} </Typography>
      </Box>
    </MainCard>
  );
}
