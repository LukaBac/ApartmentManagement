import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ApartmentDetails from './components/ApartmentDetails/ApartmentDetails';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ApartmentPage from './components/Pages/ApartmentPage/ApartmentPage';
import Aktivnosti from './components/Pages/Aktivnosti/Aktivnosti';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/apartments/:id" element={<ApartmentDetails />} />
      <Route path="/apartments" element={<ApartmentPage />}></Route>
      <Route path="/aktivnosti" element={<Aktivnosti />}></Route>
    </Routes>
    <Footer></Footer>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
