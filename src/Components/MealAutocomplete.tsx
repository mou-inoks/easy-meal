import React from 'react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';


interface Aliments {
 id: number;
 name: string;
 typeId: string;
}

interface FormikMealAutocompleteProps {
 arr: Aliments[],
 aliment: Aliments
}

const MealsAutocomplete = (props: FormikMealAutocompleteProps, ) => {
 return (
  <>
   <Autocomplete
    onChange={(e, value) => props.aliment.typeId = value?.typeId!}
    getOptionLabel={(options) => options.typeId}
    sx={{ width: 240, position: 'absolute', left: '43.5%', top: '30%' }}
    options={props.arr}
    renderInput={(params) => <TextField {...params} label="Type" />}
   />
  </>
 )
}

export default MealsAutocomplete;