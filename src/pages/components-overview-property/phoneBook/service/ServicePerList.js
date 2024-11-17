import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
export default function ServicePerList({ servicesList }) {
  const { bcontact_image, bcontact_name, bcontact_phone, bcontact_status, bcontact_designation } = servicesList;
  return (
    <Box sx={{ boxShadow: 3, borderRadius: 3, p: 1 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Avatar alt="bcontact_image " src={bcontact_image} sx={{ width: '80px', height: '80px' }} />
          </Box>
          <Box sx={{ mr: 2, background: '#12a9b2', color: '#fff', px: 1 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 'bold', fontFamily: 'poppins' }}>{bcontact_designation}</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: '7px', pl: 1 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'poppins' }}>{bcontact_name}</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'poppins' }}>{bcontact_phone}</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'poppins', color: '#12a9b2' }}>{bcontact_status}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
