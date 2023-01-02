import React from 'react'
import '../App.css'
import Grid from '@mui/material/Grid';
import ListAliments from '../Components/ListAliments'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function MainPage() {
    return (
        <div className='MainPage'>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography className='h1'>
                        Listes d'Aliments
                    </Typography>
                </Grid>
                <Grid item xs={12} />

                <Grid className='ListItem' item xs={10} >
                    <ListAliments />
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ top: '12rem', left: '62%' }} variant="contained"><Link style={{ textDecoration: 'none', color: 'white' }} to={'/CreateMeals'}>Add</Link></Button>
                </Grid>
            </Grid>
        </div>

    );
}

export default MainPage;
