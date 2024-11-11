import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
export default function PerGuestListInfo({ usePropertyDate }) {
  const { host_name, host_profile_image, guest_phone, apartment_name, status, time } = usePropertyDate;
  return (
    <Box sx={{ boxShadow: '2', p: 2, borderRadius: '10px' }}>
      <Box>
        <Avatar alt="Remy Sharp" src={host_profile_image} sx={{ width: '80px', height: '80px' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#333', mt: 1 }}>{host_name}</Typography>
          <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#333' }}>{guest_phone}</Typography>
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
            <Typography sx={{ fontSize: '13px', font: 'poppins', fontWeight: 'bold', color: '#333' }}>{apartment_name}</Typography>
          </Box>
        </Box>
        <Box>
          <Box>
            {status === 'pending' || status === 'Pending' || status === 'PENDING' ? (
              <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#F29339' }}>Pending</Typography>
            ) : status === 'waiting' || status === 'Waiting' || status === 'PENDING' ? (
              <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#b47269' }}>Waiting</Typography>
            ) : status === 'approved' ? (
              <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#039487' }}>Approved</Typography>
            ) : (
              <></>
            )}
          </Box>
          <Typography sx={{ fontSize: '14px', font: 'poppins', fontWeight: 'bold', color: '#333' }}>{time}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
