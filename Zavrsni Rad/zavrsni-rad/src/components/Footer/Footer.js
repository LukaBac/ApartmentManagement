import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footerSection'>
      <div className='footerLink__Container'>
      <div className='footerLinks'>
          <h2>Poveznice</h2>
          <p className='FooterLink'>Polazna Stranica</p>
          <p className='FooterLink'>Apartmani</p>
          <p className='FooterLink'>Više Informacija</p>
          <h1>Apartmani</h1>
        </div>

        <div className='footerLinks'>
          <h2>Rezervacije</h2>
          <Link className='FooterLink' to={"WebDev"}><p>Rezerviraj</p></Link>
          <Link className='FooterLink'><p>Pošaljite nam E-Mail</p></Link>
          <Link className='FooterLink'><p>Nazovite nas: </p></Link>
          
        </div>

        <div className='footerLinks'>
          <h2>Kontakti</h2>
          <p className='FooterLink'>About Us</p>
          <p className='FooterLink'>Our services</p>
          <p className='FooterLink'>Contact</p>
        </div>
      </div>

      
    </div>
  )
}

export default Footer
