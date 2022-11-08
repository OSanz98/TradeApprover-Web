import React,  {useState, useEffect} from 'react';
import {
    Grid,
    Stack,
    Typography,
    Tabs,
    Tab
} from '@mui/material';
import { StyledLoadingButton } from '../../components/button/loading-button.component';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import ListCard from '../../components/list-card/list-card.component';
import { retrieveMostActiveMarkets } from '../../util/firebase/firebase.utils';


const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'percentage', label: 'Percentage', alignRight: false },
    { id: 'progress', label: 'Progress', alignRight: false },
    { id: '' },
];

const Market = () => {

    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('allMarkets');
    const [companyList, setCompanyList] = useState([]);
    const [allMarketsData, setAllMarketsData] = useState([]);

    useEffect(() => {
        const fetchCompanyData = async () =>{
            setCompanyList([]);
        }
        const fetchMarketData = async () =>{
            const response = await retrieveMostActiveMarkets();
            setAllMarketsData(response);
            console.log(response);
        }

        fetchCompanyData();
        fetchMarketData();

    }, []);

    const handleTabSelection = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const refreshAction = async () => {
        setLoading(true);
        if(selectedTab === 0){
            // refresh data for all markets
            setAllMarketsData(await retrieveMostActiveMarkets());
        } else {
            // refresh data list for markets allowed by company
        }
    }

    const handleMarketRemoval = (marketArr) => {
        console.log(marketArr);
    }

    const handleMarketAddition = (marketArr) => {
        console.log(marketArr);
    }

    // componentDidMount(async () => {
    //     setAllMarketsData(await retrieveAllMarkets());
    // })

    return(
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <StyledLoadingButton 
                    loading={loading} 
                    type="submit" 
                    onClick={refreshAction} 
                    variant="contained"
                    loadingPosition="start"
                    startIcon={<ReloadOutlined />} 
                    sx={{marginBottom: '30px'}}
                >{selectedTab === 0 ? 'Refresh Markets' : 'Refresh List'}</StyledLoadingButton>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Users</Typography>
                    <Tabs value={selectedTab} onChange={handleTabSelection} textColor="primary" inidicatorColor="secondary">
                        <Tab value="allMarkets" label="All Markets" />
                        <Tab value="companyList" label="Company List" />
                    </Tabs>
                </Stack>
            </Grid>
            {/* {selectedTab === 0 && (
                <ListCard isAllMarkets tableData={allMarketsData} removeFromListAction={handleMarketRemoval} headers={TABLE_HEAD} addToListAction={handleMarketAddition}/>
            )}
            {selectedTab === 1 && (
                <ListCard tableData={companyList} removeFromListAction={handleMarketRemoval} headers={TABLE_HEAD} addToListAction={handleMarketAddition}/>
            )} */}
        </Grid>
    );
}

export default Market;
