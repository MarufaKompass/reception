import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
export default function ServicePerList({servicesList}) {
    const { apartment_contactimage, apartment_contactname, apartment_contactphone, apartment_contactstatus, apartment_name } = servicesList;
  return (
    <Box sx={{ boxShadow: 3, borderRadius: 3, p: 1, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Box>
          <Avatar alt="Remy Sharp" src={apartment_contactimage} sx={{ width: '80px', height: '80px' }} />
        </Box>
        <Box sx={{ mt: '7px', pl: 1 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'poppins' }}>{apartment_contactname}</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'poppins' }}>{apartment_contactphone}</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'poppins', color: '#12a9b2' }}>
            {apartment_contactstatus}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', pr: 1 }}>
        <Box>
          {' '}
          <Box
            sx={{
              boxShadow: 3,
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#f0e6ff',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: '#f0e6ff'
              }
            }}
          >
            <Typography sx={{ fontSize: '13px', fontWeight: 'bold', fontFamily: 'poppins' }}>{apartment_name}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
