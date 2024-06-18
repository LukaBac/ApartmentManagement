import './ApartmentCard.css';
import { useNavigate } from 'react-router-dom';

const ApartmentCardMain = ({Apartment}) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/apartments/${Apartment.id}`);
  }
  return (
    <div onClick={navigateTo} className='ApartmentCardMain'>
      <div className="ApartmentCardMainImage" style={{backgroundImage: "url(" + Apartment.Slika + ")"}}>
        <h2>{Apartment.Name}</h2>
        <p>{Apartment.Grad}</p>
      </div>
    </div>
  )
}

export default ApartmentCardMain
