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

    const [nameError, setNameError] = useState(false)
    const [typeError, setTypeError] = useState(false)
    const [typeArr, setTypeArr] = useState<InterfaceType[]>([])

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Bro... Focus')
            .max(50, 'Must be 100 characters or less you stupid')
            .required('Required'),
        typeId: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

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
        validationSchema={SignupSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          axios.post('https://localhost:7185/api/Aliments', {
            name: values.name,
            typeId: values.typeId
          })
            .then(function (response) {
              alert("Aliment as been added")
              setSubmitting(true)
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {({ values, handleChange, touched,errors }) => {
            if(errors.name)
                setNameError(true)
            if(errors.typeId)
                setTypeError(true)
          return <Form>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: 240 },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  onChange={handleChange}
                  name='name'
                  sx={{ position: 'absolute', left: '43%', top: '30%' }}
                  required
                  id="outlined-required"
                  label="Nom"
                  error={nameError}
                  onClick={() => setNameError(false)}
                  onError={() => setNameError(true)}
                />
                  {errors.name && touched.name ? (
                      <div style={{position: 'relative', left:'44%', top: '28vh', color:"#d32f2f"}} >{errors.name}</div>
                  ) : null}
              </div>
            </Box>

            <Autocomplete
              onChange={(e, v) => values.typeId = v?.type!}
              getOptionLabel={(options) => options.type}
              onClick={() => setTypeError(false)}
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '42%' }}
              options={typeArr}
              onError={() => setTypeError(true)}
              renderInput={(params) => <TextField error={typeError} onClick={() => setTypeError(false)} {...params} label="Type" />}
            />
              {errors.typeId && touched.typeId ? (
                  <div style={{position: 'relative', left:'44%', top: '36vh', color:"#d32f2f"}}>{errors.typeId}</div>
              ) : null}
            <Button type='submit' sx={{ top: '25rem', left: '47.5%' }} variant="contained">Ajouter</Button>
          </Form>
        }}

      </Formik>
    </div>
  )
}

export default CreateAliment