import { useNavigate } from 'react-router-dom';

const ApartmentCardSecondary = ({apartment}) => {
  const navigate = useNavigate();
  const GoTo = () => {
    navigate("/apartments/" + apartment.id);
  }

  return (
    <div style={{cursor: "pointer"}} className='ApartmentCardSecondary' onClick={GoTo}>
      <div className='ImageDiv' style={{backgroundImage: "url(" + apartment.Slika + ")"}}></div>
      <h3>{apartment.Name}</h3>
      <p style={{marginTop: "1rem"}}>{apartment.Grad}</p>
      <p style={{marginTop: "1rem", fontWeight: "600"}}>Cijene od {apartment.Price}€</p>
      <button>Rezerviraj</button>
    </div>
  )
}

export default ApartmentCardSecondary
