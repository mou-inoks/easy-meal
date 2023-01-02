import Navbar from './Components/Navbar'
import MainPage from './Pages/MainPage';
import {Routes, Route} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import CreateAliment from './Pages/CreateAliment';
import Meals from './Pages/Meals';

const App = () => {
  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} />
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/Aliments' element={<MainPage/>}/>
          <Route path='/CreateAliment' element={<CreateAliment/>}/>
          <Route path='/Meals' element={<Meals/>}/>
        </Routes>
      </Grid>
    </>
  );
}

export default App;
