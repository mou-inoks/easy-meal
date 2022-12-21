import React from 'react'
import '../App.css'
import Diet from '../Img/diet.svg'

function MainPage() {
 return (
   <div className='MainPage'>
    <h1>EasyMeal</h1>
    <img className='imgAccueil' src={Diet} alt="co workers"/>
   </div>
 );
}

export default MainPage;
