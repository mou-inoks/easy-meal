import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface InterfaceAliment {
 id: number;
 name: string;
 typeId: string;
}

const CreateAliment = () => {

 let ingredients = ""

 const [name, setName] = useState('')

 let [proteine, setProteine] = useState<string | null>("")

 const [feculents, setFeculents] = useState<string | null>('')

 const [legume, setLegume] = useState<string | null>('')

 const [nameError, setNameError] = useState(false)

 const [TypeError, setTypeError] = useState(false)

 const [errorMessage1, setErrorMessage1] = useState('')

 const [errorMessage2, setErrorMessage2] = useState('')

 const [alimArr, setAlimArr] = useState<InterfaceAliment[]>([])

 const valueError = 'Field is mandatory'

 const numberError = 'Please enter a proper ingredient'

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
 console.log("type arr", alimArr)

 const onSubmit = async () => {
  ingredients = proteine + ", " + feculents + ", " + legume

  const data = { name: name, ingredients: ingredients };

  fetch('https://localhost:7185/api/Aliments', {
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
   })
   .catch((error) => {
    console.error('Error:', error);
   });
 }
 console.log(ingredients)
 return (
  <>
   <Typography className='h1'>Créer un repas</Typography>
   <form >
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
       value={name}
       onClick={() => setNameError(false)}
       onChange={(e) => setName(e.target.value)}
       name='Nom'
       sx={{ position: 'absolute', left: '43%', top: '20%' }}
       required
       helperText={errorMessage1}
       error={nameError}
       id="outlined-required"
       label="Nom"
      />
     </div>
    </Box>

    <Autocomplete
     sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
     options={alimArr.map((e) => {
        if(e.typeId == 'Protéines')
         return e.name
     })}
     onChange={(e,value) => setProteine(value)}
     renderInput={(params) => <TextField {...params} label="Protéine" />}
    />
    <Autocomplete
     onChange={(e, value) => setFeculents(value)}
     sx={{ width: 240, position: 'absolute', left: '43.5%', top: '39%' }}
     options={alimArr.map((e) => {
       return e.name

     })}
     renderInput={(params) => <TextField {...params} label="Légume" />}
    />
    <Autocomplete
     onChange={(e, value) => setLegume(value)}
     sx={{ width: 240, position: 'absolute', left: '43.5%', top: '48%' }}
     options={alimArr.map((e) => {
       return e.name
     })}
     renderInput={(params) => <TextField {...params} label="Féculents" />}
    />
    <Button onClick={onSubmit} sx={{ top: '35rem', left: '47.5%' }} variant="contained">Add</Button>
   </form>


  </>
 )
}

export default CreateAliment