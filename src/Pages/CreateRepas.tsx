import { Autocomplete, Box, Button, createFilterOptions, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers, Form, Field } from 'formik'

interface Values {
  name: string,
  proteine: string,
  legume: string,
  feculent: string
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
      <Typography className='h1'>Créer un repas</Typography>
      <Formik<Values>
        initialValues={{
          name: '',
          proteine: '',
          legume: '',
          feculent: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const ingredients = values.proteine + ", " + values.feculent + ", " + values.legume

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
        {({ values }) => {
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
                onChange={(e) => values.name = e.target.value}
                name='name'
                sx={{ position: 'absolute', left: '43%', top: '20%' }}
                required
                id="name"
                label="Nom"
              />
            </Box>

            <Autocomplete
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
              getOptionLabel={(options) => options.name}
              options={proteineArr}
              onChange={(e, value) => values.proteine = value?.name!}
              renderInput={(params) => <TextField {...params} name='proteine' label="Protéine" />}
            />
            <Autocomplete
              onChange={(e, value) => values.legume = value?.name!}
              getOptionLabel={(options) => options.name}
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '39%' }}
              options={legumeArr}
              renderInput={(params) => <TextField {...params} label="Légume" />}
            />
            <Autocomplete
              onChange={(e, value) => values.feculent = value?.name!}
              getOptionLabel={(options) => options.name}
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '48%' }}
              options={feculentArr}
              renderInput={(params) => <TextField {...params} label="Féculent" />}
            />

            <Button type='submit' sx={{ top: '35rem', left: '47.5%' }} variant="contained">Add</Button>
          </Form>
        }}
      </Formik>

    </div>
  )
}

export default CreateRepas