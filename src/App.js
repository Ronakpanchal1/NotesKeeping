import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NotesState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';

export default function App() {

 const [alert ,setAlert]= useState(null)

 const showAlert = (messageType, message)=>{

  setAlert({ msgType: messageType, msg: message })

  setTimeout(()=>{
    setAlert(null)
  },2000)

 }
 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
           <Alert alert={alert}/>
          <div className='container my-2'>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path='/about' element={<About/>}></Route>
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}
