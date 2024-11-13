import React from 'react';
import { Box, Typography, Avatar, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
// import { useAppContextReception } from 'AppContextReception';
export default function PerGuestListInfo({ usePropertyDate }) {
  const { guest_name, guest_profile_image, guest_phone, apartment_name, status, time, intime, exittime, property_meetid } = usePropertyDate;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axiosInstance.post('https://api.hellokompass.com/reception/aprtcheckout', data).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
      } else if (res.data.code === 400) {
        toast.error(res.data.message);
      } else {
        <></>;
      }
    });
  };
  return (
    <Box sx={{ boxShadow: '2', p: 2, borderRadius: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Box>
            <Avatar alt="Remy Sharp" src={guest_profile_image} sx={{ width: '56px', height: '56px' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '14px', fontFamily: 'poppins', fontWeight: 'bold', color: '#333', mt: 1 }}>{guest_name}</Typography>
            <Typography sx={{ fontSize: '14px', fontFamily: 'poppins', fontWeight: 'bold', color: '#333' }}>{guest_phone}</Typography>
            <Box
              sx={{
                backgroundColor: '#E5D6FF',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                mt: 0.5
              }}
            >
              <Typography sx={{ fontSize: '13px', fontFamily: 'poppins', fontWeight: 'bold', color: '#333' }}>{apartment_name}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'end' }}>
            <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#6E6E6E', pb: 0.4 }}>{intime}</Typography>
            <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#F84646', pb: 0.4 }}>{time}</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box hidden>
                <TextField  value={property_meetid} {...register('meeting_id')} />
              </Box>
              <Box>
                {intime === '00:00' ? (
                  <>
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: '#12a9b2',
                        py: 0.3,
                        borderRadius: '2px',
                        '&:hover': {
                          backgroundColor: '#12a9b2'
                        }
                      }}
                    >
                      <Typography sx={{ fontFamily: 'poppins', fontSize: '12px', color: '#fff' }}>Exit</Typography>
                    </Button>
                  </>
                ) : intime > '00:00' && exittime > '00:00' ? (
                  <>
                    <Box>
                      {status === 'pending' || status === 'Pending' || status === 'PENDING' ? (
                        <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#F29339' }}>Pending</Typography>
                      ) : status === 'waiting' || status === 'Waiting' || status === 'PENDING' ? (
                        <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#b47269' }}>Waiting</Typography>
                      ) : status === 'complete' || status === 'Complete' || status === 'COMPLETE' ? (
                        <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#039487' }}>Complete</Typography>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </>
                ) : (intime > '00:00' && exittime === '00:00') || (intime === '00:00' && exittime === '00:00') ? (
                  <>
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: '#12a9b2',
                        py: 0.3,
                        borderRadius: '2px',
                        '&:hover': {
                          backgroundColor: '#12a9b2'
                        }
                      }}
                    >
                      <Typography sx={{ fontFamily: 'poppins', fontSize: '12px', color: '#fff' }}>Exit</Typography>
                    </Button>
                  </>
                ) : intime === '00:00' && exittime > '00:00' ? (
                  <>
                    <Box>
                      {status === 'pending' || status === 'Pending' || status === 'PENDING' ? (
                        <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#F29339' }}>Pending</Typography>
                      ) : status === 'waiting' || status === 'Waiting' || status === 'PENDING' ? (
                        <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#b47269' }}>Waiting</Typography>
                      ) : status === 'complete' || status === 'Complete' || status === 'COMPLETE' ? (
                        <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#039487' }}>Complete</Typography>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
