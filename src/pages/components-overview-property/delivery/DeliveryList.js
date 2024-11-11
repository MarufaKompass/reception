import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { Box, Typography, Grid } from '@mui/material';
import dayjs from 'dayjs';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import axiosInstance from 'utils/axios.config';
import PerDeliveryList from './PerDeliveryList';

export default function DeliveryList() {
  const [useDates, setUseDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  console.log('useDates', useDates);
  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/aptcourierlist?date=${selectedDate}`)
        .then((res) => {
          setUseDates(res.data.data);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate).format('YYYY-MM-DD'));
  };

  return (
    <Box>
      <MainCard>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Typography sx={{ fontSize: '15px', font: 'poppins', fontWeight: 'bold' }}>Selected Date</Typography>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileDatePicker']} sx={{ display: 'flex', justifyContent: 'end' }}>
              <MobileDatePicker value={dayjs(selectedDate)} onChange={handleDateChange} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ fontSize: '18px', font: 'poppins', fontWeight: 'bold' }}>Visitor List</Typography>
          </Box>
        </Box>

        <Box>
          <Grid container spacing={2}>
            {useDates.map((useDate) => (
              <Grid item xs={3} key={useDate.id}>
                <PerDeliveryList></PerDeliveryList>
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
}
