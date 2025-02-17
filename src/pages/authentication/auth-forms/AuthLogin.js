import axios from 'axios';
import { React, useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AnimateButton from 'components/@extended/AnimateButton';
import InvisibleEye from 'components/svg/InvisibleEye';
import VisibleEye from 'components/svg/VisibleEye';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppContextReception } from 'AppContextReception';
const AuthLogin = () => {
  // const [checked, setChecked] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { palette } = createTheme();
  const navigate = useNavigate();
  const { setUser, setComId, setToken } = useAppContextReception();

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
        sessionStorage.setItem('com', JSON.stringify(response.data.data.com_id));
        sessionStorage.setItem('user', JSON.stringify(response.data.data));
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        setUser(response.data.data);
        setToken(response.data.data.token);
        setComId(response.data.data.com_id);
        navigate('/');
        reset();
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
