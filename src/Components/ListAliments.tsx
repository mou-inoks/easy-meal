import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 90 },
  {
    field: 'name',
    headerName: 'Aliments',
    width: 150,
    editable: true,
  },
  {
    field: 'typeId',
    headerName: 'Type',
    width: 110,
    editable: true,
  },
 
];

const ListOfIngredients = () =>  {

const [aliments, setAliments] = useState([])

  useEffect(() => {
    axios.get('https://localhost:7185/api/Aliments').then(res => {
      console.log(res)
      setAliments(res.data)
    }).catch(err => {
      console.log(err)
    })
  })

  return (
    <Box sx={{ height: 400, width: '40%',alignSelf: 'center', position: 'relative', left: '40%', top: '50%' }}>
      <DataGrid
        rows={aliments}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default ListOfIngredients
