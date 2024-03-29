import React, { useEffect, useRef, useState } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { instantMeetingSchema } from 'components/validation/validation';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import '../../../assets/styles.css';
import { styled } from '@mui/material/styles';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StyledTimePicker = styled(TimePicker)({
  '& .rc-time-picker-input': {
    width: '100%',
    height: '34px',
    borderColor: '#eaeaea',
    fontSize: '15px',
    '&:hover': {
      borderColor: '#12A9B2'
    },
    '&:focus': {
      borderColor: '#12A9B2'
    }
  }
});

const videoConstraints = {
  width: 150,
  height: 150,
  facingMode: 'user'
};

export default function InstantMeeting() {
  const { comId } = useAppContextReception();
  const ariaLabel = { 'aria-label': 'description' };
  const [selectedValue, setSelectedValue] = useState(0);
  const [days, setDays] = useState('');
  const navigate = useNavigate();
  const defaultTime = moment();
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [selectTime, setSelectTime] = useState('');

  const handleChangeTime = (event) => {
    setSelectTime(event.target.value);
  };

  const handleCancelButton = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(instantMeetingSchema) });

  const handleChange = (event) => {
    setDays(event.target.value);
    setSelectedValue(event.target.value);
  };

  const onSubmit = (data) => {
    data.time = selectedTime.format('HH:mm');
    data.guest_image = uploadedPhoto;
    console.log(data);

    if (visitor5Name) {
      data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name, visitor4Name, visitor5Name];
    } else if (visitor4Name) {
      data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name, visitor4Name];
    } else if (visitor3Name) {
      data.extra_visitor_name = [visitor1Name, visitor2Name, visitor3Name];
    } else if (visitor2Name) {
      data.extra_visitor_name = [visitor1Name, visitor2Name];
    } else if (visitor1Name) {
      data.extra_visitor_name = [visitor1Name];
    } else {
      data.extra_visitor_name = [];
    }

    if (visitor5Name) {
      data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload, visitor4Upload, visitor5Upload];
    } else if (visitor4Name) {
      data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload, visitor4Upload];
    } else if (visitor3Name) {
      data.extra_visitor_image = [visitor1Upload, visitor2Upload, visitor3Upload];
    } else if (visitor2Name) {
      data.extra_visitor_image = [visitor1Upload, visitor2Upload];
    } else if (visitor1Name) {
      data.extra_visitor_image = [visitor1Upload];
    } else {
      data.extra_visitor_image = [];
    }

    if (visitor5Name) {
      data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone, visitor4Phone, visitor5Phone];
    } else if (visitor4Name) {
      data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone, visitor4Phone];
    } else if (visitor3Name) {
      data.extra_visitor_phone = [visitor1Phone, visitor2Phone, visitor3Phone];
    } else if (visitor2Name) {
      data.extra_visitor_phone = [visitor1Phone, visitor2Phone];
    } else if (visitor1Name) {
      data.extra_visitor_phone = [visitor1Phone];
    } else {
      data.extra_visitor_phone = [];
    }

    axiosInstance.post('https://api.hellokompass.com/reception/addmeeting', data).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        navigate('/meeting');
        reset();
      } else if (res.data.code === 400) {
        toast.error(res.data.message);
        reset();
      } else {
        <></>;
      }
    });
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
      requestData.append('module_name', 'visitorimage');
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
      requestData.append('module_name', 'visitorimage');
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
      const capturedPhoto = await capture2();

      const requestData = new FormData();
      requestData.append('module_name', 'visitorimage');
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
      const capturedPhoto = await capture3();

      const requestData = new FormData();
      requestData.append('module_name', 'visitorimage');
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
      const capturedPhoto = await capture4();

      const requestData = new FormData();
      requestData.append('module_name', 'visitorimage');
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
      const capturedPhoto = await capture5();

      const requestData = new FormData();
      requestData.append('module_name', 'visitorimage');
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

  //Country Code
  const [countryCode, setCountryCode] = useState([]);
  const [defaultCountryCode, setDefaultCountryCode] = useState('88');

  useEffect(() => {
    axiosInstance
      .get('https://api.hellokompass.com/country/')
      .then((res) => {
        setCountryCode(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCountryChange = (e) => {
    setDefaultCountryCode(e.target.value);
  };

  //Employee list

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/employee/${comId}`)
        .then((res) => setEmployeeList(res.data.data))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  //Purpose
  const [purpose, setPurpose] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get('https://api.hellokompass.com/purpose')
        .then((res) => {
          setPurpose(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, []);
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
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Name
                        </Typography>
                      </FormHelperText>

                      <TextField
                        {...register('guest_name', { required: true })}
                        fullWidth
                        id="standard-basic"
                        sx={{ mt: '9px' }}
                        size="small"
                        name="guest_name"
                        placeholder="Guest Name"
                      />
                    </Box>
                    <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.guest_name?.message}</Typography>
                  </Grid>
                  <TextField
                    {...register('company_id', { required: true })}
                    fullWidth
                    id="standard-basic"
                    sx={{ display: 'none' }}
                    name="company_id"
                    placeholder="Guest Name"
                    value={comId}
                  />
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, pl: 2 }}>
                    <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Phone
                        </Typography>
                      </FormHelperText>
                      <Box fullWidth>
                        <Grid container spacing={2}>
                          <Grid items xs={12}>
                            <Grid container sx={{ mt: '18px' }}>
                              <Grid items sm={6} md={4} lg={5} xl={3} sx={{ width: '100%' }}>
                                <Select
                                  {...register('guest_country_code', { required: true })}
                                  name="guest_country_code"
                                  onChange={handleCountryChange}
                                  value={defaultCountryCode}
                                  inputProps={{ 'aria-label': 'Without label' }}
                                  size="small"
                                  sx={{ mt: 1, mr: 2 }}
                                >
                                  {countryCode.map((country) => (
                                    <MenuItem key={country.id} value={country.pcode}>
                                      {country.name}({country.pcode})
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>

                              <Grid items sm={6} md={8} lg={7} xl={9} sx={{ width: '100%' }}>
                                <TextField
                                  {...register('guest_phone', { required: true })}
                                  id="standard-basic"
                                  name="guest_phone"
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1, width: '100%' }}
                                  inputProps={ariaLabel}
                                  type="number"
                                  size="small"
                                  placeholder="Phone number"
                                />
                              </Grid>
                            </Grid>
                            <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.guest_phone?.message}</Typography>
                          </Grid>
                        </Grid>
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
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Email
                        </Typography>
                      </FormHelperText>

                      <TextField
                        {...register('guest_email', { required: true })}
                        fullWidth
                        id="standard-basic"
                        size="small"
                        sx={{ mt: '9px' }}
                        name="guest_email"
                        type="email"
                        placeholder="email"
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.guest_email?.message}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3, mt: 1 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Gender
                        </Typography>
                      </FormHelperText>
                      <FormControl size="small" sx={{ width: '100%' }}>
                        <Select
                          {...register('guest_gender', { register: true })}
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="small"
                          name="guest_gender"
                          sx={{ mt: 1, mr: 2, width: '100%' }}
                          displayEmpty
                        >
                          <MenuItem>
                            <InputLabel selected htmlFor="outlined-adornments">
                              Gender
                            </InputLabel>
                          </MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="others">Others</MenuItem>
                        </Select>
                        <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.guest_gender?.message}</Typography>
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
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Company
                        </Typography>
                      </FormHelperText>

                      <TextField
                        {...register('guest_company', { required: true })}
                        fullWidth
                        name="guest_company"
                        id="standard-basic"
                        sx={{ mt: '9px' }}
                        size="small"
                        placeholder="Company Name"
                      />
                      <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.guest_company?.message}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText>
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Employee
                        </Typography>
                      </FormHelperText>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          {...register('emp_person_id', { required: true })}
                          name="emp_person_id"
                          inputProps={{ 'aria-label': 'Without label' }}
                          displayEmpty
                          sx={{ mt: 1, mr: 2, width: '100%' }}
                          size="small"
                        >
                          <MenuItem selected htmlFor="outlined-adornment">
                            <InputLabel>Select Employee Type</InputLabel>
                          </MenuItem>
                          {employeeList.map((employee) => (
                            <MenuItem key={employee.id} value={employee.person_id}>
                              {employee.pname} ({employee.dname})
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.emp_person_id?.message}</Typography>
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
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Purpose
                        </Typography>
                      </FormHelperText>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          name="meeting_purpose_id"
                          sx={{ mt: 1, mr: 2, width: '100%' }}
                          {...register('meeting_purpose_id', { required: true })}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="small"
                        >
                          <MenuItem>
                            <InputLabel selected htmlFor="outlined-adornment">
                              Select Purpose
                            </InputLabel>
                          </MenuItem>
                          {purpose.map((purpo) => (
                            <MenuItem key={purpo.PURPO_ID} sx={{ color: '#a7a7a7' }} value={purpo.PURPO_ID}>
                              {purpo.PURPO_NAME}
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.meeting_purpose_id?.message}</Typography>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText sx={{ mb: 1 }}>
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Time
                        </Typography>
                      </FormHelperText>
                      <Box className="maxWidth">
                        <Controller
                          name="time"
                          control={control}
                          defaultValue={selectedTime}
                          render={({ field }) => (
                            <StyledTimePicker
                              showSecond={false}
                              onChange={(value) => {
                                field.onChange(value);
                                setSelectedTime(value);
                              }}
                              format="h:mm a"
                              use12Hours
                              name="name"
                              defaultValue={defaultTime}
                              style={{
                                width: '100%'
                              }}
                            />
                          )}
                        />
                      </Box>
                      <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.time?.message}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>


                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText sx={{ mt: 1.5 }}>
                        <Typography variant="h6" component="h2" color="#4e4d4e">
                          Meeting Duration
                        </Typography>
                      </FormHelperText>

                      <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
                        <Select
                          {...register('duration', { required: true })}
                          name="duration"
                          // variant="standard"
                          sx={{ mt: 0.8 }}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          size="small"
                          defaultValue=""
                          value={selectTime}
                          onChange={handleChangeTime}
                        >
                          <MenuItem value="" selected>
                            <InputLabel htmlFor="outlined-Location">Select Meeting Duration</InputLabel>
                          </MenuItem>
                          <MenuItem value="15">15 minutes</MenuItem>
                          <MenuItem value="30">30 minutes</MenuItem>
                          <MenuItem value="45">45 minutes</MenuItem>
                          <MenuItem value="60">60 minutes</MenuItem>
                          <MenuItem value="custom minutes"> Add Custom Time</MenuItem>
                        </Select>

                        {selectTime === 'custom minutes' ? (
                          <Box sx={{ mt: 2 }}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography variant="h6" component="h2" color="#4e4d4e">
                                  Slots Duration
                                </Typography>
                                <TextField
                                  name="duration"
                                  placeholder="minutes"
                                  {...register('duration', { required: true })}
                                  sx={{ mt: 1, color: '#4e4d4e', pr: 1 }}
                                  id="standard-basic"
                                  fullWidth
                                  type="text"
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        ) : (
                          <></>
                        )}

                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.duration?.message}</Typography>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ mt: 1, pr: 3 }}>
                    <Box>
                      <FormHelperText sx={{ mt: 1, mb: 1 }}>
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Short Note
                        </Typography>
                      </FormHelperText>
                      <TextField
                        id="standard-basic"
                        minRows={1.4}
                        name="note"
                        multiline
                        placeholder="Enter your text here"
                        style={{ width: '100%' }}
                        {...register('note', { required: false })}
                      />

                      
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container>
                 
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
                    <Box>
                      <FormHelperText sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="h5" component="h5" color="#4e4d4e" fontSize="14px">
                          Additional Visitor No
                        </Typography>
                      </FormHelperText>
                      <FormControl fullWidth>
                        <Select
                          {...register('ex_visitor_no', { required: false })}
                          inputProps={{ 'aria-label': 'Without label' }}
                          value={days}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <InputLabel selected htmlFor="outlined-adornment">
                              Select Extra Visitor
                            </InputLabel>
                          </MenuItem>
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                        <Typography sx={{ color: '#FF0000', fontSize: '12px' }}>{errors.ex_visitor_no?.message}</Typography>
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
                  onClick={handleCancelButton}
                  variant="outlined"
                  size="large"
                  sx={{ mr: 2, color: '#FF0000', borderColor: '#FF0000', '&:hover': { color: '#FF0000', borderColor: '#FF0000' } }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
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
