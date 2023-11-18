import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

export default function Courier() {
  const [parcel, setParcel] = useState('');

  const handleChange = (event) => {
    setParcel(event.target.value);
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
            Courier Information
          </Typography>
        </Box>
        <Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
              Name
            </Typography>
            <TextField id="outlined-basic" size="large" variant="outlined" placeholder="Your Name" sx={{ width: '100%' }} />
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
              Phone
            </Typography>
            <TextField
              id="outlined-basic"
              size="large"
              variant="outlined"
              placeholder="Your Phone Ex: 017xxxxxxxx"
              sx={{ width: '100%' }}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
              Company
            </Typography>
            <TextField id="outlined-basic" size="large" variant="outlined" placeholder="Your Company Name" sx={{ width: '100%' }} />
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="p" sx={{ fontSize: 17, display: 'block' }}>
              Parcel Type
            </Typography>
            <Select
              value={parcel}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '100%' }}
            >
              <MenuItem value="">
                <em>Select Parcel Type</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="p" sx={{ fontSize: 17, display: 'block' }}>
              Employee
            </Typography>
            <Select
              value={parcel}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '100%' }}
            >
              <MenuItem value="">
                <em>Select Employee</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: '#12A9B2', borderColor: '#12A9B2', '&:hover': { color: '#12A9B2', borderColor: '#12A9B2' }, mr: 1 }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: '#FF0000', borderColor: '#FF0000', '&:hover': { color: '#FF0000', borderColor: '#FF0000' } }}
          >
            Cancel
          </Button>
        </Box>
      </MainCard>
    </Box>
  );
}
