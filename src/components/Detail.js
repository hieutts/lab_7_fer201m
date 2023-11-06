import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";

export default function Detail() {
    const staff = useParams();
    const [APIData, setAPIData] = React.useState([]);
    const getStaffsUrl = `https://6547db55902874dff3acd0ce.mockapi.io/staffs/${staff.id}`;
    React.useEffect(() => {
        axios.get(getStaffsUrl)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(`HTTP status: ${res.status} `)
                }
                return res.data;
            })
            .then(data => setAPIData(data))
            .catch(err => console.log(err));

    }, [getStaffsUrl])

    return (
        <div>
            <h1>Detail</h1>
            <Grid container rowSpacing={2} >
                <Grid className="parent" item xs={12}>
                    <Card>
                        <CardMedia
                            sx={{ height: 440 }}
                            image={APIData.avatar}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <a href={`detail/${APIData.id}`}>{APIData.name}</a>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {APIData.address}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {APIData.age}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {APIData.address}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}
