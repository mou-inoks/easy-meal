import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers, Form } from 'formik'
import MealsAutocomplete from '../Components/MealAutocomplete'
import Navbar from '../Components/Navbar'
import * as Yup from "yup";

interface Values {
  name: string,
  proteine: InterfaceAliment | null,
  legume: InterfaceAliment | null,
  feculent: InterfaceAliment | null
}

interface InterfaceAliment {
  id: number;
  name: string;
  typeId: string;
}


const CreateRepas = () => {

  const [alimArr, setAlimArr] = useState<InterfaceAliment[]>([])
  const [nameError, setNameError] = useState(false)

  const FetchGetAllAliments = () => {
    axios.get('https://localhost:7185/api/Aliments').then(res => {
      console.log(res)
      setAlimArr(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    FetchGetAllAliments()
  }, [])

  return (
    <div>
      <Navbar/>
      <Typography sx={{ fontWeight: 800, fontFamily: 'Gilroy,sans-serif', fontSize: '60px' }} className='h1'>Créer un repas</Typography>
      <Formik<Values>
        initialValues={{
          name: '',
          proteine: null,
          legume: null,
          feculent: null,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const ingredients = values.proteine?.name + ", " + values.feculent?.name + ", " + values.legume?.name

          axios.post('https://localhost:7185/api/Aliments/Repas', {
            name: values.name,
            ingrédients: ingredients
          })
            .then(function (response) {
              setSubmitting(true)
              console.log(response);
              alert("Repas as been added")
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {({ handleChange }) => {
          return <Form>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: 240 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                name='name'
                sx={{ position: 'absolute', left: '43%', top: '30%' }}
                required
                id="name"
                label="Nom"
                error={nameError}
              />
            </Box>

            <Grid sx={{ position: 'absolute', left: '43.5%', top: '40%' }}>
              <MealsAutocomplete arr={alimArr} aliment='proteine' label='Protéine'  />
            </Grid>

            <Grid sx={{ position: 'absolute', left: '43.5%', top: '50%' }}>
              <MealsAutocomplete arr={alimArr} aliment='legume' label='Légume' />
            </Grid>

            <Grid sx={{ position: 'absolute', left: '43.5%', top: '60%' }}>
              <MealsAutocomplete arr={alimArr} aliment='feculent' label='Féculent'  />
            </Grid>

            <Button type='submit' sx={{ top: '35rem', left: '47.5%' }} variant="contained">Ajouter</Button>
          </Form>
        }}
      </Formik>
    </div>
  )
}

export default CreateRepas