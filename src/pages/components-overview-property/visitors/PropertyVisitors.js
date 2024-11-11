import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
// import propertyVisitor from '../../../assets/images/img/propertyVisitors.png';
import axiosInstance from 'utils/axios.config';
import FloorList from './FloorList';
// import FloorModal from './FloorModal';
import RentalLists from './RentalLists';
import { useNavigate } from 'react-router-dom';
import PropertyVisitorsLoader from 'loader/PropertyVisitorsLoader';
export default function PropertyVisitors() {
  const [propertyVisitors, setPropertyVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log('propertyVisitors', propertyVisitors);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axiosInstance
        .get('https://api.hellokompass.com/reception/apartmentlist')
        .then((res) => {
          setPropertyVisitors(res.data.data);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };

    fetchData();
  }, []);

  const [apartmentList, setApartmentList] = useState(false);
  const handleOpenApartment = () => setApartmentList(true);
  const handleCloseApartment = () => setApartmentList(false);

  const dynamicTexts = ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];
  const dynamicTexts2 = ['6th Floor', '7th Floor', '8th Floor'];

  const navigate = useNavigate();
  // console.log(apartmentId);
  const handlePropertyList = () => {
    navigate('/propertyList');
  };

  return (
    <Box>
      <MainCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'poppins', pb: 4 }}> Floor and room Selection</Typography>
          </Box>
          <Box onClick={handlePropertyList} sx={{ cursor: 'pointer' }}>
            <Typography
              sx={{ color: '#F7941D', fontFamily: 'poppins', fontSize: '16px', fontWeight: 'medium', textDecoration: 'underline', pt: 0.5 }}
            >
              Visitors List
            </Typography>
          </Box>
        </Box>
        {loading ? (
        <Box>
          <PropertyVisitorsLoader></PropertyVisitorsLoader>
        </Box>
        ) : (
          <Grid container spacing={3} sx={{ my: 2 }}>
            <Grid item xs={3}>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                  {propertyVisitors.slice(0, 15).map((propertyVisitor, index) => (
                    <React.Fragment key={propertyVisitor.apartment_id}>
                      <Grid item xs={4}>
                        <FloorList propertyVisitor={propertyVisitor} handleOpenApartment={handleOpenApartment} />
                      </Grid>
                      {(index + 1) % 3 === 0 && (
                        <Grid item xs={12} sx={{ position: 'relative' }}>
                          <Typography
                            variant="body1"
                            align="left"
                            sx={{
                              position: 'absolute',
                              top: '-113px',
                              left: 24,
                              width: '100%',
                              fontWeight: 'bolder',
                              fontSize: '14px',
                              fontFamily: 'poppins',
                              color: '#333'
                            }}
                          >
                            {dynamicTexts[Math.floor(index / 3)] || 'Default Text'}
                          </Typography>
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                  {propertyVisitors.slice(15, 30).map((propertyVisitor, index) => (
                    <React.Fragment key={propertyVisitor.apartment_id}>
                      <Grid item xs={4}>
                        <FloorList propertyVisitor={propertyVisitor} handleOpenApartment={handleOpenApartment} />
                      </Grid>
                      {(index + 1) % 3 === 0 && (
                        <Grid item xs={12} sx={{ position: 'relative' }}>
                          <Typography
                            variant="body1"
                            align="left"
                            sx={{
                              position: 'absolute',
                              top: '-113px',
                              left: 24,
                              width: '100%',
                              fontWeight: 'bolder',
                              fontSize: '14px',
                              font: 'poppins',
                              color: '#333'
                            }}
                          >
                            {dynamicTexts2[Math.floor(index / 3)] || 'Default Text'}
                          </Typography>
                        </Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
              {/* <Box sx={{ backgroundColor: '#fcfcfc', py: 14, px: 3, borderRadius: '16px' }}>
                <img src={propertyVisitor} alt="" style={{ width: '100%', height: '100%' }} />
              </Box> */}
            </Grid>
          </Grid>
        )}
      </MainCard>

      <RentalLists handleCloseApartment={handleCloseApartment} apartmentList={apartmentList}></RentalLists>
    </Box>
  );
}
