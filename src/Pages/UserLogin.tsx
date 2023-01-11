import { Typography } from '@mui/material'
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import LoginForm from '../Components/LoginForm'
import '../css/animation.css'

const h1style = {
 lineHeight: '120px',
 margin:'1px',
 fontWeight: 800,
 fontFamily: 'Gilroy,sans-serif',
 fontSize: '120px',
 color: '#fff',
 width: '70vh',
 height: '30px',
 top: '20%',
 position: 'relative',
 left:'20%'
}

export default function UserLogin() {

 const handleDone = () => {
  console.log(`Done after 5 loops!`)
 }

 return (<>
  <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'row' }}>
   <div style={{ width: '55%', height: '100vh', backgroundColor: '#001e3c', display: 'flex' }}>
    <Typography sx={h1style}>Bienvenu sur Easy Meal</Typography>
    <p style={{
     fontWeight: 600,
     fontFamily: 'Gilroy,sans-serif',
     fontSize: '30px',
     color: '#66b2ff',
     top: '70%',
     height: '20px',
     position:'relative',
     right:'50%',
     width: '2500px'
    }}>Une application
    </p>

    <span style={{
     fontWeight: 600,
     fontFamily: 'Gilroy,sans-serif',
     fontSize: '30px',
     color: '#66b2ff',
     top: '70%',
     height: '20px',
     position:'relative',
     right:'40%',
     width:'7rem'
    }}>
     <Typewriter
      words={['rapide', 'simple','pratique','cool :)']}
      loop={5}
      cursor
      cursorStyle='|'
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1000}
      onLoopDone={handleDone}
     />
    </span>
   </div>
   <div style={{ width: '45%', height: '100vh',  backgroundColor: '#f1f4f8' }}>
    <LoginForm/>
   </div>
  </div>


 </>
 )
}
