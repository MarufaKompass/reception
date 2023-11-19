import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { Box, OutlinedInput, Typography, Button, Paper } from '@mui/material';
import Image from '../../../assets/images/img/reception_background.png';
export default function CheckEvent() {
  const delay = 500;

  const previewStyle = {
    height: '180px',
    width: '100%',
    border: 1,
    borderColor: '#12A9B2'
  };

  const [resultQR, setResultQR] = useState('');

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
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      height: '80vh'
    }
  };
  return (
    <Box>
      <MainCard>
        <Paper style={styles.paperContainer}>
          <Box>
            <Typography
              variant="h5"
              color="#fff"
              backgroundColor="#12A9B2"
              sx={{ px: 3, py: 2, borderRadius: 1, display: 'flex', justifyContent: 'center' }}
            >
              Enter Event Code
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <Box
              backgroundColor="#fff"
              sx={{
                height: { xs: '80%', xl: '50%' },
                width: { md: '70%', lg: '70%', xl: '50%' },
                mt: -8,
                p: 2,
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
              <Box sx={{ display: { sm: 'flex', md: 'flex' }, justifyContent: 'center', alignItems: 'center', my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <QrReader delay={delay} style={previewStyle} onError={handleError} onScan={handleScan} />
                </Box>
                <Box sx={{ mx: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: '40%' } }}>
                  <Typography variant="h6">Event Code *</Typography>

                  <OutlinedInput
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    sx={{ border: 1, borderColor: '#12A9B2', width: '100%', my: 1 }}
                    size="small"
                    value={resultQR}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ color: '#12A9B2', borderColor: '#12A9B2', '&:hover': { color: '#12A9B2', borderColor: '#12A9B2' }, mr: 1 }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ color: '#FF0000', borderColor: '#FF0000', '&:hover': { color: '#FF0000', borderColor: '#FF0000' } }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </MainCard>
    </Box>
  );
}
