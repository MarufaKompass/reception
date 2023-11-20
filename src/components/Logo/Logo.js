import { Box } from '@mui/material';
import logo from '../../assets/images/img/logo.png';

const Logo = () => {
  return (
    <>
      <Box>
        <img src={logo} alt="logo" width={'140px'}></img>
      </Box>
    </>
  );
};

export default Logo;
