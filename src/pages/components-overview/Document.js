import React from 'react';
import { Box, Typography } from '@mui/material';
import login from '../../assets/images/document/login.png';
import dashboard from '../../assets/images/document/dashboard.png';
import checkMeetingCode from '../../assets/images/document/checkMeetingCode.png';
import checkMeetingChekout from '../../assets/images/document/checkMeetingChekout.png';
import addMeeting from '../../assets/images/document/addMeeting.png';
import waitingList from '../../assets/images/document/waitingList.png';
import checkIn from '../../assets/images/document/checkIn.png';
import meetingList from '../../assets/images/document/meetingList.png';
import meetingView from '../../assets/images/document/meetingView.png';
import visitorList from '../../assets/images/document/visitorList.png';
import addCourier from '../../assets/images/document/addCourier.png';
import courierList from '../../assets/images/document/courierList.png';
import eventList from '../../assets/images/document/eventList.png';
import checkEvent from '../../assets/images/document/checkEvent.png';

export default function Document() {
  return (
    <Box>
      <Box sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Login Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={login} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Dashboard</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={dashboard} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Check Meeting Code Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={checkMeetingCode} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Check Meeting Checkout Code Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={checkMeetingChekout} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Add Meeting Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={addMeeting} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Waiting List Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={waitingList} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Check-in Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={checkIn} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Meeting List Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={meetingList} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Meeting View Details</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={meetingView} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Visitor List Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={visitorList} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Add Courier Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={addCourier} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Courier List Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={courierList} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Event List Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={eventList} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>

      <Box sx={{ height: '100%', mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>Check Event Code Page</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={checkEvent} alt="loan" height="100%" width="90%" />
        </Box>
      </Box>
    </Box>
  );
}
