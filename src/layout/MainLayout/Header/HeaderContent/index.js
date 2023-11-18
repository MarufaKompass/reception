// material-ui
import { Box, useMediaQuery } from '@mui/material';

import Profile from './Profile';

import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box>
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </Box>
  );
};

export default HeaderContent;
