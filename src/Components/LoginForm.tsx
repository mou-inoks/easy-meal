import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Simulate} from "react-dom/test-utils";
import touchEnd = Simulate.touchEnd;





const LoginForm = () => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  

  const navigate = useNavigate()


  interface Values {
    userName: string,
    password: string,
  }

  const CreateSchemaValidation = Yup.object().shape({
    userName: Yup.string()
      .max(100, 'Must be 100 characters or less you stupid')
      .min(3, 'Be serious please :|')
      .required('Required'),
    password: Yup.string()
        .required('Required')
        .max(100, 'Must be 100 characters or less you stupid')
        .min(3, 'Be serious please ! ')

  })

  return (
    <div>
      <Typography sx={{ fontWeight: 800, fontFamily: 'Gilroy,sans-serif', fontSize: '60px', color: '#001e3c' }} className='h1'>Connexion</Typography>
      <Formik
        initialValues={{
          userName: '',
          password: ''
        }}
        validationSchema={CreateSchemaValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
            if (values.userName != "salim" && values.password != "1234")
                console.log("not existing")
            else
                navigate('/aliments')
        }}
      >
        {({ values, errors, touched }) => {

          return <Form>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              autoComplete="off"
            >
              <div>
                <TextField
                  onChange={(e) => values.userName = e.target.value}
                  name='userName'
                  sx={{ width: '40px', position: 'absolute', left: '71.5%', top: '30%', color: 'white' }}
                  required
                  id="outlined-required"
                  label="Nom d'utilisateur"
                  onError={() => setUserNameError(true)}
                  error={userNameError}
                />
                  {errors.userName && touched.userName ? (
                      <div style={{position: 'relative', left:'39%', top: '28vh', color:"#d32f2f"}} >{errors.userName}</div>
                  ) : null}
              </div>
              <div>
              <FormControl sx={{ m: 1, width: '25ch', position: 'absolute', left: '71.5%', top: '40%', color: 'white' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                <OutlinedInput
                    error={passwordError}
                    onError={() => setPasswordError(true)}
                    onChange={(e) => values.password = e.target.value}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                  }
                  label="Mot de passe "
                />
              </FormControl>
                  {errors.password && touched.password ? (
                      <div style={{position: 'relative', left:'39%', top: '36vh', color:"#d32f2f"}} >{errors.password}</div>
                  ) : null}
              </div>
            </Box>
            <Button type='submit' sx={{ top: '30rem', left: '45%' }} variant="contained">Connexion</Button>

            <p style={{
              color: 'black',
              fontFamily: 'Gilroy,sans-serif',
              position: 'relative',
              top: '48rem',
              left: '44%',
              width: '160px'
            }}>
              Made with ?????? by Salim
            </p>
          </Form>
        }}

      </Formik>
    </div>
  )
}

export default LoginForm