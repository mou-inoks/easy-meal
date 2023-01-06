import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



interface InterfaceType {
  id: number,
  type: string
}

const LoginForm = () => {

  const [showPassword, setShowPassword] = React.useState(false);

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
    name: Yup.string()
      .max(100, 'Must be 100 characters or less you stupid')
      .min(3, 'Be serious please :|')
      .required('Mandatory'),
    type: Yup.string().required('Mandatory'),
    typeId: Yup.string().required('Mandatory')

  })

  return (
    <div>
      <Typography sx={{ fontWeight: 800, fontFamily: 'Gilroy,sans-serif', fontSize: '60px', color: '#001e3c' }} className='h1'>Login</Typography>
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
        }}
      >
        {({ values, errors, touched }) => {

          return <Form>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  onChange={(e) => values.userName = e.target.value}
                  name='userName'
                  sx={{ width: '40px', position: 'absolute', left: '71.5%', top: '30%', color: 'white' }}
                  required
                  id="outlined-required"
                  label="Username"
                />
              </div>
              <div>
              <FormControl sx={{ m: 1, width: '25ch', position: 'absolute', left: '71.5%', top: '40%', color: 'white' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
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
                  label="Password"
                />
              </FormControl>
              </div>

              
            </Box>

            <Button onClick={() => {
              console.log("hello")
              if (values.password == '1234' && values.userName == 'salim')
                navigate('/aliments')
              else
                console.log("not existing ")

            }} sx={{ top: '30rem', left: '45%' }} variant="contained">Connect</Button>

            <p style={{
              color: 'black',
              fontFamily: 'Gilroy,sans-serif',
              position: 'relative',
              top: '53rem',
              left: '44%',
              width: '140px'
            }}>
              Made by Salim❤️
            </p>
          </Form>
        }}

      </Formik>
    </div>
  )
}

export default LoginForm