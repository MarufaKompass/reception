import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Grid, Button, Avatar, Modal, Box, Typography, Divider, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import axiosInstance from 'utils/axios.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseButton from 'components/Button/CloseButton';
import SubmitButton from 'components/Button/SubmitButton';

const videoConstraints = {
  width: 150,
  height: 150,
  facingMode: 'user'
};

export default function ImageModal(props) {
  const { imageModal, handleClose, extraVisitorId, name, phone, vcard } = props;

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.extra_visitor_id = extraVisitorId;
    data.extra_visitor_image = uploadedPhoto;
    console.log(data);
    axiosInstance
      .put('https://api.hellokompass.com/reception/visitorupdate', data)
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          reset();
        } else if (res.data.code === 400) {
          toast.failed(res.data.message);
          reset();
        } else {
          // Handle other cases if needed
        }
      })
      .catch((err) => console.error(err));
  };

  const onUserMedia = (e) => {
    console.log(e);
  };

  const webcamRef = useRef(null);
  //For The First Person Image

  const [photo, setPhoto] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState('');

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

  const capture = () => {
    return new Promise((resolve, reject) => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = dataURItoBlob(imageSrc);
      if (blob !== null) {
        setPhoto(blob);
        resolve(blob);
      } else {
        reject('Error capturing the image.');
      }
    });
  };

  const submitImage = async () => {
    try {
      const capturedPhoto = await capture(); // Capture the image

      const requestData = new FormData();
      requestData.append('module_name', 'visitorimage');
      requestData.append('file', capturedPhoto, 'captured_image.png');
      console.log(capturedPhoto);
      const response = await axiosInstance.post('https://api.hellokompass.com/upload/image', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedPhoto(response.data.data.files.file.image);
    } catch (error) {
      console.error('Error capturing or uploading the image:', error);
    }
  };
  return (
    <Modal open={Boolean(imageModal)} onClose={handleClose} aria-labelledby="guest-modal-title" aria-describedby="guest-modal-description">
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
          p: 2,
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
          <Typography variant="h4" component="h2" sx={{ color: 'black' }}>
            Update
          </Typography>
        </Box>
        <Divider sx={{ color: '#12A9B2', border: 1, opacity: 0.3 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ px: 2 }}>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
                Name
              </Typography>
              <TextField
                {...register('extra_visitor_name', { required: false })}
                id="outlined-basic"
                name="extra_visitor_name"
                size="large"
                variant="outlined"
                type="text"
                defaultValue={name}
                placeholder="Your Name"
                sx={{ width: '100%' }}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
                Phone
              </Typography>
              <TextField
                {...register('extra_visitor_phone', { required: false })}
                id="outlined-basic"
                name="extra_visitor_phone"
                size="large"
                type="number"
                variant="outlined"
                defaultValue={phone}
                placeholder="Your Phone"
                sx={{ width: '100%' }}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="p" sx={{ my: 2, fontSize: 17 }}>
                Visitor Card
              </Typography>
              <TextField
                {...register('extra_visitor_card', { required: false })}
                id="outlined-basic"
                name="extra_visitor_card"
                size="large"
                variant="outlined"
                defaultValue={vcard}
                placeholder="Your Name"
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }} alignItems="center">
              <Box sx={{ m: 5 }}>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                  onUserMedia={onUserMedia}
                  mirrored={true}
                />

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pr: 3 }}>
                  <Button onClick={() => submitImage(photo)} variant="outlined" size="small" sx={{ my: 2, color: '#12A9B2' }}>
                    Take Photo
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ pr: 3 }}>
              <Box sx={{ m: 5 }}>
                {photo && (
                  <Avatar alt="Captured" src={URL.createObjectURL(photo)} variant="square" sx={{ width: '150px', height: '150px' }} />
                )}
              </Box>
            </Grid>
            <Divider variant="middle" />
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%', px: 5 }}>
              <SubmitButton>Submit</SubmitButton>
              <CloseButton handleClose={handleClose}>Cancel</CloseButton>
            </Box>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
