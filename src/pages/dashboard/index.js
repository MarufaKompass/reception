import { Box, Grid } from '@mui/material';
import NavigateMeeting from './NavigateMeeting';
import BannerImg from './BannerImg';

import MainCard from 'components/MainCard';

const DashboardDefault = () => {
  return (
    <Box>
      <MainCard>
        <Box>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <NavigateMeeting></NavigateMeeting>
            </Grid>
            <Grid item sx={{ display: {sm: 'none', md: 'block' } }} md={6} lg={6} xl={6}>
              <BannerImg></BannerImg>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
};

export default DashboardDefault;
