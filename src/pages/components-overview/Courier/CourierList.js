import React from 'react';
import { Box, Typography, Chip, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const adjustColumnWidths = () => {
    const columns = [
      { field: 'id', headerName: 'SL' },
      { field: 'receiverName', headerName: 'Receiver name', flex: isSmallScreen ? 0 : 1 },
      { field: 'personName', headerName: 'Person name', flex: isSmallScreen ? 0 : 1 },
      { field: 'parcelType', headerName: 'Parcel Type', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'status',
        headerName: 'Status',
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => <Chip label={params.value} color="primary" />
      },
      { field: 'message', headerName: 'Message', flex: isSmallScreen ? 0 : 1 }
    ];
    return columns;
  };

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
