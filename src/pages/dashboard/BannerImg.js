import React from 'react';
import { Box } from '@mui/material/index';
import sideBanner from '../../../src/assets/images/img/bg-jumbotron.png';
export default function BannerImg() {
  return (
    <Box>
      <img src={sideBanner} alt="sideBannerImg"></img>
    </Box>
  );
}
