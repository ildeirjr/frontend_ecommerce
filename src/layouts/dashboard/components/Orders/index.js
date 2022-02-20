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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Soft UI Dashboard Materail-UI example components
import DataTable from "examples/Tables/DataTable";



import PropTypes from 'prop-types';
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
  // const { columns, rows } = data(orders);
  // const [menu, setMenu] = useState(null);

  // const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  // const closeMenu = () => setMenu(null);

  // function createData(name, calories, fat, carbs, protein, price) {
  //   return {
  //     name,
  //     calories,
  //     fat,
  //     carbs,
  //     protein,
  //     price,
  //     history: [
  //       {
  //         date: '2020-01-05',
  //         customerId: '11091700',
  //         amount: 3,
  //       },
  //       {
  //         date: '2020-01-02',
  //         customerId: 'Anonymous',
  //         amount: 1,
  //       },
  //     ],
  //   };
  // }

  // const renderMenu = (
  //   <Menu
  //     id="simple-menu"
  //     anchorEl={menu}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "left",
  //     }}
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={Boolean(menu)}
  //     onClose={closeMenu}
  //   >
  //     <MenuItem onClick={closeMenu}>Action</MenuItem>
  //     <MenuItem onClick={closeMenu}>Another action</MenuItem>
  //     <MenuItem onClick={closeMenu}>Something else</MenuItem>
  //   </Menu>
  // );

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
                      <TableCell>Preço (R$)</TableCell>
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
                          {Math.round(productRow.price * 100) / 100}
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

  // Row.propTypes = {
  //   row: PropTypes.shape({
  //     calories: PropTypes.number.isRequired,
  //     carbs: PropTypes.number.isRequired,
  //     fat: PropTypes.number.isRequired,
  //     history: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         amount: PropTypes.number.isRequired,
  //         customerId: PropTypes.string.isRequired,
  //         date: PropTypes.string.isRequired,
  //       }),
  //     ).isRequired,
  //     name: PropTypes.string.isRequired,
  //     price: PropTypes.number.isRequired,
  //     protein: PropTypes.number.isRequired,
  //   }).isRequired,
  // };

  // const rowss = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  //   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  //   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  // ];

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
    // <Card>
    //   <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
    //     <MDBox>
    //       <MDTypography variant="h6" gutterBottom>
    //         Pedidos
    //       </MDTypography>
    //       {/* <MDBox display="flex" alignItems="center" lineHeight={0}>
    //         <Icon
    //           sx={{
    //             fontWeight: "bold",
    //             color: ({ palette: { info } }) => info.main,
    //             mt: -0.5,
    //           }}
    //         >
    //           done
    //         </Icon>
    //         <MDTypography variant="button" fontWeight="regular" color="text">
    //           &nbsp;<strong>30 done</strong> this month
    //         </MDTypography>
    //       </MDBox> */}
    //     </MDBox>
    //     {/* <MDBox color="text" px={2}>
    //       <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
    //         more_vert
    //       </Icon>
    //     </MDBox>
    //     {renderMenu} */}
    //   </MDBox>
      
    //   <MDBox>
    //     {/* <DataTable
    //       table={{ columns, rows }}
    //       showTotalEntries={false}
    //       isSorted={false}
    //       noEndBorder
    //       entriesPerPage={false}
    //     /> */}

          
    //   </MDBox>
    // </Card>
  );
}

export default Orders;
