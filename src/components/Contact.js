import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
export default function Contact() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
            subject: "",
            message: "",
        },
        onSubmit: values => {
            setOpen(true)
            


        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            name: Yup.string().min(2, 'Name must be more than 2 words').required("Required"),
            subject: Yup.string().min(2, 'Subject must be more than 2 words').required("Required"),
            message: Yup.string().min(2, 'Message must be more than 2 words').max(100, 'Message must be less than 100 words').required("Required")


        })
    })
    return (
        <div>
            <h1>Contact form</h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} >
                    <TextField
                        label="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && (<Typography variant="caption" color="red">{formik.errors.email}</Typography>)}

                    <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}
                    <TextField
                        label="Subject"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.subject && (<Typography variant="caption" color="red">{formik.errors.subject}</Typography>)}

                    <TextField
                        label="Message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.message && (<Typography variant="caption" color="red">{formik.errors.message}</Typography>)}


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
                            <AlertTitle>Send information contact successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button> */}
                    <Button
                     autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
