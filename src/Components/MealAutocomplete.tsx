import React from 'react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';


interface Aliments {
 name: string;
 typeId: string;
}

interface FormikMealAutocompleteProps {
 arr: Aliments[],
 aliment: string
}

const MealsAutocomplete = (props: FormikMealAutocompleteProps) => {
 return (
  <Autocomplete
   onChange={(e, value) => props.aliment = value?.name!}
   getOptionLabel={(options) => options.name}
   sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
   options={props.arr}
   renderInput={(params) => <TextField {...params} label="Proteine" />}
  />
 )
}

export default MealsAutocomplete;