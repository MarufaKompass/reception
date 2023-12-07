import React, { useEffect, useState } from 'react';
import { Box, Typography, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import TableChip from 'components/chips/TableChip';
import NoDataImage from 'components/Image/NoDataImage';

export default function Visitors() {
  const { comId } = useAppContextReception();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/visitor/${comId}`)
        .then((res) => {
          setVisitors(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, [comId]);

  const adjustColumnWidths = () => {
    const columns = [
      { field: 'id', headerName: 'SL', width: 30 },
      {
        field: 'guestName',
        headerName: 'Guest Name',

        width: 150,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.guest_name}</Typography>
            <Typography variant="body2">{params.row.guest_phone}</Typography>
          </Box>
        )
      },
      {
        field: 'guest_name',
        headerName: 'Visitor name',
        width: 150,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.host_name}</Typography>
            <Typography variant="body2">{params.row.host_phone}</Typography>
          </Box>
        )
      },
      { field: 'ex_visitor_no', headerName: 'Extra visitors', flex: isSmallScreen ? 0 : 1 },
      { field: 'visitorsCount', headerName: 'Visitors count', flex: isSmallScreen ? 0 : 1 },
      { field: 'date', headerName: 'Date', width: 150 },
      { field: 'time', headerName: 'Time', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'status',
        headerName: 'Status',
        align: 'center',
        width: 150,
        renderCell: (params) => <TableChip>{params.value}</TableChip>
      }
    ];
    return columns;
  };

  const rowsWithCount = visitors.map((visitor, index) => ({
    ...visitor,
    visitorsCount: 1 + parseInt(visitor.ex_visitor_no),
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
            Today’s Visitors List
          </Typography>
        </Box>
        {visitors.length != 0 ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
              <Box>
                <Typography variant="p" sx={{ color: '#12A9B2' }}>
                  Total Visitors: {visitors.length}
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
          </Box>
        ) : (
          <NoDataImage />
        )}
      </MainCard>
    </Box>
  );
}
