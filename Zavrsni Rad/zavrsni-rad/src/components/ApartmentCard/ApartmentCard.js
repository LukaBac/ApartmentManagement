import './ApartmentCard.css';
import { useNavigate } from 'react-router-dom';

const ApartmentCard = ({Apartment}) => {

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/apartments/${Apartment.id}`);
  }
  
  return (
    <div className='ApartmentCard'>
      <div className='Image' onClick={navigateTo} style={{backgroundImage: `url(${Apartment.Slika})`, cursor: "pointer"}}></div>
        <h3>{Apartment.Name}</h3>
        <p>{Apartment.Grad}</p>
        <p className='ApartmentDescription'>{Apartment.Description}</p>
        <p className='ApartmentPrices'>Prices From {Apartment.Price}$</p>
        <button>Pročitaj Više</button>
    </div>
  )
}

export default ApartmentCard
