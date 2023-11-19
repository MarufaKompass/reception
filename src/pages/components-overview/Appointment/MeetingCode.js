import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { Box, OutlinedInput, Typography, Button, Paper } from '@mui/material';
import Image from '../../../assets/images/img/reception_background.png'; // Import using relative path

export default function MeetingCode() {
  const delay = 500;

  const previewStyle = {
    height: 240,
    width: 220
  };

  const [result, setResult] = useState('Meeting Code');

  const handleScan = (result) => {
    if (result) {
      setResult(result);
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
              Enter Meeting Code
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <Box backgroundColor="blue" width="60%">
              <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center', alignItems: 'center', my: 2 }} height="450px">
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <QrReader delay={delay} style={previewStyle} onError={handleError} onScan={handleScan} />
                </Box>
                <Box sx={{ mx: 2 }}>
                  <Typography variant="h6">Meeting Code *</Typography>

                  <OutlinedInput
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    placeholder="Search"
                    sx={{ border: 1, borderColor: '#12A9B2', width: '100%', my: 1 }}
                    size="small"
                    value={result}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
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
