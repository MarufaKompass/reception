import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, Avatar, List, ListItem, Grid } from '@mui/material';
import axiosInstance from 'utils/axios.config';
import { useAppContextReception } from 'AppContextReception';
import CloseButton from 'components/Button/CloseButton';
import TableChip from 'components/chips/TableChip';
import BelongsTable from 'components/table/BelongsTable';
import Uppercase from 'components/Uppercase/Uppercase';

export default function MeetingModal(props) {
  const { selectedMeetingId, showMeetingModal, handleClose } = props;
  const { comId } = useAppContextReception();
  const [meetingShow, setMeetingShow] = useState([]);
  const [extraVisitors, setExtraVisitors] = useState([]);
  const [visitorBelongs, setVisitorBelongs] = useState('');
  const [cancelNote, setCancelNote] = useState('');

  const {
    code,
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
          setMeetingShow(res.data.data.meeting);
          setExtraVisitors(res.data.data.extravisitors);
          setVisitorBelongs(res.data.data.visitorbelong);
          setCancelNote(res.data.data.cancelnote);
        })
        .catch(() => <></>);
    };
    fetchData();
  }, [comId, selectedMeetingId]);

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
          height: { xs: '630px', sm: 'auto' },
          overflow: 'auto',
          maxHeight: { xs: 500, sm: 500, md: 500, lg: 500, xl: 600 },
          display: 'block'
        }}
      >
        <Box id="modal-modal-title" sx={{ px: 2, py: 1, color: '#7e8790' }}>
          <Typography variant="h4" component="h2" sx={{ color: 'black' }}>
            Meeting Details
          </Typography>
        </Box>
        <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
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
            <Box sx={{ display: 'inline' }}> {date}</Box>
            <Box sx={{ display: 'inline', color: '#12a9b2', ml: 0.5 }}> Time:</Box>
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
                      {purpose}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items xs={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={4}>
                    <Typography variant="p" component="div">
                      Meeting Code
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={7}>
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
                      {code}
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
                      {host_name}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items xs={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={4}>
                    <Typography variant="p" component="div">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={7}>
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
                      {host_phone}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid items xs={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={4}>
                    <Typography variant="p" component="div">
                      Status
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={7}>
                    <TableChip>{status}</TableChip>
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
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
                    <Avatar
                      alt="Captured"
                      src={guest_image}
                      variant="square"
                      sx={{ width: '130px', height: '130px', border: 1, color: '#12A9B2', borderRadius: 1 }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            {ex_visitor_no > 0 && (
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
                {extraVisitors?.map((visitors) => (
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
                            <Typography sx={{ color: '#000' }} variant="p" component="div">
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
                            <Typography sx={{ color: '#000' }} variant="p" component="div">
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
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>
                  </>
                ))}
              </>
            )}
            {visitorBelongs && visitorBelongs?.belongs !== '' && (
              <>
                <Grid xs={12} sm={12}>
                  <Typography sx={{ pl: 2, mt: 1, color: '#12a9b2' }} variant="h5" component="div">
                    Visitors Belongings :
                  </Typography>
                </Grid>
                <Grid items xs={12} sm={12} sx={{ mt: 2 }}>
                  <Grid container>
                    <Grid item xs={6} sm={6} lg={4}>
                      <ListItem sx={{ mb: -1 }}>
                        <Grid container>
                          <Grid xs={7} sm={7} lg={7}>
                            <Typography variant="p" component="div" fontSize="13px">
                              Visitors Card
                            </Typography>
                          </Grid>
                          <Grid xs={1} sm={1} lg={1}>
                            <Typography variant="p" component="div">
                              :
                            </Typography>
                          </Grid>
                          <Grid xs={4} sm={4} lg={4}>
                            <Typography sx={{ color: '#000' }} variant="p" component="div" fontSize="13px">
                              {visitorBelongs.vcard}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>

                    <Grid item xs={4}>
                      <ListItem sx={{ mb: -1 }}>
                        <Grid container>
                          <Grid xs={6} sm={6} lg={6}>
                            <Typography variant="p" component="div" fontSize="13px">
                              In Time
                            </Typography>
                          </Grid>
                          <Grid xs={1} sm={1} lg={1}>
                            <Typography variant="p" component="div">
                              :
                            </Typography>
                          </Grid>
                          <Grid xs={5} sm={5} lg={5}>
                            <Typography sx={{ color: '#000' }} variant="p" component="div" fontSize="13px">
                              {visitorBelongs.intime}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>

                    <Grid item xs={4}>
                      <ListItem sx={{ mb: -1 }}>
                        <Grid container>
                          <Grid xs={6} sm={6} lg={6}>
                            <Typography variant="p" component="div" fontSize="13px">
                              Out Time
                            </Typography>
                          </Grid>
                          <Grid xs={1} sm={1} lg={1}>
                            <Typography variant="p" component="div">
                              :
                            </Typography>
                          </Grid>
                          <Grid xs={5} sm={5} lg={5}>
                            <Typography sx={{ color: '#000' }} variant="p" component="div" fontSize="13px">
                              {visitorBelongs.outtime}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid items xs={12} sm={12} sx={{ px: { xs: 1, sm: 0, md: 2 }, mt: 1 }}>
                    <BelongsTable belongs={visitorBelongs.belongs} qty={visitorBelongs.qty} />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          {Uppercase(status) === 'Cancel' && (
            <>
              <Grid sx={{ pb: 3 }} container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    width: '100%'
                  }}
                >
                  <List>
                    <Typography sx={{ pl: 2, mt: 1, color: '#FF0000' }} variant="h5" component="div">
                      Cancel Note :
                    </Typography>
                    <ListItem sx={{ mb: -1 }}>
                      <Grid container>
                        <Grid xs={4} sm={2} lg={2}>
                          <Typography sx={{ color: '#FF0000' }} variant="h6" component="div">
                            Text
                          </Typography>
                        </Grid>
                        <Grid xs={1} sm={1} lg={1}>
                          <Typography sx={{ color: '#FF0000' }} variant="h6" component="div">
                            :
                          </Typography>
                        </Grid>
                        <Grid xs={7} sm={9} lg={9}>
                          <Typography sx={{ color: '#FF0000' }} variant="h6" component="div">
                            {cancelNote.note}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </>
          )}
        </List>
        <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3, mt: 2 }} />
        <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center', px: 2, my: 1 }}>
          <Typography variant="h5" color="#ff0000">
            To close this screen press
          </Typography>
          <CloseButton handleClose={handleClose}>Close</CloseButton>
        </Box>
      </Box>
    </Modal>
  );
}
