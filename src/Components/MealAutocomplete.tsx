import React from 'react'
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';


interface Aliments {
 name: string;
 typeId: string;
}

interface FormikMealAutocompleteProps {
 arr: Aliments[],
 aliment: string,
 label: string
}

const MealsAutocomplete = (props: FormikMealAutocompleteProps) => {
 const nArr: Aliments[] = []
 props.arr.map((e) => {
  if(e.typeId == props.label)
   nArr.push(e)
 })
 const formikProps = useFormikContext()
 return (
  <Autocomplete
   onChange={(e, v) => formikProps.setFieldValue(props.aliment ,v)}
   getOptionLabel={(options) => options.name}
   sx={{ width: 240}}
   options={nArr}
   renderInput={(params) => <TextField {...params} label={props.label} />}
  />
 )
}

export default MealsAutocomplete;