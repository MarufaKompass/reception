import { Box, Grid } from '@mui/material';
import NavigateMeeting from './MeetingAppointment/NavigateMeeting';
import BannerImg from './BannerImg';
import MainCard from 'components/MainCard';
import { useAppContextReception } from 'AppContextReception';
import PropertyDashboard from './propertyDashboard/PropertyDashboard';
import HotelDashboard from './hotelDashboard/HotelDashboard';
import RestaurantDashboard from './restaurantDashboard/RestaurantDashboard';

const DashboardDefault = () => {
  const { user } = useAppContextReception();
  return (
    <Box>
      <MainCard>
        {user.user_type === 'company' ? (
          <Box>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <NavigateMeeting></NavigateMeeting>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} md={6} lg={6} xl={6}>
                <BannerImg></BannerImg>
              </Grid>
            </Grid>
          </Box>
        ) : user.user_type === 'hotel' ? (
          <Box>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                {/* <NavigateMeeting></NavigateMeeting> */}
                <HotelDashboard></HotelDashboard>
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} md={6} lg={6} xl={6}>
                <BannerImg></BannerImg>
              </Grid>
            </Grid>
          </Box>
        ) : user.user_type === 'property' ? (
          <Box>
            <PropertyDashboard></PropertyDashboard>
          </Box>
        ) : user.user_type === 'resturant' ? (
          <Box>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              {/* <NavigateMeeting></NavigateMeeting> */}
              <RestaurantDashboard></RestaurantDashboard>
            </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} md={6} lg={6} xl={6}>
              <BannerImg></BannerImg>
            </Grid>
          </Grid>
        </Box>
          
        ) : (
          <></>
        )}
      </MainCard>
    </Box>
  );
};

export default DashboardDefault;
