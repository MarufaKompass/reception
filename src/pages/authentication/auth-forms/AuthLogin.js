import { React, useState } from 'react';
// material-ui
import { Button, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';

// third party
import * as yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <>
      <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
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

            {/* <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                />
              </Stack>
            </Grid> */}

            <Grid item xs={12} sx={{ mt:2 }}>
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
