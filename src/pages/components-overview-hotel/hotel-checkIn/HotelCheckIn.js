import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import { Box, OutlinedInput, Typography, Button, FormControl } from '@mui/material';
import Image from '../../../assets/images/img/reception_background.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { meetingCodeSchema } from 'components/validation/validation';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import { toast } from 'react-toastify';
import PuffLoader from 'react-spinners/PuffLoader';

export default function HotelCheckIn() {
  const delay = 500;
  const { comId} = useAppContextReception();
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
      onSubmit({ code: resultQR, company_id: comId }); // Pass data to onSubmit
    }
  }, [resultQR, comId]);


  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/reception/hotekcheckin', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          console.log(res.data.message);
          navigate('/dashboard');
          reset();
        } else {
          toast.error(res.data.message);
          navigate('/dashboard');
          reset();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          navigate('/dashboard');
          reset();
        } else {
          console.error(error);
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
      backgroundSize: '100% 80%', // This will cover the entire container
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '80%'
    }
  };

  return (
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
              Scanning Code/Enter Meeting Code For Lobby
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <Box
              backgroundColor="#fff"
              sx={{
                height: { xs: '80%', xl: '50%' },
                width: { md: '80%', lg: '80%', xl: '60%' },
                mt: -8,
                p: { xs: 2, md: 0 },
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
                <Box sx={{ display: { md: 'flex' }, justifyContent: 'center', alignItems: 'center', my: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <PuffLoader color="#12a9b2" size={38} />
                      <Typography sx={{ color: '#12A9B2', fontSize: 15, fontWeight: 'bold', mt: '8px', ml: '10px' }}>
                        Scanning code for Lobby
                      </Typography>
                    </Box>
                    <QrReader
                      delay={delay}
                      style={{ height: '200px', width: '100%', border: 1, padding: 0, margin: 0, borderColor: '#12A9B2' }}
                      onError={handleError}
                      onScan={handleScan}
                    />
                  </Box>
                  <Box sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 }, width: { xs: '100%', md: '40%' } }}>
                    <Typography variant="h6">Lobby Check-In Code *</Typography>
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

                    <OutlinedInput
                      {...register('company_id', { required: true })}
                      name="company_id"
                      sx={{ display: 'none' }}
                      size="small"
                      value={comId}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        type="submit"
                        sx={{ color: '#12A9B2', borderColor: '#12A9B2', '&:hover': { color: '#12A9B2', borderColor: '#12A9B2' }, mr: 1 }}
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
              </form>
            </Box>
          </Box>
        </Box>
      </MainCard>
    </Box>
  );
}
