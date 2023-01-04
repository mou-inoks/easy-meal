import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { Field, Formik, FormikHelpers, Form } from 'formik';
interface InterfaceType {
  id: number,
  type: string
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

  interface Values {
    name: string,
    type: string,
  }

  return (
    <div>
      <Typography>Hello</Typography>
      <Formik
        initialValues={{
          name: '',
          type: ''
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          
          axios.post('https://localhost:7185/api/Aliments', {
            name: values.name,
            typeId: values.type
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
              <div>
                <TextField
                  onChange={(e) => values.name = e.target.value}
                  name='Nom'
                  sx={{ position: 'absolute', left: '43%', top: '20%' }}
                  required
                  id="outlined-required"
                  label="Nom"
                />
              </div>
            </Box>
            <Autocomplete
              onChange={(e, value) => values.type = value?.type!}
              getOptionLabel={(options) => options.type}
              sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
              options={typeArr}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
            <Button type='submit' sx={{ top: '23rem', left: '48%' }} variant="contained">Add</Button>

          </Form>
        }}

      </Formik>
    </div>
  )
}

export default CreateAliment