import React, { useEffect } from 'react';
import { Modal, TextField, Typography, Box, Button, Select, FormControl, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: '',
      table_id: '',
      numguests: '',
      attncount: ''
    }
  });

  useEffect(() => {
    if (restaurant) {
      reset({
        bkstatus: restaurant.status || '',
        tblid: restaurant.table_id || '',
        numguests: restaurant.numguests || '',
        attncount: restaurant.attncount || ''
      });
    }
  }, [restaurant, open, reset]);

  const handleChangeStatus = (event) => {
    setHandleStatus(event.target.value);
  };

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
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {restaurant?.rboksl}
          </Typography> */}
          <Typography sx={{ mb: 2, borderBottom: '1px solid #f1f1f1', pb: 1, fontSize: '20px', fontWeight: 'bold' }}>
            Update Restaurant
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
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
                    mb: 2,
                    width: '100%'
                  }}
                />
              )}
            </Box>

            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold', pb: '4px' }}>Status</Typography>
            <Box sx={{ Width: '100%' }}>
                <FormControl fullWidth>
                  <Select
                    name="status"
                    {...register('status')}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeStatus}
                    sx={{ borderRadius: '0', width: '100%', color: '#8f8f8e' }}
                    value={handleStatus}
                    displayEmpty
                  >
                    <MenuItem value="">Selected Status</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="booked">Booked</MenuItem>
                    <MenuItem value="checkedin">Checked In </MenuItem>
                    <MenuItem value="checkedout">Checked Out</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 'bold', pb: '4px' }}>Table No</Typography>
              <TextField
                name="table_id"
                {...register('table_id')}
                id="outlined-basic"
                variant="outlined"
                defaultValue={restaurant?.tblid}
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
