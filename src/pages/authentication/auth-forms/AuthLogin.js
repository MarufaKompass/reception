import axios from 'axios';
import { React, useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AnimateButton from 'components/@extended/AnimateButton';
import InvisibleEye from 'components/svg/InvisibleEye';
import VisibleEye from 'components/svg/VisibleEye';
import { useForm } from 'react-hook-form';
import { useAppContextReception } from 'AppContextReception';
import { useNavigate } from 'react-router-dom';

const AuthLogin = () => {
  // const [checked, setChecked] = useState(false);
  const { register, handleSubmit } = useForm();
  const { palette } = createTheme();
  const navigate = useNavigate();

  //palette
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      anger: createColor('#1198a0')
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isFetching, setIsFetching] = useState(false);
  const { setUser } = useAppContextReception();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://api.hellokompass.com/reception/login', data);

      if (response.status === 200) {
<<<<<<< HEAD
        sessionStorage.setItem('com', JSON.stringify(response.data.data.com_id));
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        setComId(response.data.date.com_id);
        setUser(response.data.data.token);
=======
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        // sessionStorage.setItem('com', JSON.stringify(response.data.data.com_id));
        setUser(response.data.data.token);
        // setComId(response.data.date.com_id);
>>>>>>> d77f88a5f9c7c408d46ed0dd3add0a3e21977ce2
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="p" component="div" sx={{ mb: 0, mt: 1 }}>
                    Email Address
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    label="email"
                    id="outlined"
                    size="small"
                    placeholder="Enter Email"
                    sx={{ mt: 2 }}
                    {...register('email')}
                  />
                </Grid>
              </Grid>
            </>

            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant="p" component="div" sx={{ mb: 0, mt: 0 }}>
                  Password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="password"
                  id="outlined"
                  placeholder="password"
                  size="small"
                  sx={{ mt: 2 }}
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <InvisibleEye /> : <VisibleEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <AnimateButton>
                <Button fullWidth size="large" type="submit" variant="contained" color="anger">
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </ThemeProvider>
    </>
  );
};

export default AuthLogin;
