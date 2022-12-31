import Navbar from './Components/Navbar'
import MainPage from './Pages/MainPage';
import Grid from '@mui/material/Grid';

const App = () => {
  return (
    <>
      <Grid>
        
        <Grid item xs={12}>
          <Navbar />
        </Grid>

        <Grid item xs={12} />

        <Grid item xs={12}>
          <MainPage />
        </Grid>

      </Grid>
    </>
  );
}

export default App;
