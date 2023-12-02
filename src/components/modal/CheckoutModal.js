import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, List, Grid, ListItem, Avatar, Button } from '@mui/material';

import TableChip from 'components/chips/chip';
import CloseButton from 'components/Button/CloseButton';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import ImageModal from './ImageModal';
import user from '../../assets/images/img/user.jpg';
import BelongsTable from 'components/table/BelongsTable';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Checkout(props) {
  const { checkOutModal, handleClose, waitingId } = props;
  const [imageModal, setImageModal] = useState(false);
  const [meetingShow, setMeetingShow] = useState([]);
  const [extraVisitors, setExtraVisitors] = useState([]);
  const { comId } = useAppContextReception();
  const [extraVisitorId, setExtraVisitorsId] = useState([]);
  const [visitorBelongs, setVisitorBelongs] = useState('');
  const navigate = useNavigate();

  const onSubmit = (id, comId) => {
    const data = { meeting_id: id, com_id: comId };
    console.log(data);
    axiosInstance
      .post('https://api.hellokompass.com/reception/visitorcheckout', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose;
          navigate('/meeting');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleVisitor = (id) => {
    setImageModal(true);
    setExtraVisitorsId(id);
  };

  const {
    id,
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
        .get(`https://api.hellokompass.com/reception/meetingview?meeting_id=${waitingId}&com_id=${comId}`)
        .then((res) => {
          setMeetingShow(res.data.data.meeting);
          setExtraVisitors(res.data.data.extravisitors);
          setVisitorBelongs(res.data.data.visitorbelong);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [waitingId]);

  return (
    <Modal
      open={Boolean(checkOutModal)}
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
            Waiting Details
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
            Waiting Overview
          </Typography>
          <Typography align="center" variant="h6" component="h2">
            <Box sx={{ display: 'inline', color: '#12a9b2' }}>Date:</Box>
            <Box sx={{ display: 'inline' }}> {date}</Box> <Box sx={{ display: 'inline', color: '#12a9b2', ml: 1 }}>Time:</Box>
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
            <Grid items xs={12} sm={12} lg={6}>
              <ListItem sx={{ mb: -1 }}>
                <Grid container>
                  <Grid xs={4} sm={2} lg={2}>
                    <Typography variant="p" component="div">
                      Purpose
                    </Typography>
                  </Grid>
                  <Grid xs={1} sm={1} lg={1}>
                    <Typography variant="p" component="div">
                      :
                    </Typography>
                  </Grid>
                  <Grid xs={7} sm={9} lg={9}>
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
                      {purpose}
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
                      Host Name
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
                    <Typography sx={{ color: '#000' }} variant="p" component="div">
                      {host_phone}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>
            <Grid container>
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
            </Grid>
            <Grid xs={12} sm={12}>
              <Typography sx={{ pl: 2, mt: 2, color: '#12a9b2' }} variant="h5" component="div">
                Meeting details :
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
                          variant="square"
                          src={user}
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
              <ImageModal
                imageModal={imageModal}
                name={guest_name}
                phone={guest_phone}
                extraVisitorId={extraVisitorId}
                handleClose={() => setImageModal(false)}
              />
            </Grid>
            {extraVisitors !== null && (
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
                            {visitors.image ? (
                              <>
                                <Avatar
                                  alt="Captured"
                                  src={visitors.image}
                                  variant="square"
                                  sx={{ width: '100px', height: '100px', border: 1, color: '#12A9B2', borderRadius: 1 }}
                                />
                              </>
                            ) : (
                              <>
                                <Avatar
                                  alt="Captured"
                                  src={user}
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
                              </>
                            )}
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
            {visitorBelongs !== null && (
              <>
                <Grid xs={12} sm={12}>
                  <Typography sx={{ pl: 2, mt: 1, color: '#12a9b2' }} variant="h5" component="div">
                    Visitors Belongings :
                  </Typography>
                </Grid>
                <Grid items xs={12} sm={6} sx={{ mt: 2 }}>
                  <ListItem sx={{ mb: -1 }}>
                    <Grid container>
                      <Grid xs={4} sm={4} lg={4}>
                        <Typography variant="p" component="div">
                          Visitors Card
                        </Typography>
                      </Grid>
                      <Grid xs={1} sm={1} lg={1}>
                        <Typography variant="p" component="div">
                          :
                        </Typography>
                      </Grid>
                      <Grid xs={7} sm={7} lg={7}>
                        <Typography sx={{ color: '#000' }} variant="p" component="div">
                          {visitorBelongs.vcard}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem sx={{ mb: -1 }}>
                    <Grid container>
                      <Grid xs={4} sm={4} lg={4}>
                        <Typography variant="p" component="div">
                          In Time
                        </Typography>
                      </Grid>
                      <Grid xs={1} sm={1} lg={1}>
                        <Typography variant="p" component="div">
                          :
                        </Typography>
                      </Grid>
                      <Grid xs={7} sm={7} lg={7}>
                        <Typography sx={{ color: '#000' }} variant="p" component="div">
                          {visitorBelongs.intime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem sx={{ mb: -1 }}>
                    <Grid container>
                      <Grid xs={4} sm={4} lg={4}>
                        <Typography variant="p" component="div">
                          Out Time
                        </Typography>
                      </Grid>
                      <Grid xs={1} sm={1} lg={1}>
                        <Typography variant="p" component="div">
                          :
                        </Typography>
                      </Grid>
                      <Grid xs={7} sm={7} lg={7}>
                        <Typography sx={{ color: '#000' }} variant="p" component="div">
                          {visitorBelongs.outtime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
                <Grid container>
                  <Grid items xs={12} sm={12} sx={{ px: { xs: 1, sm: 0, md: 2 }, mt: 1 }}>
                    <BelongsTable belongs={visitorBelongs.belongs} qty={visitorBelongs.qty} />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>

          <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3, mt: 2 }} />
          <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'end', alignItems: 'center', px: 2 }}>
            <Button
              onClick={() => onSubmit(id, comId)}
              variant="outlined"
              size="large"
              sx={{ mt: 1, mr: 2, p: 0, px: 2, color: '#12A9B2', '&:hover': { backgroundColor: '#0e8087', color: '#FFF' } }}
            >
              Check out
            </Button>
            <CloseButton handleClose={handleClose}>Close</CloseButton>
          </Box>
        </List>
      </Box>
    </Modal>
  );
}
