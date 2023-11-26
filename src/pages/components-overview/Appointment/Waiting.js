import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import WaitingModal from 'components/modal/WaitingModal';
import TableChip from 'components/chips/chip';

export default function Waiting() {
  const { comId } = useAppContextReception();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [waiting, setWaiting] = useState([]);
  const [waitingId, setWaitingId] = useState('');
  const [waitingModal, setWaitingModal] = useState(false);

  const handleWaitingList = (id) => {
    setWaitingModal(true);
    setWaitingId(id);
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/waiting/${comId}`)
        .then((res) => {
          setWaiting(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, [comId]);

  const adjustColumnWidths = () => {
    const columns = [
      { field: 'originalId', headerName: 'SL', width: 30 },
      {
        field: 'host_name',
        headerName: 'Host name',
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
        headerName: 'Guest name',
        width: 150,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.host_name}</Typography>
            <Typography variant="body2">{params.row.host_phone}</Typography>
          </Box>
        )
      },
      { field: 'date', headerName: 'Date', flex: isSmallScreen ? 0 : 1 },
      { field: 'time', headerName: 'Time', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'status',
        headerName: 'Status',
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => <TableChip>{params.value}</TableChip>
      },
      { field: 'message', headerName: 'Message', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => (
          <Button
            onClick={() => handleWaitingList(params.id)}
            variant="outlined"
            size="small"
            sx={{ color: '#12A9B2', borderColor: '#12A9B2', borderRadius: 1, '&:focus': { border: 'none' } }}
          >
            Checkin
          </Button>
        )
      }
    ];

    return columns;
  };

  const rowsWithCount = waiting.map((wait, index) => ({
    ...wait,
    originalId: index + 1
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
            Today’s Waiting List
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
        <WaitingModal waitingModal={waitingModal} waitingId={waitingId} handleClose={() => setWaitingModal(false)} />
      </MainCard>
    </Box>
  );
}
