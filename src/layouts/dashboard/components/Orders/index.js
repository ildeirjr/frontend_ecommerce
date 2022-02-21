/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as React from 'react';

import { useState } from "react";

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { format, parseISO } from "date-fns"

function Orders({ orders }) {

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align='center' component="th" scope="row">
            {format(parseISO(row.createdDate), "dd/MM/yyyy")}
          </TableCell>
          <TableCell align="center">{format(parseISO(row.deliveryDate), "dd/MM/yyyy")}</TableCell>
          <TableCell align="center">{row.address}</TableCell>
          <TableCell align="center">{`Equipe ${row.teamId}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Produtos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead style={{display: "contents"}}>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Preço</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products.map((productRow) => (
                      <TableRow key={productRow.id}>
                        <TableCell component="th" scope="row">
                          {productRow.name}
                        </TableCell>
                        <TableCell>{productRow.description}</TableCell>
                        <TableCell>
                          {productRow.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{display: "contents"}}>
          <TableRow>
            <TableCell />
            <TableCell align='center'>Data do pedido</TableCell>
            <TableCell align="center">Data de entrega</TableCell>
            <TableCell align="center">Endereço</TableCell>
            <TableCell align="center">Equipe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
