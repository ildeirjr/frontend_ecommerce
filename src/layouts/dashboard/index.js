/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
// import { DataGrid } from "@mui/x-data-grid" 

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDButton from "components/MDButton";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Orders from "layouts/dashboard/components/Orders";
import Teams from "layouts/dashboard/components/Teams";

import { useState, useEffect } from 'react';

import { axiosInstance } from '../../../src/config/axios';
import MDAlert from "components/MDAlert";
import MDTypography from "components/MDTypography";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [teams, setTeams] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("api_token")}`;

  useEffect(() => {
    axiosInstance.get('/api/Orders', { params: { skip: (currentPage * pageSize), take: pageSize } })
    .then(function (response) {
      setTotalOrders(response.data.total)
      setOrders(response.data.orders)
    })
  }, [currentPage])

  useEffect(() => {
    axiosInstance.get('/api/Products')
    .then(function (response) {
      setProducts(response.data)
    })

    axiosInstance.get('/api/Teams')
    .then(function (response) {
      setTeams(response.data)
    })
  }, [])

  const Paginacao = ({ totalCount, pageSize }) => {
    const qtdPages = Math.ceil(totalCount / pageSize);

    const handlePreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1)
      }
    }

    const handleNextPage = () => {
      if (currentPage < qtdPages){
        setCurrentPage(currentPage + 1)
      }
    }

    const handleFirstPage= () => {
      setCurrentPage(0)
    }

    const handleLastPage= () => {
      setCurrentPage(qtdPages - 1)
    }

    return (
      <MDBox>
        <MDButton 
          color="info"
          size="small" 
          circular={true}
          onClick={() => {handleFirstPage()}}
          disabled={currentPage == 0 ? true : false}
          style={{margin: "5px"}}
        >
          <FirstPageIcon></FirstPageIcon>
        </MDButton>
        <MDButton 
          color="info"
          size="small" 
          circular={true}
          onClick={() => {handlePreviousPage()}}
          disabled={currentPage == 0 ? true : false}
          style={{margin: "5px"}}
        >
          <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
        </MDButton>
        <MDButton 
          color="info"
          size="small" 
          circular={true}
          onClick={() => {handleNextPage()}}
          disabled={currentPage == (qtdPages - 1) ? true : false}
          style={{margin: "5px"}}
        >
          <ArrowForwardIosIcon></ArrowForwardIosIcon>
        </MDButton>
        <MDButton 
          color="info"
          size="small" 
          circular={true}
          onClick={() => {handleLastPage()}}
          disabled={currentPage == (qtdPages - 1) ? true : false}
          style={{margin: "5px"}}
        >
          <LastPageIcon></LastPageIcon>
        </MDButton>
        <MDTypography style={{marginLeft: "10px"}} variant="caption">{`Mostrando página ${currentPage + 1} de ${qtdPages}`}</MDTypography>
      </MDBox>
      
    )
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDAlert color="dark">{`Seja bem vindo ${localStorage.getItem("username")}!`}</MDAlert>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Pedidos"
                count={totalOrders}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Produtos"
                count={products.length}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Equipes"
                count={teams.length}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDTypography variant="h4" fontWeight="bold">Pedidos</MDTypography>
              <Orders orders={orders} />
              <Paginacao totalCount={totalOrders} pageSize={pageSize}/>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MDTypography variant="h4" fontWeight="bold">Equipes</MDTypography>
              <Teams teams={teams} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
