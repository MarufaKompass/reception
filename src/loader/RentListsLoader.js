import React from 'react';
import { Box, Grid, Typography, Skeleton } from '@mui/material';
export default function RentListsLoader() {
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={3}>
        <Box borderBottom={6} borderColor="#f1f1f1" sx={{ boxShadow: 1, p: 2, borderRadius: '16px' }}>
          <Box>
            <Box
              flexShrink={0}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' }
              }}
            >
              <Skeleton variant="rectangular" sx={{ borderRadius: '50%', width: '80px', height: '80px' }} />
            </Box>

            <Box>
              <Box display="flex" gap={2} justifyContent="space-between">
                <Skeleton width="35%" height={25} />

                <Skeleton width="6%" height={25} />
              </Box>
            </Box>

            <Box>
              <Typography variant="">
                <Skeleton width="30%" height={20} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="">
                <Skeleton width="25%" height={20} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box borderBottom={6} borderColor="#f1f1f1" sx={{ boxShadow: 1, p: 2, borderRadius: '16px' }}>
          <Box>
            <Box
              flexShrink={0}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' }
              }}
            >
              <Skeleton variant="rectangular" sx={{ borderRadius: '50%', width: '80px', height: '80px' }} />
            </Box>

            <Box>
              <Box display="flex" gap={2} justifyContent="space-between">
                <Skeleton width="35%" height={25} />

                <Skeleton width="6%" height={25} />
              </Box>
            </Box>

            <Box>
              <Typography variant="">
                <Skeleton width="30%" height={20} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="">
                <Skeleton width="25%" height={20} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box borderBottom={6} borderColor="#f1f1f1" sx={{ boxShadow: 1, p: 2, borderRadius: '16px' }}>
          <Box>
            <Box
              flexShrink={0}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' }
              }}
            >
              <Skeleton variant="rectangular" sx={{ borderRadius: '50%', width: '80px', height: '80px' }} />
            </Box>

            <Box>
              <Box display="flex" gap={2} justifyContent="space-between">
                <Skeleton width="35%" height={25} />

                <Skeleton width="6%" height={25} />
              </Box>
            </Box>

            <Box>
              <Typography variant="">
                <Skeleton width="30%" height={20} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="">
                <Skeleton width="25%" height={20} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3}>
        <Box borderBottom={6} borderColor="#f1f1f1" sx={{ boxShadow: 1, p: 2, borderRadius: '16px' }}>
          <Box>
            <Box
              flexShrink={0}
              sx={{
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' }
              }}
            >
              <Skeleton variant="rectangular" sx={{ borderRadius: '50%', width: '80px', height: '80px' }} />
            </Box>

            <Box>
              <Box display="flex" gap={2} justifyContent="space-between">
                <Skeleton width="35%" height={25} />

                <Skeleton width="6%" height={25} />
              </Box>
            </Box>

            <Box>
              <Typography variant="">
                <Skeleton width="30%" height={20} />
              </Typography>
            </Box>
            <Box>
              <Typography variant="">
                <Skeleton width="25%" height={20} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
