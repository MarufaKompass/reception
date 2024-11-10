import React from 'react';
import notfound from '../../assets/images/img/notFoundPage.png';
import { Box, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleButtonBackHome = () => {
    navigate('/');
  };
  return (
    <MainCard>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src={notfound} alt="notFoundPage" width={'45%'} height={'45%'} />
        </Box>
        <Box textAlign="center">
          <Button
            onClick={handleButtonBackHome}
            sx={{
              backgroundColor: '#12a9b2',
              width: '200px',
              height: '40px',
              fontSize: 13,
              color: '#fff',
              marginTop: '20px',
              '&:hover': { backgroundColor: '#129e9e' }
            }}
          >
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </MainCard>
  );
}
