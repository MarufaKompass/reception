import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, List, ListItem, Grid } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';

export default function MeetingModal(props) {
  const { selectedMeetingId, showMeetingModal, handleClose } = props;
  const { comId } = useAppContextReception();
  const [meetingShow, setMeetingShow] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/meetingview?meeting_id=${selectedMeetingId}&com_id=${comId}`)
        .then((res) => setMeetingShow(res))
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [selectedMeetingId]);

  console.log(meetingShow);

  return (
    <Modal
      open={Boolean(showMeetingModal)}
      onClose={handleClose}
      aria-labelledby="guest-modal-title"
      aria-describedby="guest-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '95%',
            sm: 700,
            md: 800,
            lg: 800,
            xl: 800
          },
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 24,
          overflow: { xs: 'scroll', sm: 'scroll', md: 'scroll', lg: 'scroll', xl: 'scroll' },
          height: '100%',
          maxHeight: { xs: 500, sm: 500, md: 500, lg: 500, xl: 600 },
          display: 'block'
        }}
      >
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', px: 3, py: 1, color: '#7e8790' }}>
          <Typography variant="p" component="h2">
            Meeting Details
          </Typography>
          <Typography onClick={handleClose} sx={{ cursor: 'pointer' }} variant="p" component="h2">
            Close
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box
          sx={{
            pb: 1,
            width: '100%',
            ml: {
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0
            }
          }}
        >
          <Typography align="center" variant="h4" component="h2">
            Meeting Overview
          </Typography>
          <Typography align="center" variant="p" component="h2">
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
            <Box sx={{ display: 'inline' }}> Nov 20, 2023</Box> <Box sx={{ display: 'inline', color: '#12a9b2' }}>Time:</Box>
            <Box sx={{ display: 'inline' }}> 06:29 AM</Box>
          </Typography>
        </Box>
        <List sx={{ p: 1 }}>
          <Grid container>
            <Grid items sx={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={4} lg={4}>
                    <Typography variant="p" component="p">
                      Purpose
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={7} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      Daily Scurm
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items sx={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={2}>
                    <Typography variant="p" component="div">
                      Status
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={9}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      Cancel
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container>
            <Grid items sx={12} sm={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={4} lg={4}>
                    <Typography variant="p" component="div">
                      Employee Name
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={7} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      Navid Rahman (App Developer)
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items sx={12} sm={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={2}>
                    <Typography variant="p" component="div">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={9}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      8801828080005
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid sx={12} sm={12}>
              <Typography sx={{ pl: 2, mt: 2, color: '#12a9b2' }} variant="h5" component="div">
                Meeting with :
              </Typography>
            </Grid>
            <Grid sx={12} sm={12}>
              <Typography sx={{ pl: 2, mt: 1, color: '#12a9b2' }} variant="h5" component="div">
                Guest Info
              </Typography>
            </Grid>
            <Grid items sx={12} sm={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={4} lg={4}>
                    <Typography variant="p" component="div">
                      Name
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={7} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      Sayed Ehsan
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={4} lg={4}>
                    <Typography variant="p" component="div">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={7} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      8801515682069
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={4} lg={4}>
                    <Typography variant="p" component="div">
                      Email
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={7} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      ehsan@hellokompass.com
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={4} lg={4}>
                    <Typography variant="p" component="div">
                      Company
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={7} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      KOMPASS TECHNOLOGIES LIMIITED
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items sx={12} sm={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={2}>
                    <Typography variant="p" component="div">
                      Phone
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </Box>
    </Modal>
  );
}
