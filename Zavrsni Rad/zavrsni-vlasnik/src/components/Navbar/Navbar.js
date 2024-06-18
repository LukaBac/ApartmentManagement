import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('Početna Stranica');
    const changeState = (page) => {
        setCurrentPage(page);
    };

  return (
    <>
    <div className='NavLeft'>
        <div className='LeftNavLinks'>
            <Link to={"/"} className='LinkStyle' onClick={() => changeState("Početna Stranica")}><h2 style={{ color: "#f0f2f5" }}>B</h2></Link>
            <Link to={"/apartmani"} className='LinkStyle' onClick={() => changeState("Apartmani")}>
                <div className='NavLink'>
                    <FontAwesomeIcon className='NavIcon' icon={"house-chimney"}></FontAwesomeIcon>
                    <p>Apartmani</p>
                </div>
            </Link>
            <Link to={"/rezervacije"} className='LinkStyle' onClick={() => changeState("Rezervacije")}>
                <div className='NavLink'>
                    <FontAwesomeIcon className='NavIcon' icon={"book-open"}></FontAwesomeIcon>
                    <p>Rezervacije</p>
                </div>
            </Link>
            <Link to={"/gosti"} className='LinkStyle' onClick={() => changeState("Gosti")}>
                <div className='NavLink'>
                    <FontAwesomeIcon className='NavIcon' icon={"user"}></FontAwesomeIcon>
                    <p>Gosti</p>
                </div>
            </Link>
            <Link to={"/zarada"} className='LinkStyle' onClick={() => changeState("Zarada")}>
                <div className='NavLink'>
                    <FontAwesomeIcon className='NavIcon' icon={"chart-line"}></FontAwesomeIcon>
                    <p>Zarada</p>
                </div>
            </Link>
        </div>
    </div>

    <div className='NavTop'>
        {currentPage && (
            <h2 style={{ color: "white" }}>{currentPage}</h2>
        )}
    </div>
    </>
  )
}

export default Navbar
