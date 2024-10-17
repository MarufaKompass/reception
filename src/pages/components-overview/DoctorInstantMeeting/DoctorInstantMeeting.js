import MainCard from 'components/MainCard';
import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export default function DoctorInstantMeeting() {


  const navigate = useNavigate();
  const courierNavigate = () => {
    navigate('/addInstantDoctorMeeting');
  };
  
  

  // useEffect(() => {
  //   const fetchData = () => {
  //     axiosInstance
  //       .get(`https://api.hellokompass.com/reception/courier/${comId}`)
  //       .then((res) => {
  //         setCourier(res.data.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   fetchData();
  // }, [])



  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '-60px', pb: '10px' }}>
        <Button
          onClick={courierNavigate}
          style={{
            color: '#12A9B2',
            borderColor: '#12A9B2',
            '&:hover': {
              color: '#12A9B2',
              borderColor: '#12A9B2'
            }
          }}
          variant="outlined"
        >
          <Box fontSize="20px" sx={{ pr: '4px' }}>
            +
          </Box>
          Add Doctor Appointment
        </Button>
      </Box>
      <MainCard>
        <Box>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
      </MainCard>
    </Box>
  );
}
