import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { courierSchema } from 'components/validation/validation';

export default function Courier() {
  const [parcel, setParcel] = useState('');
  const navigate = useNavigate();

  const handleCancelButton = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(courierSchema) });

  const onSubmit = (data) => {
    console.log(data);
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
                Name
              </Typography>
              <TextField
                {...register('name', { required: true })}
                id="outlined-basic"
                name="name"
                size="large"
                variant="outlined"
                placeholder="Your Name"
                sx={{ width: '100%' }}
              />
              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.name?.message}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
                Phone
              </Typography>
              <TextField
                {...register('phone', { required: true })}
                id="outlined-basic"
                name="phone"
                size="large"
                variant="outlined"
                placeholder="Your Phone Ex: 017xxxxxxxx"
                sx={{ width: '100%' }}
              />
              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.phone?.message}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
                Company
              </Typography>
              <TextField
                {...register('company', { required: true })}
                id="outlined-basic"
                size="large"
                variant="outlined"
                name="company"
                placeholder="Your Company Name"
                sx={{ width: '100%' }}
              />
              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.company?.message}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ fontSize: 17, display: 'block' }}>
                Parcel Type
              </Typography>
              <Select
                {...register('parcelType', { required: true })}
                value={parcel}
                name="parcelType"
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
              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.parcelType?.message}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ fontSize: 17, display: 'block' }}>
                Employee
              </Typography>
              <Select
                {...register('employee', { required: true })}
                name="employee"
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
              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.employee?.message}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="outlined"
              size="large"
              type="submit"
              sx={{ color: '#12A9B2', borderColor: '#12A9B2', '&:hover': { color: '#12A9B2', borderColor: '#12A9B2' }, mr: 1 }}
            >
              Submit
            </Button>
            <Button
              onClick={handleCancelButton}
              variant="outlined"
              size="large"
              sx={{ color: '#FF0000', borderColor: '#FF0000', '&:hover': { color: '#FF0000', borderColor: '#FF0000' } }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </MainCard>
    </Box>
  );
}
