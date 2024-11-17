import React from 'react';
import MainCard from 'components/MainCard';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import rental from '../../../assets/images/img/rental.png';
import services from '../../../assets/images/img/services.png';
export default function PhoneBook() {
  const navigate = useNavigate();
  const handleEmergency = () => {
    navigate('/rentalList');
  };
  const handleService = () => {
    navigate('/service');
  };
  return (
    <Box>
      <MainCard>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Box sx={{ backgroundColor: '#e1dffc', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleEmergency}>
                <Box>

                  <img src={rental} alt="rental" style={{ height: '88%', width: '85%' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                  <Typography sx={{ color: '#333', fontFamily: 'poppins', fontSize: '18px', fontWeight: 'bolder' }}>
                    Rental Contact List
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ backgroundColor: '#fcdfe2', py: 6, px: 4, borderRadius: '20px', cursor: 'pointer' }} onClick={handleService}>
                <Box>
 
                  <img src={services} alt="services" style={{ height: '100%', width: '100%' }} />
                </Box>
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
