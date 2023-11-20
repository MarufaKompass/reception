import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  Select,
  Paper,
  Button,
  Avatar,
  MenuItem,
  Grid,
  FormControl,
  FormHelperText,
  OutlinedInput,
  TextField,
  InputLabel
} from '@mui/material';
import MainCard from 'components/MainCard';
import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// eslint-disable-next-line no-restricted-imports
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import '../../../assets/styles.css';

import 'react-datepicker/dist/react-datepicker.css';

const videoConstraints = {
  width: 150,
  height: 150,
  facingMode: 'user'
};

export default function InstantMeeting() {
  const ariaLabel = { 'aria-label': 'description' };
  const [selectedValue, setSelectedValue] = useState(0);
  const [days, setDays] = React.useState('');

  const { register, handleSubmit } = useForm();

  const handleChange = (event) => {
    setDays(event.target.value);
    setSelectedValue(event.target.value);
  };

  const onSubmit = (data) => {
    data.image = uploadedPhoto;
    data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload, visitor4Upload, visitor5Upload];
    data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone, visitor4Phone, visitor5Phone];
    data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name, visitor4Name, visitor5Name];
  };

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

  const onUserMedia = (e) => {
    console.log(e);
  };

  const webcamRef = useRef(null);

  //For The First Person Image

  const [photo, setPhoto] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState('');

  const capture = () => {
    return new Promise((resolve, reject) => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc);
      if (blob !== null) {
        setPhoto(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  };

  const submitImage = async () => {
    try {
      const capturedPhoto = await capture(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');
      console.log(capturedPhoto);
      const response = await axiosInstance.post('https://api.hellokompass.com/upload/image', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadedPhoto(response.data.data.files.file.image);
      console.log('Image uploaded:', response);
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  //Visitor 1 photo

  const [visitor1Upload, setVisitor1Upload] = useState('');
  const [visitor1Photo, setVisitor1Photo] = useState(null);

  const capture1 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc1 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc1);
      if (blob !== null) {
        setVisitor1Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor1Image = async () => {
    try {
      const capturedPhoto = await capture1(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor1Upload(res.data.data.files.file.image);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor1Name, setVisitor1Name] = useState('');
  const [visitor1Phone, setVisitor1Phone] = useState('');

  const handleVisitor1Name = (e) => {
    const name = e.target.value;
    setVisitor1Name(name);
  };

  const handleVisitor1Phone = (e) => {
    const phone = e.target.value;
    setVisitor1Phone(phone);
  };

  /* The above code is a JavaScript code snippet that is using React hooks to capture an image from a
   webcam and submit it to an API endpoint. */
  const [visitor2Upload, setVisitor2Upload] = useState('');
  const [visitor2Photo, setVisitor2Photo] = useState(null);

  const capture2 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc2 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc2);
      if (blob !== null) {
        setVisitor2Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor2Image = async () => {
    try {
      const capturedPhoto = await capture2(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor2Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor2Name, setVisitor2Name] = useState('');
  const [visitor2Phone, setVisitor2Phone] = useState('');

  const handleVisitor2Name = (e) => {
    const name = e.target.value;
    setVisitor2Name(name);
  };

  const handleVisitor2Phone = (e) => {
    const phone = e.target.value;
    setVisitor2Phone(phone);
  };

  const [visitor3Upload, setVisitor3Upload] = useState('');
  const [visitor3Photo, setVisitor3Photo] = useState(null);

  const capture3 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc3 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc3);
      if (blob !== null) {
        setVisitor3Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor3Image = async () => {
    try {
      const capturedPhoto = await capture3(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor3Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor3Name, setVisitor3Name] = useState('');
  const [visitor3Phone, setVisitor3Phone] = useState('');

  const handleVisitor3Name = (e) => {
    const name = e.target.value;
    setVisitor3Name(name);
  };

  const handleVisitor3Phone = (e) => {
    const phone = e.target.value;
    setVisitor3Phone(phone);
  };

  const [visitor4Upload, setVisitor4Upload] = useState('');
  const [visitor4Photo, setVisitor4Photo] = useState(null);

  const capture4 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc4 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc4);
      if (blob !== null) {
        setVisitor4Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor4Image = async () => {
    try {
      const capturedPhoto = await capture4(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor4Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor4Name, setVisitor4Name] = useState('');
  const [visitor4Phone, setVisitor4Phone] = useState('');

  const handleVisitor4Name = (e) => {
    const name = e.target.value;
    setVisitor4Name(name);
  };

  const handleVisitor4Phone = (e) => {
    const phone = e.target.value;
    setVisitor4Phone(phone);
  };

  /* The above code is a JavaScript function that captures an image from a webcam using the `webcamRef`
   reference. It converts the captured image into a blob object and sets it as the `visitor5Photo`
   state. */
  const [visitor5Upload, setVisitor5Upload] = useState('');
  const [visitor5Photo, setVisitor5Photo] = useState(null);

  const capture5 = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const imageSrc5 = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc5);
      if (blob !== null) {
        setVisitor5Photo(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  }, [webcamRef]);

  const submitVisitor5Image = async () => {
    try {
      const capturedPhoto = await capture5(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'images');
      requestData.append('file', capturedPhoto, 'captured_image.png');

      axiosInstance
        .post('https://api.hellokompass.com/upload/image', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          setVisitor5Upload(res.data.data.files.file.image);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };

  const [visitor5Name, setVisitor5Name] = useState('');
  const [visitor5Phone, setVisitor5Phone] = useState('');

  const handleVisitor5Name = (e) => {
    const name = e.target.value;
    setVisitor5Name(name);
  };

  const handleVisitor5Phone = (e) => {
    const phone = e.target.value;
    setVisitor5Phone(phone);
  };

  return (
    <Box>
      <MainCard>
        <Paper>
          <Box>
            <Typography
              variant="h5"
              color="#fff"
              backgroundColor="#12A9B2"
              sx={{ px: 3, py: 2, borderRadius: 1, display: 'flex', justifyContent: 'center' }}
            >
              Instant Appointment
            </Typography>
          </Box>
          <Box sx={{ p: { xs: 1, sm: 3 } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Title
                        </Typography>
                      </FormHelperText>

                      <TextField
                        {...register('title', { required: true })}
                        fullWidth
                        id="standard-basic"
                        sx={{ mt: '9px' }}
                        name="title"
                        placeholder="title"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                    <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Phone
                        </Typography>
                      </FormHelperText>
                      <Box sx={{ display: 'flex' }}>
                        <FormControl size="small">
                          <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} size="medium" sx={{ mt: 1, mr: 2 }}>
                            <MenuItem>
                              <InputLabel selected htmlFor="outlined-adornment">
                                Country Code
                              </InputLabel>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          id="standard-basic"
                          fullWidth
                          sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                          inputProps={ariaLabel}
                          type="number"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Email
                        </Typography>
                      </FormHelperText>

                      <TextField fullWidth id="standard-basic" sx={{ mt: '9px' }} name="Email" placeholder="email" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 1 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Gender
                        </Typography>
                      </FormHelperText>
                      <FormControl size="small" sx={{ width: '100%' }}>
                        <Select
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="medium"
                          sx={{ mt: 1, mr: 2, width: '100%' }}
                        >
                          <MenuItem>
                            <InputLabel selected htmlFor="outlined-adornments">
                              Gender
                            </InputLabel>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Company
                        </Typography>
                      </FormHelperText>

                      <TextField fullWidth id="standard-basic" sx={{ mt: '9px' }} name="Company" placeholder="Company" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Employee
                        </Typography>
                      </FormHelperText>
                      <FormControl size="small" sx={{ width: '100%' }}>
                        <Select
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="medium"
                          sx={{ mt: 1, mr: 2, width: '100%' }}
                        >
                          <MenuItem value="">
                            <em>Employee</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Purpose
                        </Typography>
                      </FormHelperText>
                      <FormControl size="small" sx={{ width: '100%' }}>
                        <Select
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="medium"
                          sx={{ mt: 1, mr: 2, width: '100%' }}
                        >
                          <MenuItem>
                            <InputLabel selected htmlFor="outlined-adornments">
                              Purpose
                            </InputLabel>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Date
                        </Typography>
                      </FormHelperText>
                      <FormControl className="maxWidth">
                        <Box>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DesktopDatePicker']}>
                              <DemoItem>
                                <DatePicker
                                  sx={{
                                    overflow: 'hidden',
                                    width: '100%',
                                    display: 'flex',
                                    alignitem: 'spaceBetween'
                                  }}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Time
                        </Typography>
                      </FormHelperText>
                      <FormControl sx={{ mt: 0 }} fullWidth className="maxWidth">
                        <Box className="maxWidth">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['MobileTimePicker']}>
                              <DemoItem>
                                <MobileTimePicker
                                  className="maxWidth"
                                  renderInput={(params) => <TextField {...params} value={params.value} />}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                    <Box>
                      <FormHelperText sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="h5" component="h5" color="#4e4d4e">
                          Additional Visitor No
                        </Typography>
                      </FormHelperText>
                      <FormControl fullWidth>
                        <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} value={days} onChange={handleChange}>
                          <MenuItem value={0} selected>
                            0
                          </MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* Render elements when the selected value is 1 */}
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ order: 2 }} sx={{ order: { xs: 1, sm: 2 } }}>
                  {selectedValue === 1 && (
                    <Grid container>
                      <Grid item xs={12} sx={{ pr: 3 }}>
                        <Grid container>
                          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h5" component="h5" color="#4e4d4e">
                                  Visitor(1) Name
                                </Typography>
                              </FormHelperText>
                              <OutlinedInput
                                onChange={(e) => handleVisitor1Name(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                fullWidth
                                inputProps={ariaLabel}
                                type="text"
                                placeholder="Name"
                                value={visitor1Name}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <FormHelperText>
                                <Typography variant="h5" component="h5" color="#4e4d4e">
                                  Visitor(1) Phone
                                </Typography>
                              </FormHelperText>
                              <OutlinedInput
                                onChange={(e) => handleVisitor1Phone(e)}
                                sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                type="number"
                                fullWidth
                                inputProps={ariaLabel}
                                placeholder="01*********"
                                required
                              />
                            </Box>
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Button
                                onClick={() => submitVisitor1Image(visitor1Photo)}
                                variant="outlined"
                                size="medium"
                                sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                              >
                                Visitor Photo 1
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              {visitor1Photo && (
                                <Avatar
                                  alt="Captured"
                                  src={URL.createObjectURL(visitor1Photo)}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', mt: 1 }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {/* Render elements when the selected value is 2 */}

                  {selectedValue === 2 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                  value={visitor1Name}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                  required
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor1Image(visitor1Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 1
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor1Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor1Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor2Image(visitor2Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 2
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor2Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor2Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Render elements when the selected value is 3 */}

                  {selectedValue === 3 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                  value={visitor1Name}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                  required
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor1Image(visitor1Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 1
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor1Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor1Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor2Image(visitor2Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 2
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor2Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor2Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(3) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor3Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(3) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor3Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor3Image(visitor3Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 3
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor3Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor3Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Render elements when the selected value is 4 */}

                  {selectedValue === 4 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                  value={visitor1Name}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                  required
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor1Image(visitor1Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 1
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor1Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor1Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor2Image(visitor2Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 2
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor2Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor2Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(3) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor3Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(3) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor3Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor3Image(visitor3Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 3
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor3Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor3Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(4) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor4Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(4) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor4Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor4Image(visitor4Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 4
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor4Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor4Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {selectedValue === 5 && (
                    <Box>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                  value={visitor1Name}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(1) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor1Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                  required
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor1Image(visitor1Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 1
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor1Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor1Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(2) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor2Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor2Image(visitor2Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 2
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor2Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor2Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(3) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor3Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(3) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor3Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor3Image(visitor3Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 3
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor3Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor3Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(4) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor4Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(4) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor4Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor4Image(visitor4Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 4
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor4Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor4Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={12} sx={{ pr: 3 }}>
                          <Grid container>
                            <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 2 } }}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(5) Name
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor5Name(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  fullWidth
                                  inputProps={ariaLabel}
                                  type="text"
                                  placeholder="Name"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <FormHelperText>
                                  <Typography variant="h6" component="h2" color="#4e4d4e">
                                    Visitor(5) Phone
                                  </Typography>
                                </FormHelperText>
                                <OutlinedInput
                                  onChange={(e) => handleVisitor5Phone(e)}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  type="number"
                                  fullWidth
                                  inputProps={ariaLabel}
                                  placeholder="01*********"
                                />
                              </Box>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  onClick={() => submitVisitor5Image(visitor5Photo)}
                                  variant="outlined"
                                  size="medium"
                                  sx={{ mt: 2, p: 1, color: '#12A9B2' }}
                                >
                                  Visitor Photo 5
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                {visitor5Photo && (
                                  <Avatar
                                    alt="Captured"
                                    src={URL.createObjectURL(visitor5Photo)}
                                    variant="square"
                                    sx={{ width: '100px', height: '100px', mt: 1 }}
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Grid>
                {/* camera */}
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ order: { xs: 2, sm: 1 } }} sx={{ order: { xs: 2, sm: 1 }, mt: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                        onUserMedia={onUserMedia}
                        mirrored={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                      {photo && (
                        <Avatar alt="Captured" src={URL.createObjectURL(photo)} variant="square" sx={{ width: '150px', height: '150px' }} />
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                      <Button onClick={() => submitImage(photo)} variant="outlined" size="medium" sx={{ my: 2, p: 1, color: '#12A9B2' }}>
                        Take Photo
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#12A9B2', width: 100, mr: 2, '&:hover': { backgroundColor: '#12A9B2' } }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#12A9B2', width: 100, '&:hover': { backgroundColor: '#12A9B2' } }}
                >
                  Next
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </MainCard>
    </Box>
  );
}
