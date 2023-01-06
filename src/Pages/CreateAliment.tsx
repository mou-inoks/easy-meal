import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from '../Components/Navbar'

interface InterfaceType {
  id: number,
  type: string
}

interface Values {
  name: string,
  typeId: string,
}


const CreateAliment = () => {

  const [typeArr, setTypeArr] = useState<InterfaceType[]>([])

  console.log(typeArr)
  const FetchGetAllType = () => {
    axios.get('https://localhost:7185/api/Aliments/Type').then(res => {
      console.log(res)
      setTypeArr(res.data)
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    FetchGetAllType()
  }, [])

  return (
    <div>
      <Navbar/>
      <Typography sx={{fontWeight: 800,fontFamily: 'Gilroy,sans-serif', fontSize: '60px' }} className='h1'>Créer un aliment</Typography>
      <Formik
        initialValues={{
          name: '',
          typeId: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          axios.post('https://localhost:7185/api/Aliments', {
            name: values.name,
            typeId: values.typeId
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
              <div>
                <TextField
                  onChange={handleChange}
                  name='name'
                  sx={{ position: 'absolute', left: '43%', top: '20%' }}
                  required
                  id="outlined-required"
                  label="Nom"
                />
              </div>
            </Box>
            <Autocomplete
              onChange={(e, v) => values.typeId = v?.type!}
              getOptionLabel={(options) => options.type}
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
              options={typeArr}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
            <Button type='submit' sx={{ top: '20rem', left: '47.5%' }} variant="contained">Ajouter</Button>
          </Form>
        }}

      </Formik>
    </div>
  )
}

export default CreateAliment