import React from 'react';
import { Box, Typography, Button, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const columns = [
  { field: 'id', headerName: 'SL' },
  { field: 'receiverName', headerName: 'Event name', width: 200 },
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'time', headerName: 'Time', width: 200 },
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
    receiverName: 'Snow',
    date: '1 Nov,2023',
    time: '3.30pm',
    action: 'Guest List'
  }
];

export default function EventList() {
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
          <Box style={{ width: '100%' }}>
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
