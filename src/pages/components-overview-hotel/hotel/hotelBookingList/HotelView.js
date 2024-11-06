import React, { useEffect, useState } from 'react';
import { useAppContextReception } from 'AppContextReception';
import axiosInstance from 'utils/axios.config';
import MainCard from 'components/MainCard';
import { Box, Typography, Grid } from '@mui/material';

export default function HotelView() {
  const [hotelView, setHotelView] = useState('');
  const { comId, hotelViewId } = useAppContextReception();

  const {
    status,
    number_adults,
    number_childs,
    first_name,
    last_name,
    phone,
    email,
    nationality,
    nid_no,
    profession,
    job_location,
    father_name,
    pre_address,
    per_address,
    package_name,
    package_price,
    package_facility,
    date_from,
    date_to,
    number_guest,
    room,
    pay_status,
    code,
    nid_image_front,
    nid_image_back,
    adults,
    childrens
  } = hotelView;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`https://api.hellokompass.com/reception/showbooking?booking_id=${hotelViewId}&company_id=${comId}`)
        .then((res) => {
          setHotelView(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [comId, hotelViewId]);

  return (
    <MainCard>
      <Box>
        <Box>
          <Typography variant="h3">Booking Information </Typography>
        </Box>
        <Box sx={{ mt: '30px' }}>
          <Box
            sx={{
              width: '110px',
              height: '40px',
              backgroundColor: '#12a9b2',
              padding: '16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>{status}</Typography>
          </Box>
        </Box>

        <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>Guest Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>First name </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{first_name}</Typography>
                </Typography>
              </Box>

              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Phone </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{phone}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Profession </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{profession}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Nid No </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{nid_no}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Father/Spouse Name </Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Typography> {father_name}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Present address</Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Typography>{pre_address}</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Last name </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{last_name}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Email </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{email}</Typography>
                </Typography>
              </Box>

              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Job Location </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{job_location}</Typography>
                </Typography>
              </Box>

              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Nationality </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{nationality}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Permanent address</Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Typography>{per_address}</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>NID Front Side</Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Box>
                    <img src={nid_image_front} alt="No_Available_Image" style={{ width: '250px', height: '120px' }}></img>
                  </Box>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>NID Back Side</Typography>
                  <Typography sx={{ width: '10px' }}>: </Typography>
                  <Box>
                    <img src={nid_image_back} alt="No_Available_Image" style={{ width: '250px', height: '120px' }}></img>
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* another part */}
        <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>Package Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Name</Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{package_name}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Facility </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{package_facility}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Guest </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{number_guest}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Code </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{code}</Typography>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Package Price </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{package_price}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Date From</Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>
                    {date_from} <span>(to)</span> {date_to}
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Total Room </Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{room}</Typography>
                </Typography>
              </Box>
              <Box sx={{ mt: '7px' }}>
                <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                  <Typography sx={{ width: '150px' }}>Payment Status</Typography>
                  <Typography sx={{ width: '10px' }}>:</Typography>
                  <Typography>{pay_status}</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {number_adults > 0 ? (
          <>
            {adults?.map((adult, index) => (
              <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }} key={index}>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>
                  Adult {index + 1} Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>First Name</Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{adult.first_name}</Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Phone </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{adult.phone}</Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Nid/Passport No</Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{adult.nid_no}</Typography>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Last Name </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{adult.last_name}</Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Nationality</Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{adult.nationality}</Typography>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '250px' }}>Nid/Passport Front Image </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Box>
                          <img src={adult.nid_image_front} alt="No_Available_Image" style={{ width: '250px', height: '120px' }} />
                        </Box>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '250px' }}>Nid/Passport Back Image </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Box>
                          <img src={adult.nid_image_back} alt="No_Available_Image" style={{ width: '250px', height: '120px' }} />
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </>
        ) : (
          <></>
        )}

        {number_childs > 0 ? (
          <>
            {childrens?.map((child, index) => (
              <Box sx={{ border: '1px solid #f1f1f1', mt: '30px', p: '20px' }} key={index}>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mb: '20px', color: '#12a9b2' }}>
                  Child {index + 1} Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>First Name</Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{child.first_name}</Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Age</Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{child.age}</Typography>
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Box>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Last Price </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{child.last_name}</Typography>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '150px' }}>Nationality</Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Typography>{child.nationality}</Typography>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '250px' }}>Birth Certificate/Passport Front Image </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Box>
                          <img src={child.passport_front_image} alt="No_Available_Image" style={{ width: '250px', height: '120px' }} />
                        </Box>
                      </Typography>
                    </Box>
                    <Box sx={{ mt: '7px' }}>
                      <Typography sx={{ fontSize: '15px', display: 'flex' }}>
                        <Typography sx={{ width: '250px' }}>Birth Certificate/Passport Back Image </Typography>
                        <Typography sx={{ width: '10px' }}>:</Typography>
                        <Box>
                          <img src={child.passport_back_image} alt="No_Available_Image" style={{ width: '250px', height: '120px' }} />
                        </Box>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </>
        ) : (
          <></>
        )}
      </Box>
    </MainCard>
  );
}
