import React, {useContext, useState } from "react";
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from "@mui/material";
import { Menu } from '@mui/icons-material';
import Box from'@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import CssBaseline from "@mui/material/CssBaseline";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubHeader from '@mui/material/ListSubHeader';
import { BarChartRounded, DataUsageRounded, PeopleAltRounded, ReceiptRounded, QueryStatsRounded, AccountBoxRounded, SettingsRounded, LogoutRounded } from "@mui/icons-material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Dashboard from '../dashboard/dashboard.component';
import Users from '../users/users.component';
import Market from "../markets/market.component";
import CustomThemeProvider from '../../theme/ThemeProvider.component';

const drawerWidth = 240;

const muiTheme = createTheme({
    components:{
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    color: 'white',
                    '& .MuiListItemIcon-root': { 
                        color: 'white',
                    },
                    '&.Mui-selected': {
                        borderRight: `2px solid white`,
                        color: 'black',
                        '&.MuiListItemButton-root': { 
                            bgColor: 'white',
                        },
                        '& .MuiListItemIcon-root':{
                            color: 'bLack',
                        },
                    },
                    '&:hover': {
                        bgColor: 'white',
                    }
                }
            }
        },
    }
});

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedItem, setSelectedItem] = useState('App');

    const handleDrawerToggle = () => {
        setIsMobile(!isMobile);
    }

    const handleListItemClick = (event, text) => {
        setSelectedItem(text);
    }

    const drawer = (
        <div>
        <ThemeProvider theme={muiTheme}>
        <Toolbar />
        {/* <Divider /> */}
        <List subheader={<ListSubHeader component="div" id="general-list" style={{backgroundColor:'#637d63', color: 'white'}}>General</ListSubHeader>}>
            {['App', 'Analytics'].map((text, index) => (
                <ListItem key={text}>
                    <ListItemButton selected={ selectedItem === text } onClick={ (event) => handleListItemClick(event, text) }>
                        <ListItemIcon>
                            {text === 'Analytics' ? <BarChartRounded /> : <DataUsageRounded />}
                        </ListItemIcon>
                        <ListItemText primary={text}></ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List subheader={<ListSubHeader component="div" id="management-list" style={{backgroundColor:'#637d63', color: 'white'}}>Management</ListSubHeader>}>
            {['Users', 'Applications', 'Market'].map((text, index) => (
                <ListItem key={text}>
                    <ListItemButton selected={ selectedItem === text } onClick={ (event) => handleListItemClick(event, text) }>
                        <ListItemIcon>
                            {text === 'Users' ? <PeopleAltRounded /> : text === 'Applications' ? <ReceiptRounded /> : <QueryStatsRounded /> }
                        </ListItemIcon>
                        <ListItemText primary={text}></ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List subheader={<ListSubHeader component="div" id="account-list" style={{backgroundColor:'#637d63', color: 'white'}}>Account</ListSubHeader>}>
            {['Profile', 'Settings', 'Logout'].map((text, index) => (
                <ListItem key={text} sx={{width: '100%', flex: '1'}}>
                    <ListItemButton selected={ selectedItem === text } onClick={ (event) => handleListItemClick(event, text) }>
                        <ListItemIcon>
                            {text === 'Profile' ? <AccountBoxRounded /> : text === 'Settings' ? <SettingsRounded /> : <LogoutRounded />}
                        </ListItemIcon>
                        <ListItemText primary={text}></ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        </ThemeProvider>
        </div>
    );

    if(!currentUser) {
        return <Navigate replace to="/sign-in" />;
    } else {
        return (
            <CustomThemeProvider>
            <Box sx={{ display: 'flex'}}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ 
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        ml: {sm: `${drawerWidth}px`},
                        bgcolor: "#637d63",
                        justifyContent: "center"
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none'} }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h8" noWrap component="div">
                            TradeApprover
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                <Box
                    component="div"
                    sx={{width: {sm:drawerWidth}, flexShrink: {sm: 0}, }}
                    aria-label="side menu"
                >
                    <Drawer
                        PaperProps={{
                            sx:{
                                backgroundColor: "#637d63"
                            }
                        }}
                        variant="temporary"
                        open={isMobile}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                            
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        PaperProps={{
                            sx:{
                                backgroundColor: "#637d63"
                            }
                        }}
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block'},
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                            
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{width: {sm: `calc(100% - ${drawerWidth}px)`}, flexGrow: 1, p: {xs: 2, sm: 3}}}>
                    <Toolbar />
                    {(selectedItem === 'App') && (<Dashboard />)}
                    {(selectedItem === 'Users') && (<Users />)}
                    {(selectedItem === 'Market') && (<Market />)}
                </Box>
                
            </Box>
            </CustomThemeProvider>
        );
    }
}

export default Navigation;