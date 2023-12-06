// material-ui
import { Box, useMediaQuery } from '@mui/material';

import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('sx'));

  return <Box>{!matchesXs && <Profile />}</Box>;
};

export default HeaderContent;
