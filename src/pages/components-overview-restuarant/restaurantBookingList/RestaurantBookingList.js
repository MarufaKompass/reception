import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import RestaurantView from '../../../components/svg/RestaurantView';
import '../../../assets/styles.css';

import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import ModalUpdate from './ModalUpdate';

export default function RestaurantBookingList() {
  const { restaurantLists, setRestaurantLists } = useAppContextReception();
  console.log('restaurantLists', restaurantLists);
  const [handleDate, setHandleDate] = useState('');
  const [handleStatus, setHandleStatus] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); 
  const [open, setOpen] = useState(false);
  const handleOpen = (restaurant) =>{
    setOpen(true)
    setSelectedRestaurant(restaurant)
  };
  const handleClose = () => setOpen(false);

  const handleChange = (newDate) => {
    setHandleDate(dayjs(newDate).format('YYYY-MM-DD'));
  };

  const handleChangeStatus = (event) => {
    setHandleStatus(event.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/restubookedlist?date=${handleDate}&status=${handleStatus}&offset=0&limit=30`)
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
                      <MenuItem value="">Selected Status</MenuItem>
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
                <TableCell> Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Arrival Time</TableCell>
                <TableCell align="right">Booking Status</TableCell>
                <TableCell align="right">Booking For</TableCell>
                <TableCell align="right">Present</TableCell>
                <TableCell align="right">QR Code</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantLists.map((restaurantList) => (
                <TableRow key={restaurantList.rboksl} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {restaurantList.regname}
                  </TableCell>
                  <TableCell align="right">{restaurantList.phone_w_codex}</TableCell>
                  <TableCell align="right">{restaurantList.regemail}</TableCell>
                  <TableCell align="right">{restaurantList.arrivaltime}</TableCell>
                  <TableCell align="right">{restaurantList.bkstatus}</TableCell>
                  <TableCell align="right">{restaurantList.bokfor}</TableCell>
                  <TableCell align="right">{restaurantList.attncount}</TableCell>
                  <TableCell align="right">{restaurantList.bkcode}</TableCell>
                  <TableCell align="right" sx={{ cursor: 'pointer' }}>
                    <Box onClick={() => handleOpen(restaurantList)}>
                      <RestaurantView></RestaurantView>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalUpdate handleClose={handleClose} open={open} restaurant={selectedRestaurant}></ModalUpdate>
      </MainCard>
    </Box>
  );
}
