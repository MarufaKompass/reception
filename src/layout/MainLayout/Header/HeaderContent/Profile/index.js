import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import Logout from 'components/svg/Logout';
import { useNavigate } from 'react-router-dom';

// import avatar1 from 'assets/images/users/avatar-1.png';

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('com');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase onClick={handleLogout}>
        <Box sx={{ borderRadius: '30px', py: '3px', px: '10px', background: '#11A2AB', color: '#fff' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
            <Box
              sx={{
                py: '3px',
                px: '6px',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto',
                background: '#0f8389'
              }}
            >
              <Logout></Logout>
            </Box>
            <Typography variant="subtitle1" sx={{ p: 0 }}>
              Logout
            </Typography>
          </Stack>
        </Box>
      </ButtonBase>
    </Box>
  );
};

export default Profile;
