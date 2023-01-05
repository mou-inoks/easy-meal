import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../Components/Navbar'

interface InterfaceType {
  id: number,
  type: string
}

const CreateAliment = () => {

  const [typeArr, setTypeArr] = useState<InterfaceType[]>([])

  const [errorName, setErrorName] = useState(false)
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

  interface Values {
    name: string,
    typeId: string,
  }

  const CreateSchemaValidation = Yup.object().shape({
    name: Yup.string()
          .max(100, 'Must be 100 characters or less you stupid')
          .min(3, 'Be serious please :|')
          .required('Mandatory'),
          type: Yup.string().required('Mandatory'),
    typeId: Yup.string().required('Mandatory')
        
  })

  return (
    <div>
      <Navbar/>
      <Typography sx={{fontWeight: 800,fontFamily: 'Gilroy,sans-serif', fontSize: '60px' }} className='h1'>Créer un aliment</Typography>
      <Formik
        initialValues={{
          name: '',
          typeId: ''
        }}
        validationSchema={CreateSchemaValidation}
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
        {({ values, errors, touched }) => {

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
                  onChange={(e) => values.name = e.target.value}
                  name='Nom'
                  sx={{ position: 'absolute', left: '43%', top: '20%' }}
                  required
                  id="outlined-required"
                  label="Nom"
                  error={touched.name}
                />
                {errors.name && touched.name && <div style={{color: '#d32f5a',position: 'absolute', left: '43.5%', top: '26%'}}>{errors.name}</div>}
              </div>
            </Box>
            <Autocomplete
              onChange={(e, value) => values.typeId = value?.type!}
              getOptionLabel={(options) => options.type}
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
              options={typeArr}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
            {errors.typeId && touched.typeId && <div style={{color: '#d32f5a',position: 'absolute', left: '43.5%', top: '36%'}}>{errors.typeId}</div>}

            <Button type='submit' sx={{ top: '23rem', left: '48%' }} variant="contained">Add</Button>

          </Form>
        }}

      </Formik>
    </div>
  )
}

export default CreateAliment