
import React from 'react';
import { Box, Typography, TextField, FormHelperText, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useAppContextReception } from 'AppContextReception';
import { useForm, useFieldArray } from 'react-hook-form';

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
  const { apartmentId } = useAppContextReception();
  const { register, handleSubmit, control } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: 'visitors' // Name for the array of visitors
  });

  const onSubmit = (data) => {
    console.log(data);
    // Process the form data here (e.g., send to API)
  };

  

  return (
    <Box>
      <Modal open={floor} onClose={handleCloseFloor} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {apartmentId}
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Box sx={{ mt: 1 }}>
                  <FormHelperText>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Name*
                    </Typography>
                  </FormHelperText>
                  <TextField fullWidth name="" type="text" {...register('old_password', { required: true })} placeholder="Enter Name" />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <FormHelperText sx={{ display: 'flex' }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Address
                    </Typography>
                    <span style={{ text: '10px', textColor: '#f1f11f', marginTop: '2px', marginLeft: '4px' }}>(Optional)</span>
                  </FormHelperText>
                  <TextField fullWidth name="" type="text" {...register('old_password', { required: true })} placeholder="Enter Address" />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <FormHelperText>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                    >
                      Phone Number*
                    </Typography>
                  </FormHelperText>
                  <TextField
                    fullWidth
                    name=""
                    type="text"
                    {...register('old_password', { required: true })}
                    placeholder="Enter Phone Number"
                  />
                </Box>

                {/* Visitors Fields */}

                {/* Add Another Visitor Button */}
                <Box sx={{ my: 3 }}>
                  <Typography
                    onClick={() => append({ name: '', phone: '' })} // Add a new visitor field when clicked
                    sx={{
                      py: 1,
                      font: 'poppins',
                      borderRadius: '0',
                      fontSize: '16px',
                      fontWeight: 'bolder',
                      color: '#2359E7',
                      cursor: 'pointer' // Making the text clickable
                    }}
                  >
                    Add Another Visitor +
                  </Typography>
                </Box>
                {fields.map((item, index) => (
                  <Box key={item.id} sx={{ mt: 0 }}>
                    <FormHelperText>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                      >
                        Name*
                      </Typography>
                    </FormHelperText>
                    <TextField
                      fullWidth
                      name={`visitors[${index}].name`}
                      type="text"
                      {...register(`visitors[${index}].name`, { required: true })}
                      placeholder="Enter Name"
                    />
                    <FormHelperText sx={{ mt: 1 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ color: '#333', fontSize: '14px', font: 'poppins', fontWeight: 'bold', pb: '3px' }}
                      >
                        Phone Number*
                      </Typography>
                    </FormHelperText>
                    <TextField
                      fullWidth
                      name={`visitors[${index}].phone`}
                      type="text"
                      {...register(`visitors[${index}].phone`, { required: true })}
                      placeholder="Enter Phone Number"
                    />
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
