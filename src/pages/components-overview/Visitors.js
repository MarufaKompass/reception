import React from 'react';
import { Box, Typography, Chip, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const rows = [
  {
    id: 1,
    hostName: 'Snow',
    visitorName: 'Jon',
    extraVisitors: '3',
    visitorsCount: '3',
    date: '1 Nov,2023',
    time: '3.30pm',
    status: 'Complete'
  }
];

export default function Visitors() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const adjustColumnWidths = () => {
    const columns = [
      { field: 'id', headerName: 'SL' },
      { field: 'hostName', headerName: 'Host name', flex: isSmallScreen ? 0 : 1 },
      { field: 'visitorName', headerName: 'Visitor name', flex: isSmallScreen ? 0 : 1 },
      { field: 'extraVisitors', headerName: 'Extra visitors', flex: isSmallScreen ? 0 : 1 },
      { field: 'visitorsCount', headerName: 'Visitors count', flex: isSmallScreen ? 0 : 1 },
      { field: 'date', headerName: 'Date', flex: isSmallScreen ? 0 : 1 },
      { field: 'time', headerName: 'Time', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'status',
        headerName: 'Status',
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => <Chip label={params.value} color="primary" />
      }
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
            Today’s Visitors List
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          <Box>
            <Typography variant="p" sx={{ color: '#12A9B2' }}>
              Total Visitors: 2
            </Typography>
          </Box>
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
