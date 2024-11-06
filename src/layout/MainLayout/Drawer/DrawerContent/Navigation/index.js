// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useAppContextReception } from 'AppContextReception';
// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { user } = useAppContextReception();

  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  const navGroupsHotel = menuItem.itemsHotel.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  const navGroupsProperty = menuItem.itemsProperty.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <>
      {user.user_type === 'company' ? (
        <Box sx={{ pt: 2 }}>{navGroups}</Box>
      ) : user.user_type === 'hotel' ? (
        <Box sx={{ pt: 2 }}>{navGroupsHotel}</Box>
      ) : user.user_type === 'property' ? (
        <Box sx={{ pt: 2 }}>{navGroupsProperty}</Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navigation;
