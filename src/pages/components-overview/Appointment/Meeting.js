import React from 'react';
import { Box, Typography, Chip, Button, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import Search from 'components/svg/Search';

const columns = [
  { field: 'id', headerName: 'SL', width: 150 },
  { field: 'hostName', headerName: 'Host name', width: 250 },
  { field: 'guestName', headerName: 'Guest name', width: 250 },
  { field: 'date', headerName: 'Date', width: 240 },
  { field: 'time', headerName: 'Time', width: 240 },
  { field: 'status', headerName: 'Status', width: 250, renderCell: (params) => <Chip label={params.value} color="primary" /> },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => (
      <Button variant="outlined" size="small" sx={{ color: '#12A9B2', borderColor: '#12A9B2', '&:focus': { border: 'none' } }}>
        {params.value}
      </Button>
    )
  }
];

const rows = [
  {
    id: 1,
    hostName: 'Snow',
    guestName: 'Jon',
    date: '1 Nov,2023',
    time: '3.30pm',
    status: 'Complete',
    action: 'Checkin'
  },
  {
    id: 2,
    hostName: 'Snow',
    guestName: 'Jon',
    time: '3.30pm',
    date: '1 Nov,2023',
    status: 'Complete',
    action: 'Checkin'
  }
];

export default function Meeting() {
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
            Today’s Meeting Schedule
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
                  <Search></Search>
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Box>
          <Box>
            <DataGrid
              rows={rows}
              columns={columns}
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
