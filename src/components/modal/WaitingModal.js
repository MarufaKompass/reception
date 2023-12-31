import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, List, Grid, ListItem, Avatar, Button, OutlinedInput } from '@mui/material';
import TableChip from 'components/chips/TableChip';
import CloseButton from 'components/Button/CloseButton';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import ImageModal from './ImageModal';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { quantity } from 'components/validation/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import SubmitButton from 'components/Button/SubmitButton';
export default function WaitingModal(props) {
  const { waitingModal, handleClose, handleOpen, waitingId } = props;
  const [imageModal, setImageModal] = useState(false);
  const [meetingShow, setMeetingShow] = useState([]);
  const [extraVisitors, setExtraVisitors] = useState([]);
  const { comId } = useAppContextReception();
  const [extraVisitorId, setExtraVisitorsId] = useState('');
  const [cancelNote, setCancelNote] = useState('');

  const handleVisitor = (visitor) => {
    setImageModal(true);
    setExtraVisitorsId(visitor);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fields: [{ belongs: '', qty: '' }],
      resolver: yupResolver(quantity)
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  });

  const onSubmit = (data) => {
    const belongs = data.fields.map((field) => field.belongs);
    const qty = data.fields.map((field) => field.qty);

    const newData = {
      ...data,
      belongs,
      qty
    };
    delete newData.fields;

    axiosInstance.post('https://api.hellokompass.com/reception/visitorcheckin', newData).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        handleClose();
        reset();
      } else if (res.data.code === 400) {
        toast.error(res.data.message);
        handleClose();
        reset();
      } else {
        <></>;
      }
    });
  };

  const addFields = () => {
    append({ belongs: '', qty: '' });
  };

  const removeFields = (index) => {
    remove(index);
  };

  const capitalizeFirstLetter = (string) => {
    const capitalizedStatus =
      string && typeof string === 'string' && string.length > 0 ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    return capitalizedStatus;
  };

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
        .get(`https://api.hellokompass.com/reception/meetingview?meeting_id=${waitingId}&com_id=${comId}`)
        .then((res) => {
          console.log(res.data);
          setMeetingShow(res.data.data.meeting);
          setExtraVisitors(res.data.data.extravisitors);
          setCancelNote(res.data.data.cancelnote);
        })
        .catch(() => <></>);
    };
    fetchData();
  }, [waitingId, comId]);

  return (
    <Modal
      open={Boolean(waitingModal)}
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      <Avatar
                        alt="Captured"
                        variant="square"
                        src={guest_image}
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

                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                                <Button
                                  onClick={() => handleVisitor(visitors)}
                                  variant="outlined"
                                  size="small"
                                  sx={{ my: 2, color: '#12A9B2' }}
                                >
                                  Update
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <ImageModal
                            imageModal={imageModal}
                            name={extraVisitorId.name}
                            phone={extraVisitorId.phone}
                            vcard={extraVisitorId.vcard}
                            extraVisitorId={extraVisitorId.id}
                            handleOpen={handleOpen}
                            handleClose={() => setImageModal(false)}
                          />
                        </ListItem>
                      </Grid>
                    </>
                  ))}
                </>
              )}
              <Grid xs={12} sm={12}>
                <Typography sx={{ pl: 2, mt: 2, color: '#12a9b2' }} variant="h5" component="div">
                  Assign Visitor Card
                </Typography>
              </Grid>

              <Grid container>
                <Grid item xs={12} sm={12} sx={{ mx: 2 }}>
                  <Grid xs={12} sm={8}>
                    <OutlinedInput
                      {...register('vcard', { required: false })}
                      name="vcard"
                      placeholder="visitor's card no"
                      sx={{ border: 1, borderColor: '#12A9B2', width: '100%', mt: 1 }}
                      size="small"
                    />
                    <OutlinedInput
                      {...register('com_id', { required: false })}
                      name="com_id"
                      placeholder="visitor's card no"
                      sx={{ display: 'none' }}
                      value={comId}
                      size="small"
                    />
                    <OutlinedInput
                      {...register('meeting_id', { required: false })}
                      name="vcard"
                      sx={{ display: 'none' }}
                      value={waitingId}
                      size="small"
                    />
                  </Grid>
                  <Grid container>
                    <Grid xs={12} sm={9}>
                      {fields.map((field, index) => (
                        <Box key={field.id}>
                          <Grid container spacing={1} sx={{ mt: 2 }}>
                            <Grid xs={12} sm={5} lg={5} sx={{ p: 0, pr: { xs: 0, sm: 1 } }}>
                              <Grid container>
                                <Grid xs={4} sm={2} lg={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="p" component="div" fontSize="12px">
                                    Name
                                  </Typography>
                                </Grid>
                                <Grid xs={1} sm={1} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="p" component="div">
                                    :
                                  </Typography>
                                </Grid>
                                <Grid xs={7} sm={8} lg={9}>
                                  <OutlinedInput
                                    {...control.register(`fields.${index}.belongs`)}
                                    type="text"
                                    placeholder={`Devices ${index + 1}`}
                                    sx={{ border: 1, borderColor: '#12A9B2', width: '100%', mt: 1 }}
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid xs={12} sm={5} lg={5} sx={{ ml: '10px', p: 0 }}>
                              <Grid container>
                                <Grid xs={4} sm={2} lg={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                  <Typography variant="p" component="div" fontSize="12px">
                                    Quantity
                                  </Typography>
                                </Grid>
                                <Grid xs={1} sm={1} lg={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="p" component="div" sx={{ ml: '4px' }}>
                                    :
                                  </Typography>
                                </Grid>
                                <Grid xs={7} sm={9} lg={9}>
                                  <OutlinedInput
                                    {...control.register(`fields.${index}.qty`)}
                                    placeholder={`Qty ${index + 1}`}
                                    type="number"
                                    sx={{ border: 1, borderColor: '#12A9B2', width: '100%', mt: 1 }}
                                    size="small"
                                  />
                                  <Typography sx={{ color: '#FF0000', fontSize: '13px', mb: 1 }}>{errors.qty?.message}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid xs={1} sm={1} lg={1} sx={{ mt: 1.2 }}>
                              <Box
                                onClick={() => removeFields(index)}
                                sx={{
                                  backgroundColor: '#FF0000',
                                  '&:hover': { backgroundColor: '#CC0000' },
                                  width: '24px',
                                  height: '24px',
                                  mt: '4px',
                                  ml: '46px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '10%'
                                }}
                              >
                                <Typography
                                  sx={{
                                    backgroundColor: '#fff',
                                    width: '12px',
                                    height: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    color: '#FF0000'
                                  }}
                                >
                                  -
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Grid>

                    <Grid xs={12} sm={3}>
                      <Button
                        type="button"
                        onClick={addFields}
                        variant="contained"
                        size="large"
                        sx={{
                          mt: '28px',
                          ml: 1,
                          p: 0,
                          fontSize: '14px',
                          backgroundColor: '#12A9B2',
                          '&:hover': { backgroundColor: '#0e8087' }
                        }}
                        // startIcon={<AddIcon sx={{ mr: -1 }} />}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {capitalizeFirstLetter(status) === 'Cancel' && (
                <>
                  <Divider sx={{ borderTop: 2, borderTopStyle: 'dashed', borderTopColor: '#a2a2a2' }} />
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
            </Grid>
            <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3, mt: 2 }} />
            <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'end', alignItems: 'center', px: 2 }}>
              <SubmitButton>Check In</SubmitButton>
              <CloseButton handleClose={handleClose}>Close</CloseButton>
            </Box>
          </form>
        </List>
        <ImageModal
          imageModal={imageModal}
          name={extraVisitorId.name}
          phone={extraVisitorId.phone}
          vcard={extraVisitorId.vcard}
          extraVisitorId={extraVisitorId.id}
          handleOpen={handleOpen}
          handleClose={() => setImageModal(false)}
        />
      </Box>
    </Modal>
  );
}
