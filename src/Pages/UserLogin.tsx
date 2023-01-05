import { Typography } from '@mui/material'
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

export default function UserLogin() {

 const handleDone = () => {
  console.log(`Done after 5 loops!`)
 }
 return (<>
  <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'row' }}>
   <div style={{ width: '55%', height: '100vh', backgroundColor: '#001e3c', display: 'flex' }}>
    <Typography sx={{ fontWeight: 800, fontFamily: 'Gilroy,sans-serif', fontSize: '60px', color: '#fff', width: '30rem' }}>Welcome To Easy Meal</Typography>
    <span style={{ fontWeight: 500, fontFamily: 'Gilroy,sans-serif', fontSize: '30px', color: '#fff' }}>
          <Typewriter
            words={['Fast', 'Simple', ]}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleDone}
          />
        </span>
   </div>
   <div style={{ width: '45%', height: '100vh', backgroundColor: '#0a1929' }}>
   </div>
  </div>


 </>
 )
}
