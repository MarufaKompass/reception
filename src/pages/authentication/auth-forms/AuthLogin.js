import axios from 'axios';
import { React, useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AnimateButton from 'components/@extended/AnimateButton';
import InvisibleEye from 'components/svg/InvisibleEye';
import VisibleEye from 'components/svg/VisibleEye';
import { useForm } from 'react-hook-form';
const AuthLogin = () => {
  // const [checked, setChecked] = useState(false);
  const { register, handleSubmit } = useForm();
  const { palette } = createTheme();
  //palette
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      anger: createColor('#1198a0')
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  // const [isFetching, setIsFetching] = useState(false); // State to track the fetch status
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('https://api.hellokompass.com/user/login', data);

      if (response.data.code === 200) {
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        setUser(response.data.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); // Reset the submission flag after the request is complete
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
                    Phone Number
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="phone"
                    label="Phone"
                    id="outlined"
                    size="small"
                    placeholder="Phone number"
                    sx={{ mt: 2 }}
                    {...register('phone')}
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
