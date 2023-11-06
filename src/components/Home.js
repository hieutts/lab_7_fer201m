import React from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";

export default function Home() {
    const [APIData, setAPIData] = React.useState([]);
    const getStaffsUrl = 'https://6547db55902874dff3acd0ce.mockapi.io/staffs';
    React.useEffect(() => {
        axios.get(getStaffsUrl)
            .then(res => res.data)
            .then(
                data => setAPIData(data.sort((a, b) => b.age - a.age))
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <h1 className="font-pages">Home</h1>
            <Grid container rowSpacing={1} columnSpacing={{ sx: 1, sm: 2, md: 3 }} >
                {APIData.map((staff, index) => (
                    <Grid item xs={3} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 240 }}
                                image={staff.avatar}
                                title="green iguana"
                            />
<CardContent>
    <Typography gutterBottom variant="h5" component="div">
        <Link to={`detail/${staff.id}`}>
        {staff.name}
        </Link>
    </Typography>
    <Typography gutterBottom variant="h5" component="div">
    {staff.address}
        </Typography> <Typography gutterBottom variant="h5" component="div">
          {staff.age}
        </Typography>
</CardContent>
<CardActions>
    <Link to={`detail/${staff.id}`}>
        <Button size="small">Detail</Button>
    </Link>
</CardActions>
                           
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
