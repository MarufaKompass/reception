import React, { useEffect, useState } from 'react';
import { Box, Typography, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import TableChip from 'components/chips/chip';
import NoDataImage from 'components/Image/NoDataImage';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
export default function CourierList() {
  const { comId } = useAppContextReception();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [courier, setCourier] = useState([]);
  console.log(courier);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/courier/${comId}`)
        .then((res) => {
          setCourier(res.data.data);
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
      {
        field: 'receiver_name',
        headerName: 'Receiver name',
        width: 150,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.receiver_name}</Typography>
            <Typography variant="body2">{params.row.receiver_phone}</Typography>
          </Box>
        )
      },
      {
        field: 'name',
        headerName: 'Person name',
        width: 150,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.name}</Typography>
            <Typography variant="body2">{params.row.phone}</Typography>
          </Box>
        )
      },
      { field: 'parcel_type', headerName: 'Parcel Type', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'status',
        headerName: 'Status',
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => <TableChip>{params.value}</TableChip>
      },
      { field: 'message', headerName: 'Message', flex: isSmallScreen ? 0 : 1 }
    ];
    return columns;
  };

  const rowsWithCount = courier.map((courier, index) => ({
    ...courier,
    id: index + 1
  }));

  // Usage in your component
  const adjustedColumns = adjustColumnWidths();
  const navigate = useNavigate();
  const courierNavigate = () => {
    navigate('/courier');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '-60px', pb: '10px' }}>
        <Button
          onClick={courierNavigate}
          style={{
            color: '#12A9B2',
            borderColor: '#12A9B2',
            '&:hover': {
              color: '#12A9B2',
              borderColor: '#12A9B2'
            }
          }}
          variant="outlined"
        >
          <Box fontSize="20px" sx={{ pr: '4px' }}>
            +
          </Box>
          Add Courier
        </Button>
      </Box>
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
        {courier.length != 0 ? (
          <Box>
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
          </Box>
        ) : (
          <NoDataImage />
        )}
      </MainCard>
    </Box>
  );
}
