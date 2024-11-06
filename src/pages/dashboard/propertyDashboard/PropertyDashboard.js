import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import visitors from '../../../assets/images/img/visitors.png';
import delivery from '../../../assets/images/img/delivery.png';
import scan from '../../../assets/images/img/scan.png';
import phoneBook from '../../../assets/images/img/phoneBook.png';
export default function PropertyDashboard() {
  const navigate = useNavigate();

  const handleVisitors = () => {
    navigate('/visitors');
  };
  const handleDelivery = () => {
    navigate('/delivery');
  };
  const handleScan = () => {
    navigate('/scan');
  };
  const handlePhoneBook = () => {
    navigate('/phoneBook');
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'end', pr: 1, mb: 3, mt: 1 }}>
        <Typography sx={{ color: '#333', fontSize: '20px', fontWeight: 'bolder' }} style={{ fontFamily: 'noe display' }}>
          Choose your action
        </Typography>
        <Box>
          <Typography
            sx={{ color: '#F7941D', fontFamily: 'poppins', fontSize: '16px', fontWeight: 'medium', textDecoration: 'underline', pt: 0.5 }}
          >
            Visitors List
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Box sx={{ backgroundColor: '#e1dffc', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleVisitors}>
            <Box>
              <img src={visitors} alt="visitors" style={{ height: '93%', width: '93%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>Visitors</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ backgroundColor: '#ddeefc', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleDelivery}>
            <Box>
              <img src={delivery} alt="delivery" style={{ height: '90%', width: '90%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>Delivery</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ backgroundColor: '#ffefd8', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleScan}>
            <Box>
              <img src={scan} alt="scan" style={{ height: '82%', width: '82%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>Scan</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ backgroundColor: '#fcdfe2', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handlePhoneBook}>
            <Box>
              <img src={phoneBook} alt="phoneBook" style={{ height: '93%', width: '93%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>Phone Book</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
