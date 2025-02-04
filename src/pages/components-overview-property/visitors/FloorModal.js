import React, { useState } from 'react';
import { Box, Typography, TextField, FormHelperText, Button, Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useAppContextReception } from 'AppContextReception';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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

export default function FloorModal({ handleCloseFloor, floor }) {
  const { apartmentId, rentalId, buildingId } = useAppContextReception();
  const { register, handleSubmit } = useForm();
  const [visitors, setVisitors] = useState([{ extra_visitor_name: '', extra_visitor_phone: '' }]);

  const addVisitor = () => {
    setVisitors([...visitors, { extra_visitor_name: '', extra_visitor_phone: '' }]);
  };
  const handleVisitorChange = (index, field, value) => {
    const updatedVisitors = visitors.map((visitor, i) => (i === index ? { ...visitor, [field]: value } : visitor));
    setVisitors(updatedVisitors);
  };

  const onSubmit = (data) => {
    // console.log(data);
    const formattedData = {
      ...data,
      extra_visitor_name: visitors.map((v) => v.extra_visitor_name),
      extra_visitor_phone: visitors.map((v) => v.extra_visitor_phone)
    };

    axiosInstance
      .post('https://api.hellokompass.com/reception/aprtmeetng', formattedData)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleCloseFloor();
          // navigate('/meeting');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <Modal open={floor} onClose={handleCloseFloor} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={{ borderBottom: '1px solid #f1f1f1' }}>
            <Typography sx={{ fontSize: '18px', fontFamily: 'poppins', fontWeight: 'bold',color: '#333',  }}>Selected Date</Typography>
          </Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      <TextField fullWidth name="host_id" type="text" value={rentalId} {...register('host_id', { required: true })} />
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
                      sx={{ color: '#333', fontSize: '14px', fontFamily: 'poppins', fontWeight: 'medium', pb: '3px' }}
                    >
                      Guest Name*
                    </Typography>
                  </FormHelperText>
                  <TextField
                    fullWidth
                    name="guest_name"
                    type="text"
                    {...register('guest_name', { required: true })}
                    placeholder="Enter Guest Name"
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
                            sx={{ color: '#333', fontSize: '14px', fontFamily: 'poppins', fontWeight: 'medium', pb: '3px' }}
                          >
                            Code
                          </Typography>
                        </FormHelperText>
                        <TextField
                          fullWidth
                          value="88"
                          name="guest_country_code"
                          type="text"
                          {...register('guest_country_code', { required: true })}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10}>
                      <Box>
                        <FormHelperText>
                          <Typography
                            variant="h6"
                            component="h2"
                            sx={{ color: '#333', fontSize: '14px',fontFamily: 'poppins', fontWeight: 'medium', pb: '3px' }}
                          >
                            Guest Phone Number*
                          </Typography>
                        </FormHelperText>
                        <TextField
                          fullWidth
                          name="guest_phone"
                          type="text"
                          {...register('guest_phone', { required: true })}
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
                      sx={{ color: '#333', fontSize: '14px', fontFamily: 'poppins', fontWeight: 'medium', pb: '3px' }}
                    >
                      Guest location
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

                {/* Visitors Fields */}

                {/* Add Another Visitor Button */}
                <Box sx={{ my: 3 }}>
                  <Typography
                    onClick={addVisitor}
                    sx={{
                      py: 1,
                      fontFamily: 'poppins',
                      borderRadius: '0',
                      fontSize: '16px',
                      fontWeight: 'bolder',
                      color: '#2359E7',
                      cursor: 'pointer'
                    }}
                  >
                    Add Another Visitor +
                  </Typography>
                </Box>
                {visitors.map((visitor, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Box>
                      <FormHelperText sx={{ display: 'flex', mb: '3px' }}>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                        >
                          Extra Guest Name ({index})
                        </Typography>
                        <span style={{ text: '10px', textColor: '#f1f11f', marginTop: '2px', marginLeft: '4px' }}>(Optional)</span>
                      </FormHelperText>
                      <TextField
                        fullWidth
                        value={visitor.extra_visitor_name}
                        onChange={(e) => handleVisitorChange(index, 'extra_visitor_name', e.target.value)}
                        placeholder="Enter Extra Guest Name"
                      />
                    </Box>

                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <Box>
                          <FormHelperText>
                            <Typography
                              variant="p"
                              component="p"
                              sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', mt: 1.4 }}
                            >
                              Code
                            </Typography>
                          </FormHelperText>
                          <TextField
                            fullWidth
                            value="88"
                            name="guest_country_code"
                            type="text"
                            {...register('guest_country_code', { required: true })}
                          />
                        </Box>
                      </Grid>



                      <Grid item xs={10}> 
                        <Box>
                        <FormHelperText sx={{ display: 'flex' }}>
                          <Typography
                            variant="p"
                              component="p"
                            sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold' ,mt:1 }}
                          >
                            Extra Guest Phone
                          </Typography>
                          <span style={{ text: '10px', textColor: '#f1f11f', marginTop: '10px', marginLeft: '4px' }}>(Optional)</span>
                        </FormHelperText>
                        <TextField
                          fullWidth
                          value={visitor.extra_visitor_phone}
                          onChange={(e) => handleVisitorChange(index, 'extra_visitor_phone', e.target.value)}
                          placeholder="Enter Phone Number"
                        />
                      </Box></Grid>

                     
                    </Grid>
                  </Box>
                ))}

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
