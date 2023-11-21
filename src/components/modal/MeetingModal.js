import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, Avatar, Button, List, ListItem, Grid } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';

import user from '../../assets/images/img/user.jpg';
import ImageModal from './ImageModal';

export default function MeetingModal(props) {
  const { selectedMeetingId, showMeetingModal, handleClose } = props;
  const [imageModal, setImageModal] = useState(false);
  const { comId } = useAppContextReception();
  const [meetingShow, setMeetingShow] = useState([]);
  const [extraVisitors, setExtraVisitors] = useState([]);
  const [extraVisitorId, setExtraVisitorsId] = useState([]);
  console.log(extraVisitors);

  const handleVisitor = (id) => {
    setImageModal(true);
    setExtraVisitorsId(id);
  };

  const {
    purpose,
    status,
    host_name,
    host_phone,
    guest_name,
    guest_phone,
    guest_email,
    guest_company,
    date,
    time,
    guest_image,
    ex_visitor_no
  } = meetingShow;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/meetingview?meeting_id=${selectedMeetingId}&com_id=${comId}`)
        .then((res) => {
          setMeetingShow(res.data.data.meeting), setExtraVisitors(res.data.data.extravisitors);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [selectedMeetingId]);

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
          <Typography variant="h4" component="h2">
            Meeting Details
          </Typography>
          <Typography onClick={handleClose} sx={{ cursor: 'pointer' }} variant="h4" component="h2">
            Close
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box
          sx={{
            pb: 1,
            width: '100%',
            mt: 2,
            ml: {
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0
            }
          }}
        >
          <Typography align="center" variant="h6" component="h2">
            Meeting Overview
          </Typography>
          <Typography align="center" variant="h6" component="h2">
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
            <Box sx={{ display: 'inline' }}> {date}</Box> <Box sx={{ display: 'inline', color: '#12a9b2' }}>Time:</Box>
            <Box sx={{ display: 'inline' }}> {time}</Box>
          </Typography>
        </Box>
        <List sx={{ p: 1 }}>
          <Grid container>
            <Grid items xs={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={4}>
                    <Typography variant="p" component="p">
                      Purpose
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      {purpose}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items xs={12} sm={12} lg={6}>
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
                      {status}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container>
            <Grid items xs={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={4}>
                    <Typography variant="p" component="div">
                      Employee Name
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={7}>
                    <Typography sx={{ color: '#a2a2a2' }} variant="p" component="div">
                      {host_name}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items xs={12} sm={12} lg={6}>
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
                      {host_phone}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid xs={12} sm={12}>
              <Typography sx={{ pl: 2, mt: 2, color: '#12a9b2' }} variant="h5" component="div">
                Meeting with :
              </Typography>
            </Grid>
            <Grid xs={12} sm={12}>
              <Typography sx={{ pl: 2, mt: 1, color: '#12a9b2' }} variant="h5" component="div">
                Guest Info
              </Typography>
            </Grid>
            <Grid items xs={12} sm={6}>
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
                      {guest_name}
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
                      {guest_phone}
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
                      {guest_email}
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
                      {guest_company}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items xs={12} sm={6}>
              <ListItem>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    {guest_image ? (
                      <Avatar
                        alt="Captured"
                        src={guest_image}
                        variant="square"
                        sx={{ width: '130px', height: '130px', border: 1, color: '#12A9B2', borderRadius: 1 }}
                      />
                    ) : (
                      <>
                        <Avatar
                          alt="Captured"
                          src={user}
                          variant="square"
                          sx={{ width: '130px', height: '130px', border: 1, color: '#12A9B2', borderRadius: 1 }}
                        />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                          <Button onClick={() => setImageModal(true)} variant="outlined" size="small" sx={{ my: 2, color: '#12A9B2' }}>
                            Take Photo
                          </Button>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
              <ImageModal imageModal={imageModal} handleClose={() => setImageModal(false)} />
            </Grid>
            {ex_visitor_no && (
              <>
                <Grid xs={12} sm={12}>
                  <Typography sx={{ pl: 2, mt: 1, color: '#12a9b2' }} variant="h5" component="div">
                    Additional Visitor Details :
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12}>
                  <Typography sx={{ pl: 2, mt: 1, color: '#12a9b2' }} variant="h5" component="div">
                    Total Visitors : {ex_visitor_no}
                  </Typography>
                </Grid>
                {extraVisitors.map((visitors) => (
                  <>
                    <Grid items xs={12} sm={6}>
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
                              {visitors.name}
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
                              {visitors.phone}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>
                    <Grid items xs={12} sm={6}>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={6}>
                            <Avatar
                              alt="Captured"
                              src={visitors.image}
                              variant="square"
                              sx={{ width: '100px', height: '100px', border: 1, color: '#12A9B2', borderRadius: 1 }}
                            />

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                              <Button
                                onClick={() => handleVisitor(visitors.id)}
                                variant="outlined"
                                size="small"
                                sx={{ my: 2, color: '#12A9B2' }}
                              >
                                Update
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>
                    <ImageModal
                      imageModal={imageModal}
                      name={visitors.name}
                      phone={visitors.phone}
                      vcard={visitors.vcard}
                      extraVisitorId={extraVisitorId}
                      handleClose={() => setImageModal(false)}
                    />
                  </>
                ))}
              </>
            )}
          </Grid>
        </List>
      </Box>
    </Modal>
  );
}
