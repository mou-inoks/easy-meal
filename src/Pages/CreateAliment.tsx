import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form"


export interface Aliment {
 name: string,
 TypeId: number,
}


const CreateAliment = () => {

 const [name, setName] = useState('')

 const [TypeId, setTypeId] = useState('')

 const onSubmit = async () => {

  const data = { name: name, typeId: TypeId };

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
  })
  .catch((error) => {
    console.error('Error:', error);
  });

 } 


 return (
  <>
   <Typography className='h1'>Listes d'Aliments</Typography>
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
       onChange={(e) => setName(e.target.value)}
       name='Nom'
       sx={{ position: 'absolute', left: '43%', top: '20%' }}
       required
       error={false}
       id="outlined-required"
       label="Nom"
      />
     </div>
    </Box>

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
       value={TypeId}
       onChange={(e) => setTypeId(e.target.value)}
       name='TypeId'
       sx={{ position: 'absolute', left: '43%', top: '30%' }}
       required
       id="outlined-required"
       label="Type"
       error={false}
      />
     </div>
    </Box>
    <Button type='submit' onClick={onSubmit} sx={{ top: '23rem', left: '48%' }} variant="contained">Add</Button>
   </form>


  </>
 )
}

export default CreateAliment