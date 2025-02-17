import React, { useEffect, useState } from 'react';
import { Modal, TextField, Typography, Box, Button, Select, FormControl, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import axiosInstance from 'utils/axios.config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4
};

export default function ModalUpdate({ handleClose, open, restaurant }) {
  //   console.log('restaurant', restaurant);
  const [handleStatus, setHandleStatus] = useState('');
  const [handleStatusTable, setHandleStatusTable] = useState('');
  const statuses = [
    { id: 1, name: 'all', label: 'All' },
    { id: 2, name: 'pending', label: 'Pending' },
    { id: 3, name: 'booked', label: 'Booked' },
    { id: 4, name: 'checkedin', label: 'Checked In' },
    { id: 5, name: 'checkedout', label: 'Checked Out' },
    { id: 6, name: 'canceled', label: 'Canceled' }
  ];

  const [tableIds, setTableIds] = useState([]);
  // console.log(' tableIds', tableIds);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      bkstatus: '',
      tblid: '',
      numguests: '',
      attncount: ''
    }
  });

  useEffect(() => {
    if (restaurant) {
      // Reset the form with restaurant data
      reset({
        numguests: restaurant.numguests || '',
        attncount: restaurant.attncount || ''
      });
      setHandleStatus(restaurant.bkstatus || '');
      setHandleStatusTable(restaurant.tblid || '');
    }
  }, [restaurant, open, reset]);
  const handleChangeStatus = (event) => {
    setHandleStatus(event.target.value);
  };

  const handleChangeStatusTable = (event) => {
    setHandleStatusTable(event.target.value);
  };

  useEffect(() => {
    setHandleStatusTable(handleStatusTable);
  }, [handleStatusTable]);
  // useEffect(() => {
  //   setHandleStatus(handleStatus);
  // }, [handleStatus]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/reception/restutable')
        .then((res) => {
          setTableIds(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data) => {
    console.log('Updated Data:', data);
    axiosInstance.post('https://api.hellokompass.com/reception/restuupdate/', data).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        handleClose();
        reset();
      } else {
        toast.error(res.data.message);
        reset();
      }
    });
  };

  return (
    <Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography sx={{ mb: 2, borderBottom: '1px solid #f1f1f1', pb: 1, fontSize: '20px', fontWeight: 'bold' }}>
            Update Restaurant
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box hidden>
              {restaurant?.rboksl && (
                <TextField
                  name="id"
                  {...register('id')}
                  id="outlined-basic"
                  variant="outlined"
                  value={restaurant?.rboksl}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#12a9b2'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#12a9b2'
                      }
                    },
                    mb: 2
                  }}
                />
              )}
            </Box>

            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold', pb: '4px' }}>Status</Typography>

              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <Select
                    name="bkstatus"
                    {...register('bkstatus')}
                    onChange={handleChangeStatus}
                    value={handleStatus}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ borderRadius: '0', width: '100%', color: '#8f8f8e', mb: '10px' }}
                    displayEmpty
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status.id} value={status.name}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold', pb: '4px' }}>Table No</Typography>
              <Box sx={{ Width: '100%' }}>
                <FormControl fullWidth>
                  <Select
                    name="tblid"
                    {...register('tblid')}
                    onChange={handleChangeStatusTable}
                    value={handleStatusTable}
                    sx={{ borderRadius: '0', width: '100%', color: '#8f8f8e', mb: '10px' }}
                    displayEmpty
                  >
                    <MenuItem value="0">Selected table</MenuItem>
                    {tableIds.length > 0 ? (
                      tableIds.map((tableId) => (
                        <MenuItem key={tableId.tblid} value={tableId.tblid}>
                          {tableId.tblcode} ({tableId.tblprson} person)
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No tables available</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold', pb: '4px' }}>Number Of Guests</Typography>
              <TextField
                name="numguests"
                {...register('numguests')}
                id="outlined-basic"
                variant="outlined"
                defaultValue={restaurant?.numguests}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#12a9b2'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#12a9b2'
                    }
                  },
                  mb: 2,
                  width: '100%'
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold', pb: '4px' }}>Attend Count</Typography>
              <TextField
                name="attncount"
                {...register('attncount')}
                id="outlined-basic"
                variant="outlined"
                defaultValue={restaurant?.attncount}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#12a9b2'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#12a9b2'
                    }
                  },
                  width: '100%'
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{ borderColor: '#12a9b2', color: '#12a9b2', fontSize: '14px', fontWeight: 'bold' }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#12a9b2', fontSize: '14px', fontWeight: 'bold' }}>
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
