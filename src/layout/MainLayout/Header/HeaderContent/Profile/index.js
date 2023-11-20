import {  Box, ButtonBase, Stack, Typography } from '@mui/material';

// import avatar1 from 'assets/images/users/avatar-1.png';

const Profile = () => {
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          {/* <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} /> */}
          <Typography variant="subtitle1">Logout</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default Profile;
