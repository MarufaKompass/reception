import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

export default function Home() {
  return (
    <Box>
      <Box sx={{ align: { xs: 'center', sm: 'start' } }}>
        <Box variant="p" sx={{ fontSize: 30 }}>
          <Typography sx={{ color: '#12A9B2', fontSize: 30 }} variant="p">
            Welcome
          </Typography>{' '}
          <Typography variant="p" sx={{ fontSize: 30 }}>
            To
          </Typography>{' '}
          <Typography sx={{ color: '#12A9B2', fontSize: 30 }} variant="p">
            KOMPASS
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'block' }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                my: 1,
                color: '#12A9B2',
                border: 1,
                borderColor: '#12A9B2',
                fontSize: 20,
                '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
              }}
              startIcon={<GridViewOutlinedIcon />}
            >
              <Typography variant="p">Enter Meeting Code</Typography>
            </Button>
          </Box>

          <Box sx={{ display: 'block' }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                my: 1,
                color: '#12A9B2',
                border: 1,
                borderColor: '#12A9B2',
                fontSize: 20,
                '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
              }}
              startIcon={<GridViewOutlinedIcon />}
            >
              <Typography variant="p">Instant Meeting </Typography>
            </Button>
          </Box>

          <Box sx={{ display: 'block' }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                my: 1,
                color: '#12A9B2',
                border: 1,
                borderColor: '#12A9B2',
                fontSize: 20,
                '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
              }}
              startIcon={<GridViewOutlinedIcon />}
            >
              <Typography variant="p">Courier </Typography>
            </Button>
          </Box>

          <Box sx={{ display: 'block' }}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                my: 1,
                color: '#12A9B2',
                border: 1,
                borderColor: '#12A9B2',
                fontSize: 20,
                '&:hover': { color: '#fff', backgroundColor: '#12A9B2' }
              }}
              startIcon={<GridViewOutlinedIcon />}
            >
              <Typography variant="p">Event </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
