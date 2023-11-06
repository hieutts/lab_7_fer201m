import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AddStaff() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const postStaffUrl = 'https://6547db55902874dff3acd0ce.mockapi.io/staffs';
    const currDate = new Date();
    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            age: "",
            avatar: "",
            createdAt: currDate,
        },
        onSubmit: (values) => {
            values.createdAt = new Date(values.createdAt);
            axios.post(postStaffUrl, values)
                .then(
                    response => {
                        return response.data;
                    })
                .then(data => setOpen(true))
                .catch(error => console.log(error.message));
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(3, "Must be more 2 characters"),
            address: Yup.string().required("Required.").typeError("Please enter a address"),
            age: Yup.number().integer().required("Required.").typeError("Please enter a valid number"),
            avatar: Yup.string().url().required("Required.").typeError("Please enter a valid url"),
            createdAt: Yup.string().required("Required.").typeError("Please enter date")
        }),
    })

    return (
        <div >
            <h1>
                Add new staff
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} >
                    <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}

                    <TextField
                        label="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.address && (<Typography variant="caption" color="red">{formik.errors.address}</Typography>)}
                    <TextField
                        label="age"
                        name="age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.age && (<Typography variant="caption" color="red">{formik.errors.age}</Typography>)}

                    <TextField
                        label="avatar"
                        name="avatar"
                        value={formik.values.avatar}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.avatar && (<Typography variant="caption" color="red">{formik.errors.avatar}</Typography>)}

                    <TextField
                        label="createdAt"
                        name="createdAt"
                        disabled
                        value={formik.values.createdAt}
                        onChange={formik.handleChange}
                    />
                </Stack>
                <Button variant="contained" size="small"
                    type='submit'>
                    Save
                </Button>

            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Adding successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}
