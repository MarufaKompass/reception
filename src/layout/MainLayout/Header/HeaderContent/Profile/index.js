import { Box, Button, Stack, Typography } from '@mui/material';
import { useAppContextReception } from 'AppContextReception';
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
  const { user } = useAppContextReception();

  return (
    <Box sx={{ ml: 0.75 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', itemsCenter: 'center', height: '100%', gap: 1 }}>
        <Box>
          <Typography
            variant="p"
            sx={{ pt: 2, display: 'flex', itemsCenter: 'center', height: '100%', fontSize: '13px', font: 'poppins', fontWeight: 'bold' }}
          >
            {user.com_name}
          </Typography>
        </Box>
        <Button onClick={handleLogout}>
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
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
