import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const columns: GridColDef[] = [
 {
  field: 'name',
  headerName: 'Nom',
  width: 150,
  editable: true,
 },
 {
  field: 'ingrédients',
  headerName: 'Ingrédients',
  width: 500,
  editable: true,
 },
];

const ListOfIngredients = () => {

 const [repas, setRepas] = useState([])

 const [isDisabled, setDisabled] = useState(true)

 const [arrData, setArrData] = useState<number[]>([])

 const FetchGetRepasList = () => {
  axios.get('https://localhost:7185/api/Aliments/Repas').then(res => {
   console.log(res)
   setRepas(res.data)
  }).catch(err => {
   console.log(err)
  })
 }

 const FetchDeleteRepas = (id: number) => {
  fetch('https://localhost:7185/api/Aliments/Repas/' + id, {
   method: 'DELETE'
  }).then(r => {
   FetchGetRepasList()
  })
 }

 useEffect(() => {
  FetchGetRepasList()
 }, [])

 return (<>
  <Box sx={{ height: 400, width: '40%', alignSelf: 'center', position: 'relative', left: '40%', top: '50%' }}>
   <DataGrid
    components={{Toolbar: GridToolbar}}
    sx={{ height: '100%', width: '100%' }}
    rows={repas}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    onSelectionModelChange={(d) => {
     if (d.length > 0)
      setDisabled(false)
     d.map((e) => arrData.push(Number(e)))
     if (d.length <= 0)
      setDisabled(true)
    }}
    checkboxSelection
   />
  </Box>

  <Button
   sx={{ top: '15rem', left: '68%' }}
   variant="contained"
   onClick={() => {
    arrData.map(async (e) => {
     console.log('https://localhost:7185/api/Aliments/Repas/' + e)
     FetchDeleteRepas(e)
    })
   }}
   disabled={isDisabled}
  >
   Delete
  </Button>

  <Button sx={{ top: '15rem', left: '70%' }} variant="contained"><Link style={{ textDecoration: 'none', color: 'white' }} to={'/CreateRepas'}>Add</Link></Button>
 </>

 );
}

export default ListOfIngredients
