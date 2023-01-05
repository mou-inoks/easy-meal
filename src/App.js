import Navbar from './Components/Navbar'
import MainPage from './Pages/MainPage';
import {Routes, Route} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import CreateAliment from './Pages/CreateAliment';
import Meals from './Pages/Meals';
import CreateRepas from './Pages/CreateRepas'
import UserLogin from './Pages/UserLogin';

const App = () => {
  return (
    <>
      <Grid>
        <Grid item xs={12} />
        <Routes>
          <Route path='/' element={<UserLogin/>}/>
          <Route path='/aliments' element={<MainPage/>}/>
          <Route path='/create-aliment' element={<CreateAliment/>}/>
          <Route path='/create-repas' element={<CreateRepas/>}/>
          <Route path='/meals' element={<Meals/>}/>
        </Routes>
      </Grid>
    </>
  );
}

export default App;
