import { Autocomplete, Box, Button, createFilterOptions, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, FormikHelpers, Form} from 'formik'

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

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: InterfaceAliment) => option.typeId,
});

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
      <Formik
        initialValues={{
          name: '',
          proteine: '',
          legume: '',
          feculent: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          const ingredients = values?.proteine + ", " + values?.feculent + ", " + values?.legume

          console.log(ingredients)
          const data = { name: values.name, ingredients: ingredients };

          fetch('https://localhost:7185/api/Aliments/Repas', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
              setSubmitting(false)
              alert("Ingredient as been added")
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }}
      >
        <Form>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                name='Nom'
                sx={{ position: 'absolute', left: '43%', top: '20%' }}
                required
                id="outlined-required"
                label="Nom"
              />
            </div>
          </Box>
          <Autocomplete
            sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
            filterOptions={filterOptions}
            options={proteineArr}
            getOptionLabel={(options) => options.name}
            onChange={(e, value) => value?.name}
            renderInput={(params) => <TextField {...params} label="Protéine" />}
          />
          <Autocomplete
            filterOptions={filterOptions}
            onChange={(e, value) => value?.name}
            getOptionLabel={(options) => options.name}
            sx={{ width: 240, position: 'absolute', left: '43.5%', top: '39%' }}
            options={legumeArr}
            renderInput={(params) => <TextField {...params} label="Légume" />}
          />
          <Autocomplete
            filterOptions={filterOptions}
            getOptionLabel={(options) => options.name}
            onChange={(e, value) => value?.name}
            sx={{ width: 240, position: 'absolute', left: '43.5%', top: '48%' }}
            options={feculentArr}
            renderInput={(params) => <TextField {...params} label="Féculents" />}
          />

          <Button type='submit' sx={{ top: '35rem', left: '47.5%' }} variant="contained">Add</Button>
        </Form>
      </Formik>
       
    </div>
  )
}

export default CreateRepas