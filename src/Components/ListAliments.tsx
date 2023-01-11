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
    headerName: 'Aliments',
    width: 200,
    editable: false,
  },
  {
    field: 'typeId',
    headerName: 'Type',
    width: 110,
    editable: false,
  },
];

const ListOfIngredients = () => {

  const [aliments, setAliments] = useState([])

  const [isDisabled, setDisabled] = useState(true)

  const [arrData, setArrData] = useState<number[]>([])

  const FetchGetAlimentsList = () => {
    axios.get('https://localhost:7185/api/Aliments').then(res => {
      console.log(res)
      setAliments(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const FetchDeleteAliment = (id: number) => {
    fetch('https://localhost:7185/api/Aliments/' + id, {
      method: 'DELETE'
    }).then(r => {
      FetchGetAlimentsList()
    })
  }

  useEffect(() => {
    FetchGetAlimentsList()
  }, [])

  return (<>
    <Box sx={{ height: 400, width: '40%', alignSelf: 'center', position: 'relative', left: '40%', top: '30%' }}>
      <DataGrid
        components={{Toolbar: GridToolbar}}
        sx={{ height: '100%', width: '100%' }}
        rows={aliments}
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
      sx={{ top: '10rem', left: '59%' }}
      variant="contained"
      onClick={() => {
        arrData.map(async (e) => {
          console.log('https://localhost:7185/api/Aliments/' + e)
          FetchDeleteAliment(e)
        })
      }}
      disabled={isDisabled}
    >
      Supprimer
    </Button>
    <Button sx={{ top: '10rem',  left: '60%' }} variant="contained"><Link style={{ textDecoration: 'none', color: 'white' }} to={'/create-aliment'}>Ajouter</Link></Button>
  </>

  );
}

export default ListOfIngredients
