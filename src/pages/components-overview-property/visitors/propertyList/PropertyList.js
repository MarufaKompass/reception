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
import PerGuestListInfo from './PerGuestListInfo';

export default function PropertyList() {
  const [usePropertyDates, setUsePropertyDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axiosInstance
        .get(`https://api.hellokompass.com/reception/aptmeetinglist?date=${selectedDate}`)
        .then((res) => {
          setUsePropertyDates(res.data.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
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
          <Box sx={{ display: 'flex', justifyContent: 'start', borderBottom: 1, borderColor: '#f1f1f1', pb: 1 }}>
            <Typography sx={{ fontSize: '18px', fontFamily: 'poppins', fontWeight: 'bolder' }}>Visitor List</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          {loading || usePropertyDates.length === 0 ? (
            <Box sx={{ color: '#333', fontFamily: 'poppins', fontSize: '16px', fontWeight: 'bold' }}>No Meeting Available </Box>
          ) : (
            <Grid container spacing={2}>
              {usePropertyDates?.map((usePropertyDate) => (
                <Grid item xs={3} key={usePropertyDate.id}>
                  <PerGuestListInfo usePropertyDate={usePropertyDate}/>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </MainCard>
    </Box>
  );
}
