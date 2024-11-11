import React from 'react';
import MainCard from 'components/MainCard';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PhoneBook() {
  const navigate = useNavigate();
  const handleEmergency = () => {
    navigate('/emergency');
  };
  const handleService = () => {
    navigate('/service');
  };
  return (
    <Box>
      <MainCard>
        <Box>
          {/* <Box sx={{ display: 'flex', gap: 4, justifyContent: 'end', pr: 1, mb: 3, mt: 1 }}>
            <Typography sx={{ color: '#333', fontSize: '20px', fontWeight: 'bolder' }} style={{ fontFamily: 'noe display' }}>
              Choose your action
            </Typography>
            <Box sx={{ cursor: 'pointer' }}>
              <Typography
                sx={{
                  color: '#F7941D',
                  fontFamily: 'poppins',
                  fontSize: '16px',
                  fontWeight: 'medium',
                  textDecoration: 'underline',
                  pt: 0.5
                }}
              >
                Visitors List
              </Typography>
            </Box>
          </Box> */}
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Box sx={{ backgroundColor: '#e1dffc', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleEmergency}>
                <Box>{/* <img src={visitors} alt="visitors" style={{ height: '93%', width: '93%' }} /> */}</Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                  <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>Emergency</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ backgroundColor: '#fcdfe2', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleService}>
                <Box>{/* <img src={phoneBook} alt="phoneBook" style={{ height: '93%', width: '93%' }} /> */}</Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                  <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>Services</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Box>
  );
}
