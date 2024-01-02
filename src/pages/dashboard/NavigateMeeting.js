import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashCourier from 'components/svg/DashCourier';
import DashEvent from 'components/svg/DashEvent';
import DashboardCheckIn from 'components/svg/DashboardCheckIn';
import DashboardInstantMeeting from 'components/svg/DashboardInstantMeeting';
import DashboardCheckOut from 'components/svg/DashboardCheckOut';
import { useState } from 'react';
const NavigateMeeting = () => {
  const navigate = useNavigate();

  const handleCheckMeeting = () => {
    navigate('/checkMeeting');
  };
  const handleCheckMeetingOut = () => {
    navigate('/MeetingCheckOut');
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
  const [isHoveredCheckIn, setIsHoveredCheckIn] = useState(false);
  const [isHoveredCheckOut, setIsHoveredCheckOut] = useState(false);
  const [isHoveredInstant, setIsHoveredInstant] = useState(false);
  const [isHoveredCourier, setIsHoveredCourier] = useState(false);
  const [isHoveredEvent, setIsHoveredEvent] = useState(false);

  const handleHoverCheck = () => {
    setIsHoveredCheckIn(true);
  };

  const handleMouseCheckLeave = () => {
    setIsHoveredCheckIn(false);
  };

  const handleHoverCheckOut = () => {
    setIsHoveredCheckOut(true);
  };

  const handleMouseCheckOutLeave = () => {
    setIsHoveredCheckOut(false);
  };

  const handleHoverInstant = () => {
    setIsHoveredInstant(true);
  };

  const handleHoverInstantLeave = () => {
    setIsHoveredInstant(false);
  };

  const handleHoverCourier = () => {
    setIsHoveredCourier(true);
  };

  const handleHoverCourierLeave = () => {
    setIsHoveredCourier(false);
  };

  const handleHoverEvent = () => {
    setIsHoveredEvent(true);
  };

  const handleHoverEventLeave = () => {
    setIsHoveredEvent(false);
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
            <Box
              sx={{
                display: 'block',
                '&:hover': {
                  button: {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  }
                }
              }}
              onMouseEnter={handleHoverCheck}
              onMouseLeave={handleMouseCheckLeave}
            >
              <Button
                onClick={handleCheckMeeting}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: isHoveredCheckIn ? '#fff' : '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  },
                  '& svg path': {
                    stroke: isHoveredCheckIn ? '#fff' : '#12A9B2'
                  }
                }}
                startIcon={<DashboardCheckIn></DashboardCheckIn>}
              >
                <Typography variant="p">Meeting Check In</Typography>
              </Button>
            </Box>
            <Box
              sx={{
                display: 'block',
                '&:hover': {
                  button: {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  }
                }
              }}
              onMouseEnter={handleHoverCheckOut}
              onMouseLeave={handleMouseCheckOutLeave}
            >
              <Button
                onClick={handleCheckMeetingOut}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: isHoveredCheckOut ? '#fff' : '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  },
                  '& svg path': {
                    stroke: isHoveredCheckOut ? '#fff' : '#12A9B2' 
                  }
                }}
                startIcon={<DashboardCheckOut></DashboardCheckOut>}
              >
                <Typography variant="p">Meeting Check Out</Typography>
              </Button>
            </Box>

            <Box
              sx={{
                display: 'block',
                '&:hover': {
                  button: {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  }
                }
              }}
              onMouseEnter={handleHoverInstant}
              onMouseLeave={handleHoverInstantLeave}
            >
              <Button
                onClick={handleCheckInstantMeeting}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: isHoveredInstant ? '#fff' : '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  },
                  '& svg path': {
                    stroke: isHoveredInstant ? '#fff' : '#12A9B2' // Change SVG path color on hover
                  }
                }}
                startIcon={<DashboardInstantMeeting></DashboardInstantMeeting>}
              >
                <Typography variant="p">Instant Meeting </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                display: 'block',
                '&:hover': {
                  button: {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  }
                }
              }}
              onMouseEnter={handleHoverCourier}
              onMouseLeave={handleHoverCourierLeave}
            >
              <Button
                onClick={handleCheckCourier}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: isHoveredCourier ? '#fff' : '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  },
                  '& svg path': {
                    stroke: isHoveredCourier ? '#fff' : '#12A9B2' // Change SVG path color on hover
                  }
                }}
                startIcon={<DashCourier></DashCourier>}
              >
                <Typography variant="p">Courier </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                display: 'block',
                '&:hover': {
                  button: {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  }
                }
              }}
              onMouseEnter={handleHoverEvent}
              onMouseLeave={handleHoverEventLeave}
            >
              <Button
                onClick={handleCheckEvent}
                variant="outlined"
                size="medium"
                sx={{
                  my: 1,
                  color: isHoveredEvent ? '#fff' : '#12A9B2',
                  border: 1,
                  borderColor: '#12A9B2',
                  fontSize: 20,
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#12A9B2'
                  },
                  '& svg path': {
                    stroke: isHoveredEvent ? '#fff' : '#12A9B2' // Change SVG path color on hover
                  }
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
