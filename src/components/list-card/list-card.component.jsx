import React,  {useState} from 'react';
import { filter } from 'lodash';
import {
    Grid,
    Card,
    TableContainer,
    Table,
    TableBody,
    TablePagination,
    TableRow,
    TableCell,
    Popover,
    MenuItem,
    Paper,
    Typography,
    Checkbox,
    Stack,
    IconButton,
} from '@mui/material';
import { PlusOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import UserToolBar from '../toolbar/user-toolbar.component';
import ScrollBar from '../../components/scrollbar/scrollbar.component';
import ListHead from '../toolbar/list-header.component';

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
    if(array !== null && array !== undefined){
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
    return [];
}

const ListCard = (headers, addToListAction, removeFromListAction, isAllMarkets, tableData) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [open, setOpen] = useState(null);
    const [menuSelected, setMenuSelected] = useState([]);

    const handleOpenMenu = (event, name) => {
        setOpen(event.currentTarget);
        let newSelected = [name];
        setMenuSelected(newSelected);
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
            const newSelected = tableData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    }

    const handleCheckClick = (event, name) => {
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleRemovalFromList = (event, isMenuClick) => {
        
        if(isMenuClick) {
            removeFromListAction(menuSelected);
        } else {
            removeFromListAction(selected);
        }
        
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
    const filteredUsers = applySortFilter(tableData, getComparator(order, orderBy), filterName);
    const isNotFound = !(filteredUsers.length || 0) && !!filterName;


    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card>
                    <UserToolBar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                    <ScrollBar>
                        <TableContainer sx={{minWidth: '100%'}}>
                            <Table>
                                <ListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={headers}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers !== undefined && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { name, price, percentage, progress} = row;
                                        const selectedMarket = selected.indexOf(name) !== -1;

                                        return (
                                        <TableRow hover key={name} tabIndex={-1} role="checkbox" selected={selectedMarket}>
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selectedMarket} onChange={(event) => handleCheckClick(event, name)} />
                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography variant="subtitle2" noWrap>
                                                    {name}
                                                </Typography>
                                            </Stack>
                                            </TableCell>

                                            <TableCell align="left">{price}</TableCell>

                                            <TableCell align="left">{percentage}</TableCell>

                                            <TableCell align="left">{progress}</TableCell>

                                            <TableCell align="right">
                                                <IconButton size="large" color="inherit" onClick={handleOpenMenu(name)}>
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
                                    )}
                                </TableBody>
                                {isNotFound && (
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
                                )}
                            </Table>
                        </TableContainer>
                    </ScrollBar>
                    
                    
                    <TablePagination 
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Grid>
            {!isAllMarkets && (
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
                    <MenuItem onClick={handleRemovalFromList(true)}>
                        <DeleteOutlined />
                        Remove
                    </MenuItem>
                </Popover>
            )}
        </>
    );
};

export default ListCard;