import { Grid, Typography } from '@mui/material'
import ListMeals from '../Components/ListMeals'
import React from 'react'

export default function Meals() {
 return (
  <div className='MainPage'>
  <Grid container spacing={2}>

      <Grid item xs={12}>
          <Typography className='h1'>
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
