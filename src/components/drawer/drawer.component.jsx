import React from "react";
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubHeader from '@mui/material/ListSubHeader';
import { BarChartRounded, DataUsageRounded, PeopleAltRounded, ReceiptRounded, QueryStatsRounded, AccountBoxRounded, SettingsRounded, LogoutRounded } from "@mui/icons-material";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const muiTheme = createTheme({
    components:{
        MuiListItem: {
            styleOverrides: {
                root:{
                    borderRadius: '20px',
                    marginTop: '5px',
                    justifyContent: 'center',
                    "&:selected": {
                        backgroundColor: 'lightgrey',
                    },
                    
                },
                MuiListItemButton: {
                    "&&:hover":{
                        backgroundColor: 'inherit',
                    }
                }
            }
        }
    }
});




export const drawer = (
    <div>
    <ThemeProvider theme={muiTheme}>
    <Toolbar />
    <Divider />
    <List subheader={<ListSubHeader component="div" id="general-list">General</ListSubHeader>}>
        {['App', 'Analytics'].map((text, index) => (
            <ListItem key={text}>
                <ListItemButton>
                    <ListItemIcon sx={{ color: 'white', fontSize: '10px' }}>
                        {text === 'Analytics' ? <BarChartRounded /> : <DataUsageRounded />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ color: 'white', fontSize: '8px' }}></ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
    </List>
    <Divider />
    <List subheader={<ListSubHeader component="div" id="management-list">Management</ListSubHeader>}>
        {['Users', 'Applications', 'Market'].map((text, index) => (
            <ListItem key={text}>
                <ListItemButton>
                    <ListItemIcon sx={{ color: 'white' }}>
                        {text === 'Users' ? <PeopleAltRounded /> : text === 'Applications' ? <ReceiptRounded /> : <QueryStatsRounded /> }
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ color: 'white' }}></ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
    </List>
    <Divider />
    <List subheader={<ListSubHeader component="div" id="account-list">Account</ListSubHeader>}>
        {['Profile', 'Settings', 'Logout'].map((text, index) => (
            <ListItem key={text}>
                <ListItemButton>
                    <ListItemIcon sx={{ color: 'white' }}>
                        {text === 'Profile' ? <AccountBoxRounded /> : text === 'Settings' ? <SettingsRounded /> : <LogoutRounded />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ color: 'white' }}></ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
    </List>
    </ThemeProvider>
    </div>
);