import React from 'react'
import '../App.css'
import Grid from '@mui/material/Grid';
import List from '../Components/List'
import Typography from '@mui/material/Typography';



function MainPage() {
    return (
        <div className='MainPage'>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography className='h1'>
                        Listes d'Aliments
                    </Typography>
                </Grid>
                <Grid item xs={12}/>
                
                <Grid className='ListItem' item xs={10} >
                    <List/>
                </Grid>
            </Grid>
        </div>

    );
}

export default MainPage;
