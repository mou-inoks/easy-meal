import { Grid, Typography } from '@mui/material'
import ListMeals from '../Components/ListMeals'
import React from 'react'
import Navbar from '../Components/Navbar'

export default function Meals() {
    return (
        <div style={{
            height: '100%', 
            width: '100%',
            backgroundColor: '#f1f4f8',
            }} 
            className='MainPage'
            >
            <Navbar/>
            <Grid sx={{height: '100%', width: '100%', backgroundColor: '#f1f4f8'}} container spacing={2}>

                <Grid item xs={12}>
                    <Typography sx={{fontWeight: 800,fontFamily: 'Gilroy,sans-serif', fontSize: '60px' }} className='h1'>
                        Listes de repas
                    </Typography>
                </Grid>
                <Grid item xs={12} />

                <Grid className='ListItem' item xs={10} >
                    <ListMeals />
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    )
}
