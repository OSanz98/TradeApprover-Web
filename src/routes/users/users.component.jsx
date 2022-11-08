import React, {useState, useEffect} from "react";
import { StyledMainButton } from "../../components/button/main-button.component";
import { filter } from 'lodash';
import {
    Grid,
    Card,
    Table,
    Stack,
    Paper,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Typography,
    IconButton,
    TableContainer,
    TablePagination
} from '@mui/material';
import { PlusOutlined, ReloadOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UserToolBar from '../../components/toolbar/user-toolbar.component';
import ListHead from '../../components/toolbar/list-header.component';
import ScrollBar from '../../components/scrollbar/scrollbar.component';
import { StyledLoadingButton } from '../../components/button/loading-button.component';
import {useTheme} from '@mui/material/styles';
import { retrieveUsers } from '../../util/firebase/firebase.utils';

// Headers for the table
const TABLE_HEADERS = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'admin', label: 'Is Admin', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
];


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
  

const Users = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState(null);
    const [open, setOpen] = useState(null);
    // eslint-disable-next-line
    const theme = useTheme();

    // useEffect(() => {

    //     const fetchData = async () => {
    //         const response = await retrieveUsers();
    //         console.log(response);
    //         if(response){
    //             setUsersData(response);
    //             setFilteredUsers(applySortFilter(usersData, getComparator(order, orderBy), filterName));
    //         }
    //     }

    //     if(filteredUsers == null) {
    //         // fetchData();
    //         handleRefreshUsers();
    //     }
    // });

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    
    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleRequestSort = (event, property) =>{
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleSelectAllClick = (event) => {
        if(event.target.checked){
            const newSelected = usersData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
      

    const handleRefreshUsers = async (event) => {
        console.log("currently executing");
        // event.preventDefault();
        setLoading(true);
        const response = await retrieveUsers();
        console.log(response);
        if(response) {
            setUsersData(response);
            setLoading(false);
        } else {
            alert("Sorry no users were found.");
            setLoading(false);
        }
        setFilteredUsers(applySortFilter(usersData, getComparator(order, orderBy), filterName));
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersData.length) : 0;
    // const isNotFound = !filteredUsers.length && !!filterName;

    return(
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <StyledLoadingButton 
                    loading={loading} 
                    type="submit" 
                    onClick={handleRefreshUsers} 
                    variant="contained"
                    loadingPosition="start"
                    startIcon={<ReloadOutlined />} 
                    sx={{marginBottom: '30px'}}
                >Refresh Users</StyledLoadingButton>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Users</Typography>
                    <StyledMainButton variant="contained" startIcon={<PlusOutlined  />}>
                        Add New User
                    </StyledMainButton>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card>
                    <UserToolBar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                    <ScrollBar>
                        <TableContainer sx={{minWidth: '100%'}}>
                            <Table>
                                <ListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEADERS}
                                    // rowCount={USERLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { company, isAdmin, name } = row;
                                        const selectedUser = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow hover key={row.id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                                                </TableCell>
                                                
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell align="left">{company}</TableCell>
                                                
                                                <TableCell align="left">{isAdmin ? 'Yes' : 'No'}</TableCell>
                                               
                                                <TableCell align="left">
                                                    okay
                                                </TableCell>
                                                
                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                        <MoreOutlined />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )} */}
                                </TableBody>
                                
                                {/* {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Paper
                                            sx={{
                                                textAlign: 'center',
                                            }}
                                            >
                                            <Typography variant="h6" paragraph>
                                                Not found
                                            </Typography>

                                            <Typography variant="body2">
                                                No results found for &nbsp;
                                                <strong>&quot;{filterName}&quot;</strong>.
                                                <br /> Try checking for typos or using complete words.
                                            </Typography>
                                            </Paper>
                                        </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )} */}
                            </Table>
                        </TableContainer>
                    </ScrollBar>
                    
                   
                    <TablePagination 
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        // count={usersData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Grid>
            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{vertial: 'top', horizontal: 'left'}}
                transformOrigin={{vertial: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {
                      p: 1,
                      width: 140,
                      '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                }}
            >
                <MenuItem>
                    <EditOutlined />
                    Edit
                </MenuItem>
                <MenuItem>
                    <DeleteOutlined />
                    Delete
                </MenuItem>
            </Popover>
        </Grid>
    )
};

export default Users;