import React from 'react';
import { Button } from '@mui/material';

export default function CloseButton({ children, handleClose }) {
  return (
    <Button
      onClick={handleClose}
      variant="contained"
      size="large"
      sx={{ mt: 1, p: 0, backgroundColor: '#12A9B2', '&:hover': { backgroundColor: '#0e8087' } }}
    >
      {children}
    </Button>
  );
}
