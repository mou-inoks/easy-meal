import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 90 },
  {
    field: 'Name',
    headerName: 'Aliments',
    width: 150,
    editable: true,
  },
  {
    field: 'Type',
    headerName: 'Type',
    width: 110,
    editable: true,
  },
 
];

const rows = [
  { id: 1, Name: 'Blanc de poulet', Type: 'Viande' },
  { id: 2, Name: 'Dinde', Type: 'Viande'},
  { id: 3, Name: 'Steak de boeuf', Type:'Viande' },
  { id: 4, Name: 'Steak de porc', Type: 'Viande' },
  { id: 5, Name: 'Viande hachée', Type: 'Viande' },
  { id: 6, Name: 'Haricot vert', Type:'Légume'},
  { id: 7, Name: 'Haricot rouges', Type:'Légume'},
  { id: 8, Name: 'Pomme de terre', Type: 'Féculent' },
  { id: 9, Name: 'Pâte', Type: 'Féculent' },
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '20%',alignSelf: 'center', position: 'relative', left: '50%', top: '50%' }}>
      <DataGrid
        rows={rows}
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
