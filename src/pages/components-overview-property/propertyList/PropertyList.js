// import React, { useEffect, useState } from 'react';
// import { useAppContextReception } from 'AppContextReception';
// import axiosInstance from 'utils/axios.config';
import MainCard from 'components/MainCard';
// import { Box, Typography, Grid } from '@mui/material';

export default function PropertyList() {
  // useEffect(() => {
  //   const fetchData = () => {
  //     axiosInstance
  //       .get(`https://api.hellokompass.com/reception/showbooking?booking_id=${hotelViewId}&company_id=${comId}`)
  //       .then((res) => {
  //         setHotelView(res.data.data);
  //         console.log(res.data.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   fetchData();
  //   const interval = setInterval(fetchData, 10000);
  //   return () => clearInterval(interval);
  // }, [comId, hotelViewId]);

  return <MainCard>fsdfsdfsd</MainCard>;
}
