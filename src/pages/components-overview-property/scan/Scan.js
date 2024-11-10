import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import { Box, OutlinedInput, Typography, Button, FormControl, Grid } from '@mui/material';
import Image from '../../../assets/images/img/reception_background.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { meetingCodeSchema } from 'components/validation/validation';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import { toast } from 'react-toastify';
import PuffLoader from 'react-spinners/PuffLoader';
export default function Scan() {
  const delay = 500;
  const { comId } = useAppContextReception();
  const navigate = useNavigate();
  const [resultQR, setResultQR] = useState('');
  const handleCancelButton = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(meetingCodeSchema) });

  useEffect(() => {
    if (resultQR) {
      onSubmit({ code: resultQR, company_id: comId });
    }
  }, [resultQR, comId]);

  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const onSubmit = (data) => {
    console.log(data);
    axiosInstance
      .post('https://api.hellokompass.com/reception/aprtcheckin', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          speak('welcome to kompass');
          navigate('/dashboard');
          reset();
        } else {
          toast.error(res.data.message);
          speak('Check-in failed!');
          navigate('/dashboard');
          reset();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message || 'Invalid request. Please try again.';
          toast.error(errorMessage);
          speak('Check-in failed due to invalid request.');
          navigate('/dashboard');
          reset();
        } else {
          console.error(error);
          toast.error('An unexpected error occurred.');
          speak('An unexpected error occurred.');
        }
      });
  };

  const handleScan = (result) => {
    if (result) {
      const { text } = result;
      setResultQR(text);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };
  const styles = {
    paperContainer: {
      backgroundImage: `url(${Image})`,
      backgroundSize: '100% 80%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '80%'
    }
  };

  return (
    <Box>
      <Box>
        <MainCard>
          <Box style={styles.paperContainer}>
            <Box>
              <Typography
                variant="h5"
                color="#fff"
                backgroundColor="#12A9B2"
                sx={{ px: 3, py: 2, borderRadius: 1, display: 'flex', justifyContent: 'center' }}
              >
                Scanning Code/Enter Meeting Code For Check-In
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
              <Box
                backgroundColor="#fff"
                sx={{
                  // height: { xs: '80%', xl: '50%' },
                  // width: { md: '80%', lg: '80%', xl: '60%' },
                  height: '60%',
                  width: '60%',
                  mt: -8,
                  p: { xs: 2, md: 4 },
                  border: 1,
                  borderColor: '#fff',
                  borderRadius: 3,
                  pb: 2,
                  boxShadow: '0px 4px 8px #12A9B2',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box>
                    <Grid container spacing={6}>
                      <Grid item xs={7}>
                        <Box>
                          <Box sx={{ display: 'flex', mb: 1 }}>
                            <PuffLoader color="#12a9b2" size={38} />
                            <Typography sx={{ color: '#12A9B2', fontSize: 15, fontWeight: 'bold', mt: '8px', ml: '10px' }}>
                              Scanning code for Check-In
                            </Typography>
                          </Box>
                          <QrReader
                            delay={delay}
                            style={{ height: '200px', width: '100%', border: 1, padding: 0, margin: 0, borderColor: '#12A9B2' }}
                            onError={handleError}
                            onScan={handleScan}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                          <Box>
                            <Typography variant="h6" sx={{ font: 'poppins', fontSize: '14px', fontWeight: 'bolder' }}>
                              Scan the QR code*
                            </Typography>
                            <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
                              {resultQR && (
                                <OutlinedInput
                                  {...register('code', { required: true })}
                                  name="code"
                                  sx={{ border: 1, borderColor: '#12A9B2', mt: 1 }}
                                  size="small"
                                  value={resultQR}
                                />
                              )}
                              {!resultQR && !errors.code && (
                                <OutlinedInput
                                  {...register('code', { required: true })}
                                  name="code"
                                  sx={{ border: 1, borderColor: '#12A9B2', mt: 1 }}
                                  size="small"
                                />
                              )}
                              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.code?.message}</Typography>
                            </FormControl>

                            <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                type="submit"
                                sx={{
                                  color: '#12A9B2',
                                  borderColor: '#12A9B2',
                                  '&:hover': { color: '#12A9B2', borderColor: '#12A9B2' },
                                  mr: 1
                                }}
                              >
                                Submit
                              </Button>
                              <Button
                                onClick={handleCancelButton}
                                variant="outlined"
                                size="small"
                                sx={{ color: '#FF0000', borderColor: '#FF0000', '&:hover': { color: '#FF0000', borderColor: '#FF0000' } }}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </MainCard>
      </Box>
    </Box>
  );
}
