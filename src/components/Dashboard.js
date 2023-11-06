import React, { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";

export default function Dashboard() {

    const [APIData, setAPIData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelSucDia, setOpenDelSucDia] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const getStaffsUrl = 'https://6547db55902874dff3acd0ce.mockapi.io/staffs';
    const loadStaffs = () => {

        axios.get(getStaffsUrl).then(
            response => {
                return response.data;
            })
            .then(data => { setAPIData(data.sort((a, b) => { return b.age - a.age })) })
            .catch(error => console.log(error.message));


    };
    React.useEffect(() => {
        loadStaffs();
    }, []);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setOpenDelSucDia(false);
        loadStaffs();
    };
    const showConfirmDeleteDialog = (id) => {
        setIdDelete(id);
        setOpen(true);

    };
    const deleteStaff = () => {
        setOpen(false);
        axios.delete(getStaffsUrl + `/${idDelete}`)
            .then(
                response => {
                    return response.data;
                })
            .then(data => setOpenDelSucDia(true))
            .catch(error => console.log(error.message));

    };

    return (
        <div>
            <h1>Dashboard</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}
                    aria-lable="si"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Avatar</TableCell>
                            <TableCell align="left">Age</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((staff, index) => (
                            <TableRow key={index}
                                sx={{ '&:last-child td, &last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope="row">
                                    {staff.id}
                                </TableCell>
                                <TableCell component='th' scope="row">
                                    {staff.name}
                                </TableCell>
                                <TableCell component='th' scope="row" align="right">
                                    <Avatar align="left" alt='avatar' src={staff.avatar} />
                                </TableCell>
                                <TableCell component='th' scope="row" align="left">
                                    {staff.age}
                                </TableCell>
                                <TableCell component='th' scope="row" align="left">
                                    {staff.age}
                                </TableCell>
                                <TableCell align="left">
                                    <Stack direction='row' spacing={3}>
                                        <Link to='/addNewStaff'>
                                            <IconButton>
                                                <Icon sx={{ color: green[500] }}>
                                                    ad_circle
                                                </Icon>
                                            </IconButton>
                                        </Link><Link to={`/updateStaff/${staff.id}`}>
                                            <IconButton><Icon sx={{ color: green[500] }}>update_circle</Icon></IconButton>
                                        </Link>

                                        <IconButton onClick={(e) => { showConfirmDeleteDialog(staff.id) }}><Icon sx={{ color: green[500] }}>delete_circle</Icon></IconButton>
                                    </Stack>

                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-description="alert-dialog-description"
            >
                <DialogTitle id='alert-dialog-title'>
                    {"Delete staff"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        <Alert severity="warning">
                            <AlertTitle>Are you sure to delete this staff ?</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteStaff}>
                        Yes
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDelSucDia}
                onClose={handleOk}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Delete Staff Successfully</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
