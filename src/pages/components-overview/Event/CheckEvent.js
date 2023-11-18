import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { Box, OutlinedInput, Typography, Button } from '@mui/material';

export default function CheckEvent() {
  const delay = 500;

  const previewStyle = {
    height: 240,
    width: 220
  };

  const [result, setResult] = useState('Event Code');

  const handleScan = (result) => {
    if (result) {
      setResult(result);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <Box>
      <MainCard>
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
        <Box sx={{ display: { sm: 'flex' }, justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <QrReader delay={delay} style={previewStyle} onError={handleError} onScan={handleScan} />
          </Box>
          <Box sx={{ mx: 2 }}>
            <Typography variant="h6">Event Code *</Typography>

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
      </MainCard>
    </Box>
  );
}
