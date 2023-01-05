import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import MealsAutocomplete from '../Components/MealAutocomplete'

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

  const proteineArr: InterfaceAliment[] = []

  const legumeArr: InterfaceAliment[] = []

  const feculentArr: InterfaceAliment[] = []

  const [alimArr, setAlimArr] = useState<InterfaceAliment[]>([])

  const FeedAllArr = () => {
    alimArr.map((e) => {
      if (e.typeId == 'Protéine')
        proteineArr.push(e)
      else if (e.typeId == "Légume")
        legumeArr.push(e)
      else
        feculentArr.push(e)
    })
  }
  FeedAllArr()

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
            })
            .catch(function (error) {
              console.log(error);
            });

        }}
      >
        {({ values, handleChange, setFieldValue }) => {
          return <Form>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                name='name'
                sx={{ position: 'absolute', left: '43%', top: '20%' }}
                required
                id="name"
                label="Nom"
              />
            </Box>

            <Grid sx={{ position: 'absolute', left: '43.5%', top: '30%' }}>
              <MealsAutocomplete arr={proteineArr} aliment='proteine' label='Protéines' />
            </Grid>

            <Grid sx={{ position: 'absolute', left: '43.5%', top: '40%' }}>
              <MealsAutocomplete arr={legumeArr} aliment='legume' label='Légumes' />
            </Grid>

            <Grid sx={{ position: 'absolute', left: '43.5%', top: '50%' }}>
              <MealsAutocomplete arr={feculentArr} aliment='feculent' label='Féculents' />
            </Grid>

            <Button type='submit' sx={{ top: '35rem', left: '47.5%' }} variant="contained">Add</Button>
          </Form>
        }}
      </Formik>
    </div>
  )
}

export default CreateRepas