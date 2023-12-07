import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import MainCard from 'components/MainCard';
import Search from 'components/svg/Search';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import MeetingModal from 'components/modal/MeetingModal';
import TableChip from '../../../components/chips/TableChip';
import NoDataImage from 'components/Image/NoDataImage';
import '../../../assets/styles.css';

export default function Meeting() {
  const { comId } = useAppContextReception();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/list/${comId}`)
        .then((res) => {
          setMeetings(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [comId]);

  const adjustColumnWidths = () => {
    const columns = [
      { field: 'originalId', headerName: 'SL', width: 30 },
      {
        field: 'host_name',
        headerName: 'Host name',
        headerAlign: 'center',
        align: 'center',
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
        headerAlign: 'center',
        align: 'center',
        width: 150,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">{params.row.host_name}</Typography>
            <Typography variant="body2">{params.row.host_phone}</Typography>
          </Box>
        )
      },
      { field: 'date', headerName: 'Date', headerAlign: 'center', align: 'center', flex: isSmallScreen ? 0 : 1 },
      { field: 'time', headerName: 'Time', headerAlign: 'center', align: 'center', flex: isSmallScreen ? 0 : 1 },
      {
        field: 'status',
        headerAlign: 'center',
        align: 'center',
        headerName: (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Typography>Status</Typography>
          </Box>
        ),
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => <TableChip>{params.value}</TableChip>
      },
      {
        field: 'action',
        headerName: 'Action',
        headerAlign: 'center',
        align: 'center',
        flex: isSmallScreen ? 0 : 1,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleMeetingShow(params.row.id)}
            sx={{ color: '#12A9B2', borderColor: '#12A9B2', borderRadius: 1, '&:focus': { border: 'none' } }}
          >
            View
          </Button>
        )
      }
    ];
    return columns;
  };

  const rowsWithCount = meetings.map((meeting, index) => ({
    ...meeting,
    originalId: index + 1
  }));

  const handleMeetingShow = (id) => {
    setSelectedMeetingId(id);
    setShowMeetingModal(true);
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
            Today’s Meeting Schedule
          </Typography>
        </Box>
        {meetings.length != 0 ? (
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
                      <Search></Search>
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

        {selectedMeetingId && (
          <MeetingModal
            selectedMeetingId={selectedMeetingId}
            showMeetingModal={showMeetingModal}
            handleClose={() => setShowMeetingModal(false)}
          />
        )}
      </MainCard>
    </Box>
  );
}
