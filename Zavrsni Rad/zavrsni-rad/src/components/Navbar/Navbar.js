import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (city) queryParams.append('city', city);
    if (budget) queryParams.append('budget', budget);
    navigate(`/apartments?${queryParams.toString()}`);
  };

  return (
    <div className={`Navbar ${!(location.pathname === "/") ? "Hide" : ""}`}>
      <div id='NavTop'>
        <Link to={"/"} style={{ color: "white", textDecoration: "none" }}><h2>Apartmani</h2></Link>
      </div>
      <div className='NavLinks'>
        <Link to={"/"} className={`NavbarLinkComponent ${location.pathname === "/" ? "Selected" : ""}`}>
          <div className='NavLink'>
            <FontAwesomeIcon icon={"house-chimney"} />
            <p>Početna stranica</p>
          </div>
        </Link>
        <Link to={"/apartments"} className={`NavbarLinkComponent ${location.pathname === "/apartments" ? "Selected" : ""}`}>
          <div className='NavLink'>
            <FontAwesomeIcon icon={"bed"} />
            <p>Apartmani</p>
          </div>
        </Link>
        <Link to={"/apartments"} className={`NavbarLinkComponent ${location.pathname === "/reservations" ? "Selected" : ""}`}>
          <div className='NavLink'>
            <FontAwesomeIcon icon={"book-open"} />
            <p>Rezervacije</p>
          </div>
        </Link>
        <Link to={"/aktivnosti"} className={`NavbarLinkComponent ${location.pathname === "/aktivnosti" ? "Selected" : ""}`}>
          <div className='NavLink'>
            <FontAwesomeIcon icon={"earth-europe"} />
            <p>Istraži</p>
          </div>
        </Link>
      </div>

      <div className='NavText'>
        <h2>Tražite mjesto za prenoćiti, za putovati sami ili sa obitelji?</h2>
        <p>Pogledajte naš širok asortman apartmana i odaberite savršeno mjesto za vašu avanturu!</p>
      </div>

      <div className='Filter'>
        <input
          style={{ marginLeft: "10px" }}
          type='text'
          placeholder='U koji grad putujete?'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type='text'
          placeholder='Koji je vaš budžet?'
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <button onClick={handleSearch}>Pretraži</button>
      </div>
    </div>
  );
}

export default Navbar;
