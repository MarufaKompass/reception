import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { courierSchema } from 'components/validation/validation';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import { toast } from 'react-toastify';

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
        if (res.data.code) {
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
                type="number"
                placeholder="Your Phone Ex: 017xxxxxxxx"
                sx={{ width: '100%' }}
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
                {...register('parcel_type', { required: true })}
                name="parcel_type"
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ width: '100%' }}
              >
                <MenuItem value="">
                  <em>Select Parcel Type</em>
                </MenuItem>
                <MenuItem value="document">Documents</MenuItem>
                <MenuItem value="small box">Small Box</MenuItem>
                <MenuItem value="medium box">Medium Box</MenuItem>
              </Select>
              <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.parcel_type?.message}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ fontSize: 17, display: 'block' }}>
                Employee
              </Typography>
              <Select
                {...register('person_id', { required: true })}
                name="person_id"
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ width: '100%' }}
              >
                <MenuItem value="">
                  <em>Select Employee Type</em>
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
