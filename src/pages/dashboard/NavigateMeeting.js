import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashCourier from 'components/svg/DashCourier';
import DashEvent from 'components/svg/DashEvent';
import CheckIn from 'components/svg/CheckIn';
import InstantMeeting from 'components/svg/InstantMeeting';

const NavigateMeeting = () => {
  const navigate = useNavigate();

  const handleCheckMeeting = () => {
    navigate('/checkMeeting');
  };
  const handleCheckCourier = () => {
    navigate('/courier');
  };
  const handleCheckEvent = () => {
    navigate('/checkEvent');
  };
  const handleCheckInstantMeeting = () => {
    navigate('/instantMeeting');
  };

  return (
    <Box>
      <Box height="85vh" display="flex" justifyContent="center" alignItems="center">
        <Box>
          <Box variant="p" sx={{ fontSize: 30 }}>
            <Typography sx={{ color: '#12A9B2', fontSize: 30 }} variant="p">
              Welcome
            </Typography>{' '}
            <Typography variant="p" sx={{ fontSize: 30 }}>
              To
            </Typography>{' '}
            <Typography sx={{ color: '#12A9B2', fontSize: 30 }} variant="p">
              KOMPASS
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'block' }}>
              <Button
                onClick={handleCheckMeeting}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
                }}
                startIcon={<CheckIn></CheckIn>}
              >
                <Typography variant="p">Meeting Check In</Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'block' }}>
              <Button
                onClick={handleCheckInstantMeeting}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
                }}
                startIcon={<InstantMeeting></InstantMeeting>}
              >
                <Typography variant="p">Instant Meeting </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'block' }}>
              <Button
                onClick={handleCheckCourier}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
                }}
                startIcon={<DashCourier></DashCourier>}
              >
                <Typography variant="p">Courier </Typography>
              </Button>
            </Box>

            <Box sx={{ display: 'block' }}>
              <Button
                onClick={handleCheckEvent}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
                }}
                startIcon={<DashEvent></DashEvent>}
              >
                <Typography variant="p">Event </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavigateMeeting;
