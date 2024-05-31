import { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Home, Signup, Signin, Dashboard, Send } from "./pages/index"
import {Navbar } from "./components/index"
import {AuthProvider} from './Hooks/useAuth';

function App() {


  const token = localStorage.getItem("token");

  return(
    <Router>
    <AuthProvider>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/send" element={<Send/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </AuthProvider>
    </Router>
  )
}

export default App
