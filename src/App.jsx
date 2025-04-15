import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidemenu from './components/Sidemenu';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AddReservation from './components/AddReservation';
import ListReservations from './components/ListReservations';


  function App() {
    return (
        <Router>
            <div className="container">
            <Navbar></Navbar>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<NotFound/>} />
                <Route path="/reservas/add" element={<AddReservation/>} />
                <Route path="/reservas/edit/:id" element={<AddReservation/>} />
                <Route path="/reservas" element={<ListReservations/>} />
              </Routes>
            </div>
        </Router>
    );
  }
  
  export default App
