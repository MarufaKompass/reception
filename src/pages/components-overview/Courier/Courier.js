import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { courierSchema } from 'components/validation/validation';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import { toast } from 'react-toastify';
import courier from '../../../assets/images/img/Courier.png';
export default function Courier() {
  const { comId } = useAppContextReception();
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();

  const handleCancelButton = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(courierSchema) });

  const onSubmit = (data) => {
    axiosInstance
      .post('https://api.hellokompass.com/courier/add', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          navigate('/courierList');
          reset();
        } else if (res.data.code === 400) {
          toast.error(res.data.message);
          reset();
        } else {
          <></>;
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/employee/${comId}`)
        .then((res) => setEmployeeList(res.data.data))
        .catch((err) => console.error(err));
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="p" fontSize="14px">
                    Ref
                  </Typography>
                  <TextField
                    {...register('ref', { required: true })}
                    id="outlined-basic"
                    name="ref"
                    size="medium"
                    variant="outlined"
                    placeholder="reference"
                    sx={{ width: '100%', mt: 1 }}
                  />
                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.ref?.message}</Typography>
                </Box>
                <Box>
                  <Typography variant="p" fontSize="14px">
                    Delivery Man Name
                  </Typography>
                  <TextField
                    {...register('name', { required: true })}
                    id="outlined-basic"
                    name="name"
                    size="medium"
                    variant="outlined"
                    placeholder="Delivery Man Name"
                    sx={{ width: '100%', mt: 1 }}
                  />
                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.name?.message}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="p" sx={{ my: 2 }} fontSize="14px">
                    Delivery Man Phone
                  </Typography>
                  <TextField
                    {...register('phone', { required: true })}
                    id="outlined-basic"
                    name="phone"
                    size="medium"
                    variant="outlined"
                    type="number"
                    placeholder="Phone Ex: 017xxxxxxxx"
                    sx={{ width: '100%', mt: 1 }}
                  />
                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.phone?.message}</Typography>
                </Box>
                <TextField
                  {...register('com_id', { required: true })}
                  id="outlined-basic"
                  name="com_id"
                  variant="outlined"
                  sx={{ display: 'none' }}
                  value={comId}
                />
                <Box sx={{ my: 2 }}>
                  <Typography variant="p" sx={{ my: 2 }} fontSize="14px">
                    Delivery Company
                  </Typography>
                  <TextField
                    {...register('company', { required: true })}
                    id="outlined-basic"
                    size="medium"
                    variant="outlined"
                    name="company"
                    placeholder="Delivery Company Name"
                    sx={{ width: '100%', mt: 1 }}
                  />
                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.company?.message}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="p" sx={{ display: 'block' }} fontSize="14px">
                    Parcel Type
                  </Typography>
                  <Select
                    {...register('parcel_type', { required: true })}
                    name="parcel_type"
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ width: '100%', mt: 1 }}
                    size="medium"
                    displayEmpty
                  >
                    <MenuItem>
                      <InputLabel selected htmlFor="outlined-adornments">
                        Select
                      </InputLabel>
                    </MenuItem>
                    <MenuItem value="Gift">Gift</MenuItem>
                    <MenuItem value="Gift">Food</MenuItem>
                    <MenuItem value="Document">Document</MenuItem>
                    <MenuItem value="Package">Package</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                  </Select>
                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.parcel_type?.message}</Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="p" sx={{ display: 'block' }} fontSize="14px">
                    Employee
                  </Typography>
                  <Select
                    {...register('person_id', { required: true })}
                    name="person_id"
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ width: '100%', mt: 1 }}
                    size="medium"
                    displayEmpty
                  >
                    <MenuItem selected htmlFor="outlined-adornment">
                      <InputLabel>Select</InputLabel>
                    </MenuItem>
                    {employeeList.map((employee) => (
                      <MenuItem key={employee.id} value={employee.person_id}>
                        {employee.pname} ({employee.dname})
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.person_id?.message}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <img src={courier} alt="courier" height="100%" width="100%" />
                </Box>
              </Box>
            </Grid>
          </Grid>
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
