import React from "react"
import { Grid ,Typography } from '@mui/material'
import './dashboard.styles.scss';
import MainCard from '../../components/analytic-card/main-card.component';

const Dashboard = () => {
    return(
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h6">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" /> */}
                {/* Total applications, Total users,  */}
                <MainCard title="Total Applications" count="34" color='#637d63'/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" /> */}
                {/* Total applications, Total users,  */}
                <MainCard title="Total Applications" count="34" color='#637d63' />
            </Grid>
            
        </Grid>
    )
};

export default Dashboard;