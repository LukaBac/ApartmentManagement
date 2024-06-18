import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './Dashboard';
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ApartmentDetails from './components/ApartmentDetails/ApartmentDetails';
import Apartments from './components/Apartments/Apartments';
import Reservations from './components/Reservations/Reservations';
import Gosti from './components/Gosti/Gosti';
import DodajApartman from './components/DodajApartman/DodajApartman';
import UrediApartman from './components/UrediApartman/UrediApartman';
import Zarada from './components/Zarada/Zarada';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path='/apartmani' element={<Apartments></Apartments>}></Route>
      <Route path="/apartmani/:id" element={<ApartmentDetails />} />
      <Route path='/rezervacije' element={<Reservations></Reservations>}></Route>
      <Route path='/gosti' element={<Gosti></Gosti>}></Route>
      <Route path='/apartmani/apartman-dodaj' element={<DodajApartman></DodajApartman>}></Route>
      <Route path='/apartmani/apartman-uredi/:id' element={<UrediApartman></UrediApartman>}></Route>
      <Route path='/zarada' element={<Zarada></Zarada>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
