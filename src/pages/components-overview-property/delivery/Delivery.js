import React from 'react';
import { Box } from '@mui/material';
import MainCard from 'components/MainCard';
import DeliveryFloorLists from './DeliveryFloorLists';
export default function Delivery() {
  return <Box>
    <MainCard>
      <DeliveryFloorLists></DeliveryFloorLists>
    </MainCard>
  </Box>;
}
