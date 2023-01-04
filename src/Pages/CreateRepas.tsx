import { Autocomplete, Box, Button, createFilterOptions, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Field } from "formik";


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

const SignupSchema = Yup.object().shape({
 firstName: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
 lastName: Yup.string()
   .min(2, 'Too Short!')
   .max(50, 'Too Long!')
   .required('Required'),
 email: Yup.string().email('Invalid email').required('Required'),
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
     feculent: '',
    }}
    onSubmit={(
     values: Values,
     { setSubmitting }: FormikHelpers<Values>
    ) => {

     const ingredients = values.proteine + ", " + values.feculent + ", " + values.legume

     const data = { name: values.name, ingrédients: ingredients };

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
       alert("Ingredient as been added")
       setSubmitting(true)
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
      getOptionLabel={(options) => options.name}
      options={proteineArr}
      onChange={(e, value) => value?.name!}
      renderInput={(params) => <TextField {...params} label="Protéine" />}
     />
     <Autocomplete
      onChange={(e, value) => value?.name!}
      filterOptions={filterOptions}
      getOptionLabel={(options) => options.name}
      sx={{ width: 240, position: 'absolute', left: '43.5%', top: '39%' }}
      options={legumeArr}
      renderInput={(params) => <TextField {...params} label="Légume" />}
     />
     <Autocomplete
      onChange={(e, value) => value?.name!}
      filterOptions={filterOptions}
      getOptionLabel={(options) => options.name}
      sx={{ width: 240, position: 'absolute', left: '43.5%', top: '48%' }}
      options={feculentArr}
      renderInput={(params) => <TextField {...params} label="Féculent" />}
     />

     <Button type='submit' sx={{ top: '35rem', left: '47.5%' }} variant="contained">Add</Button>

    </Form>
   </Formik>

  </div>
 )
}

export default CreateRepas