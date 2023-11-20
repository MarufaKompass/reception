import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';

export default function EventList() {
  const { comId } = useAppContextReception();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/event/${comId}`)
        .then((res) => {
          setEvents(res.data.data);
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
      { field: 'evntname', headerName: 'Event name', flex: isSmallScreen ? 0 : 1 },
      { field: 'date', headerName: 'Date', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'starttime',
        headerName: 'Time',
        width: 200,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">
              {params.row.starttime} to {params.row.endtime}
            </Typography>
          </Box>
        )
      },
      {
        field: 'action',
        headerName: 'Action',
        flex: isSmallScreen ? 0 : 1,
        renderCell: () => (
          <Button
            variant="outlined"
            size="small"
            sx={{ color: '#12A9B2', borderColor: '#12A9B2', borderRadius: 5, '&:focus': { border: 'none' } }}
          >
            Guest List
          </Button>
        )
      }
    ];
    return columns;
  };

  const rowsWithCount = events.map((event, index) => ({
    ...event,
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
            Today’s Event Schedule
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', py: 2 }}>
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            placeholder="Search"
            sx={{ border: 1, borderColor: '#12A9B2' }}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SearchOutlinedIcon sx={{ color: '#12A9B2', mr: -2 }} />
                </IconButton>
              </InputAdornment>
            }
          />
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
