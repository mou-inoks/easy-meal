import React from 'react'
import '../App.css'
import Grid from '@mui/material/Grid';
import ListAliments from '../Components/ListAliments'
import Typography from '@mui/material/Typography';
import Navbar from '../Components/Navbar'


function MainPage() {
    return (
        <div className='MainPage'>
            <Navbar/>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography sx={{fontWeight: 800,fontFamily: 'Gilroy,sans-serif', fontSize: '60px' }} className='h1'>
                        Listes d'Aliments
                    </Typography>
                </Grid>
                <Grid item xs={12} />

                <Grid className='ListItem' item xs={10} >
                    <ListAliments />
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>

    );
}

export default MainPage;
