import React from 'react';
import { Box, Avatar } from '@mui/material';
import noData from '../../assets/images/img/noData.jpg';

export default function NoDataImage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Avatar alt="Captured" src={noData} variant="square" sx={{ width: '50%', height: 'auto' }} />
    </Box>
  );
}
