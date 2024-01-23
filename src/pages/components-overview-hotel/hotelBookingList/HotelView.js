import React, { useEffect, useState } from 'react';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import MainCard from 'components/MainCard';
import { Box, Typography } from '@mui/material';
import { Grid } from '../../../../node_modules/@mui/material/index';
export default function HotelView() {
  const [hotelView, setHotelView] = useState('');
  const { comId, hotelViewId } = useAppContextReception();

  const { status } = hotelView;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/showbooking?booking_id=${hotelViewId}&company_id=${comId}`)
        .then((res) => {
          console.log(res.data.data);
          setHotelView(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [comId]);

  return (
    <MainCard>
      <Box
        sx={{
          mr: {
            xs: 0,
            sm: 0,
            md: '200px',
            lg: '100px',
            xl: '250px'
          }
        }}
      >
        <Box>
          <Typography variant="h3">Booking Information </Typography>
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Box
            sx={{
              width: '110px',
              height: '40px',
              backgroundColor: '#12a9b2',
              padding: '16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{status}</Typography>
          </Box>
        </Box>

        <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>Guest Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>First name </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Last name </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ w: '120px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Phone </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Email </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Nationality </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Nid No </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Profession </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Job Location </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Father/Spouse Name </Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Typography> ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Present address</Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Typography> ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex'  }}>
                  <Typography sx={{ width: '150px' }}>Permanent address</Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Typography> ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* another part */}
        <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>Package Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Name</Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Price </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ w: '120px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Facility </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Date </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Guest </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Room </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Profession </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Code </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>


   {/* another part */}
   <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>Adult 1 Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Name</Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Price </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ w: '120px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Facility </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Date </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Guest </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Room </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Profession </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Code </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>


   {/* another part */}
   <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>Child 1 Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Name</Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Price </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ w: '120px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Facility </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Date </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Guest </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Room </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Profession </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Code </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>ffsdfsd</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Box>
    </MainCard>
  );
}
