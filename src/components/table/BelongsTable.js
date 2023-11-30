import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function BelongsTable(props) {
  const { belongs, qty } = props;
  const productTypes = belongs?.split(',');
  const quantities = qty?.split(',');

  const products = productTypes.map((belong, index) => ({
    belong,
    quantity: quantities[index]
  }));

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell align="left">Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {product.belong}
                </TableCell>
                <TableCell component="th" scope="row">
                  {product.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
