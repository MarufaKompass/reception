import React from 'react';
import { Box, Typography, TextField, FormHelperText, Button, Grid, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function AddDeliveryModal({ handleCloseDelivery, addDeliveryList }) {
  const { apartmentId, rentalId, buildingId } = useAppContextReception();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {

    console.log(data);
    axiosInstance
      .post('https://api.hellokompass.com/reception/aptcourier', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleCloseDelivery();
          // navigate('/meeting');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Modal
        open={addDeliveryList}
        onClose={handleCloseDelivery}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Box >
                        <Typography variant="h4" sx={{ color: '#333',pr:'4px',fontSize: '18px' ,font:'poppins' , fontWeight:'bolder'}}>
                         Courier Form
                        </Typography>
                      </Box>
                      <Box sx={{borderBottom:'1px solid #f1f1f1' , pt:'6px'}}>

                      </Box>
              <Box>
                <Box hidden>
                  <Box sx={{ mt: 2 }}>
                    {apartmentId && (
                      <TextField
                        fullWidth
                        name="apartment_id"
                        type="text"
                        value={apartmentId}
                        {...register('apartment_id', { required: true })}
                      />
                    )}
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    {rentalId && (
                      <TextField fullWidth name="person_id" type="text" value={rentalId} {...register('person_id', { required: true })} />
                    )}
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {buildingId && (
                      <TextField
                        fullWidth
                        name="building_id"
                        type="text"
                        value={buildingId}
                        {...register('building_id', { required: true })}
                      />
                    )}
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <FormHelperText>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Courier Person Name*
                    </Typography>
                  </FormHelperText>
                  <TextField
                    fullWidth
                    name="courier_person_name"
                    type="text"
                    {...register('courier_person_name', { required: true })}
                    placeholder="Courier Person Name"
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <Box>
                        <FormHelperText>
                          <Typography
                            variant="h6"
                            component="h2"
                            sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                          >
                            Code
                          </Typography>
                        </FormHelperText>
                        <TextField
                          fullWidth
                          value="88"
                          name="courier_person_country_code"
                          type="text"
                          {...register('courier_person_country_code', { required: true })}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box>
                        <FormHelperText>
                          <Typography
                            variant="h6"
                            component="h2"
                            sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                          >
                            Guest Phone Number*
                          </Typography>
                        </FormHelperText>
                        <TextField
                          fullWidth
                          name="courier_person_phone"
                          type="text"
                          {...register('courier_person_phone', { required: true })}
                          placeholder="Enter Phone Number"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <FormHelperText sx={{ display: 'flex' }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Location
                    </Typography>
                    <span style={{ text: '10px', textColor: '#f1f11f', marginTop: '2px', marginLeft: '4px' }}>(Optional)</span>
                  </FormHelperText>
                  <TextField
                    fullWidth
                    name="location"
                    type="text"
                    {...register('location', { required: true })}
                    placeholder="Enter Location"
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <FormHelperText>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Courier Person Gender
                    </Typography>
                  </FormHelperText>

                  <FormControl fullWidth >
                    <Select
                      {...register('courier_person_gender', { required: true })}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="medium"
                    >
                      <MenuItem>
                        <InputLabel selected htmlFor="outlined-adornment">
                          Select Gender
                        </InputLabel>
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    {/* <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.leave_category?.message}</Typography> */}
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <FormHelperText>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Courier Company Name
                    </Typography>
                  </FormHelperText>
                  <TextField
                    fullWidth
                    name="courier_company_name"
                    type="text"
                    {...register('courier_company_name', { required: true })}
                    placeholder="Courier Company Name"
                  />
                </Box>

                {/* Visitors Fields */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="small"
                  sx={{
                    mt: 2,
                    backgroundColor: '#12A9B2',
                    px: 4,
                    py: 1,
                    font: 'poppins',
                    borderRadius: '0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#12A9B2' }
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
