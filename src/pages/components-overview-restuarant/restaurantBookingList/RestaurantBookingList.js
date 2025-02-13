import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import { useTheme } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
// import Search from 'components/svg/Search';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
// import MeetingModal from 'components/modal/MeetingModal';
// import TableChip from '../../../components/chips/TableChip';
// import NoDataImage from 'components/Image/NoDataImage';
import '../../../assets/styles.css';
// import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function RestaurantBookingList() {
  const { restaurantLists, setRestaurantLists } = useAppContextReception();
  const [handleDate, setHandleDate] = useState('');

  const handleChange = (newDate) => {
    setHandleDate(dayjs(newDate).format('YYYY-MM-DD'));
  };

  const [handleStatus, setHandleStatus] = useState('');
  console.log('handleDate', handleDate);
  console.log('handleStatus', handleStatus);

  const handleChangeStatus = (event) => {
    setHandleStatus(event.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/restubookedlist?date=${handleDate}&status=${handleStatus}&offset=0&limit=100`)
        .then((res) => {
          setRestaurantLists(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [handleDate, handleStatus, setRestaurantLists]);

  return (
    <Box>
      <MainCard>
        <Grid container spacing={2} sx={{ my: 4, display: 'flex', justifyContent: 'end' }}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <Box>
                  <DatePicker
                    onChange={handleChange}
                    format="YYYY-MM-DD"
                    style={{ borderRadius: '0px', width: '100%', paddingTop: 8, paddingBottom: 8 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ Width: '100%' }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChangeStatus}
                      sx={{ borderRadius: '0', width: '100%', color: '#8f8f8e' }}
                      value={handleStatus}
                      displayEmpty
                    >
                      <MenuItem value="" >Selected Status</MenuItem>
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="booked">Booked</MenuItem>
                      <MenuItem value="checkedin">Checked In </MenuItem>
                      <MenuItem value="checkedout">Checked Out</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box>
          <Typography
            variant="h5"
            color="#fff"
            backgroundColor="#12A9B2"
            sx={{
              px: 3,
              py: 2,
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'center',
              font: 'poppins',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            Booking Schedule
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Arrival Time</TableCell>
                <TableCell align="right">Booking Status</TableCell>
                <TableCell align="right">Booking For</TableCell>
                <TableCell align="right">Present</TableCell>
                <TableCell align="right">QR Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantLists.map((restaurantList) => (
                <TableRow key={restaurantList.rboksl} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {restaurantList.company_name}
                  </TableCell>
                  <TableCell align="right">{restaurantList.phone_w_codex}</TableCell>
                  <TableCell align="right">{restaurantList.arrivaltime}</TableCell>
                  <TableCell align="right">{restaurantList.bkstatus}</TableCell>
                  <TableCell align="right">{restaurantList.bokfor}</TableCell>
                  <TableCell align="right">{restaurantList.attncount}</TableCell>
                  <TableCell align="right">{restaurantList.bkcode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Box>
  );
}
