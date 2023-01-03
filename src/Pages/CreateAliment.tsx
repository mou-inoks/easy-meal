import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface InterfaceType {
  id: number;
  type: string
}

const CreateAliment = () => {

  const [name, setName] = useState('')

  const [TypeId, setTypeId] = useState<string | null>('')

  const [nameError, setNameError] = useState(false)

  const [TypeError, setTypeError] = useState(false)

  const [errorMessage1, setErrorMessage1] = useState('')

  const [errorMessage2, setErrorMessage2] = useState('')

  const [typeArr, setTypeArr] = useState<InterfaceType[]>([])

  const valueError = 'Field is mandatory'

  const numberError = 'Please enter a proper ingredient'

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
  console.log("type arr", typeArr)

  const onSubmit = async () => {
    if ((name === null || name === "") && (TypeId === null || TypeId === "")) {
      if (name.search(/\d/) !== -1)
        setErrorMessage1(numberError)
      else if (TypeId?.search(/\d/) !== -1)
        setErrorMessage2(numberError)
      else {
        setErrorMessage1(valueError)
        setErrorMessage2(valueError)
      }
      setTypeError(true)
    }
    if (name.search(/\d/) !== -1) {
      setErrorMessage1(numberError)
      setNameError(true)
    }
    if (TypeId?.search(/\d/) !== -1) {
      setErrorMessage2(numberError)
      setTypeError(true)
    }
    if (name === null || name === "") {
      setErrorMessage1(valueError)
      setNameError(true)
    }
    if (TypeId === null || TypeId === "") {
      setTypeError(true);
      setErrorMessage2(valueError)
    }

    else {
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
          alert("Ingredient as been added")
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  console.log(TypeId)
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
          onChange={(e, value) => setTypeId(value)}
          sx={{ width: 240,position: 'absolute', left: '43.5%', top: '30%' }}
          options={typeArr.map((e) => {
            return e.type
          })}
          renderInput={(params) => <TextField {...params} label="Type" />}
        />
        <Button onClick={onSubmit} sx={{ top: '23rem', left: '48%' }} variant="contained">Add</Button>
      </form>


    </>
  )
}

export default CreateAliment