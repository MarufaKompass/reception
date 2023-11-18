import React from 'react';
import { Box, Typography, Chip, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const columns = [
  { field: 'id', headerName: 'SL' },
  { field: 'receiverName', headerName: 'Receiver name', width: 180 },
  { field: 'personName', headerName: 'Person name', width: 180 },
  { field: 'parcelType', headerName: 'Parcel Type', width: 180 },
  { field: 'status', headerName: 'Status', width: 180, renderCell: (params) => <Chip label={params.value} color="primary" /> },
  { field: 'message', headerName: 'Message', width: 180 }
];

const rows = [
  {
    id: 1,
    receiverName: 'Snow',
    personName: 'Jon',
    parcelType: 'Box',
    status: 'Complete',
    message: 'Delivered'
  }
];

export default function CourierList() {
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
            Today’s Courier List
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
