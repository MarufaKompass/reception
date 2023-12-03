import { useAppContextReception } from 'AppContextReception';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, ListItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
import axiosInstance from 'utils/axios.config';

export default function GuestList() {
  const { idxe } = useParams();
  const { comId } = useAppContextReception();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [event, setEvent] = useState([]);
  const [guests, setGuests] = useState([]);
  const [totalGuests, setTotalGuests] = useState('');
  const [absentGuests, setAbsentGuests] = useState('');

  const { evntname, date, starttime, endtime } = event;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/event/show/${idxe}`)
        .then((res) => {
          setEvent(res.data.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [idxe]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/evntguest?event_id=${idxe}&company_id=${comId}`)
        .then((res) => {
          setGuests(res.data.data.guestlist);
          setTotalGuests(res.data.data.totalGuest);
          setAbsentGuests(res.data.data.attendstatus.A);
          // setAbsentGuests(res.data.data.attendstatus.A);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, [comId]);

  const adjustColumnWidths = () => {
    const columns = [
      { field: 'id', headerName: 'SL' },
      { field: 'guest_name', headerName: 'Guest name', flex: isSmallScreen ? 0 : 1 },
      { field: 'guest_email', headerName: 'Email', flex: isSmallScreen ? 0 : 1 },
      { field: 'guest_phone', headerName: 'Phone', flex: isSmallScreen ? 0 : 1 },
      { field: 'attendance', headerName: 'Attendance', flex: isSmallScreen ? 0 : 1 }
    ];
    return columns;
  };

  const rowsWithCount = guests.map((guest, index) => ({
    ...guest,
    id: index + 1
  }));

  // Usage in your component
  const adjustedColumns = adjustColumnWidths();
  return (
    <Box>
      <MainCard>
        <Box>
          <Typography
            variant="h5"
            color="#fff"
            backgroundColor="#12A9B2"
            sx={{ px: 3, py: 2, borderRadius: 1, display: 'flex', justifyContent: 'center' }}
          >
            Today’s Guest List
          </Typography>
        </Box>
        <Typography align="center" variant="h5" component="h2" sx={{ mt: 2 }}>
          {evntname}
        </Typography>
        <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center' }} align="center">
          <Box justifyContent="center">
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
            <Box sx={{ display: 'inline', mx: 1 }}> {date}</Box>
          </Box>
          <Box>
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Start Time:</Box>
            <Box sx={{ display: 'inline', mx: 1 }}>{starttime} </Box>
          </Box>
          <Box>
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>End Time:</Box>
            <Box sx={{ display: 'inline', mx: 1 }}>{endtime} </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3} sx={{ px: 3 }}>
            <Grid items={true} xs={12} sm={4} md={4} lg={4} xl={4}>
              <ListItem sx={{ m: 0 }}>
                <Typography color="#12a9b2" variant="p" component="div">
                  Total Invitee :
                </Typography>
                <Typography sx={{ ml: 1 }} variant="p" component="div">
                  {totalGuests || 0}
                </Typography>
              </ListItem>
            </Grid>
            <Grid items={true} xs={12} sm={4} md={4} lg={4} xl={4}>
              <ListItem sx={{ mt: { xs: -2, sm: 0 } }}>
                <Typography color="#12a9b2" variant="p" component="div">
                  Total Present :
                </Typography>
                <Typography sx={{ ml: 1 }} variant="p" component="div">
                  {totalGuests - absentGuests}
                </Typography>
              </ListItem>
            </Grid>
            <Grid items={true} xs={12} sm={4} md={4} lg={4} xl={4}>
              <ListItem sx={{ mt: { xs: -2, sm: 0 } }}>
                <Typography color="#12a9b2" variant="p" component="div">
                  Total Absent :
                </Typography>
                <Typography sx={{ ml: 1 }} variant="p" component="div">
                  {absentGuests || 0}
                </Typography>
              </ListItem>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box style={{ width: '95%' }}>
            <DataGrid
              rows={rowsWithCount}
              columns={adjustedColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 }
                }
              }}
              pageSizeOptions={[10, 25, 50, 100]}
            />
          </Box>
        </Box>
      </MainCard>
    </Box>
  );
}
