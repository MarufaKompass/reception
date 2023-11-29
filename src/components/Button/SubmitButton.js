import React from 'react';
import { Button } from '@mui/material';

export default function SubmitButton({ children }) {
  return (
    <Button
      variant="outlined"
      type="submit"
      size="medium"
      sx={{ mt: 1.2, mx: 2, p: 0, borderColor: '#12A9B2', color: '#12A9B2', '&:hover': { borderColor: '#0e8087', color: '#0e8087' } }}
    >
      {children}
    </Button>
  );
}
