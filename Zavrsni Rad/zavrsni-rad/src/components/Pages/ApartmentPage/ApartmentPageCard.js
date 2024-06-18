import './ApartmentPage.css';
import { useNavigate } from 'react-router-dom';

const ApartmentPageCard = ({apartment}) => {
    const navigate = useNavigate();
    const GoTo = () => {
        navigate("/apartments/" + apartment.id);
    }
  return (
    <div className='ApartmentPageCard'>
        <div className='wrapper'>
            <div className='ImageDiv' style={{backgroundImage: "url(" + apartment.Slika + ")"}}></div>

            <div className='TextWrapper' style={{width: "59%", marginLeft: "20px"}}>
                <h3 style={{marginBottom: "1rem", fontSize: "24px", fontWeight: "600"}}>{apartment.Name}</h3>
                <p style={{marginBottom: "1.5rem", fontSize: "16px", backgroundColor: "var(--darkGreen)", width: "160px", padding: "5px 0", borderRadius: "6px", textAlign: "center", color: "white"}}>Besplatni prijevoz</p>
                <p>{apartment.Description}</p>
            </div>

            <div className='TextWrapper'>
                <h3 style={{textAlign: "right", fontSize: "22px", fontWeight: "600"}}>{apartment.Grad}</h3>
                <h3 style={{marginTop: "135px", fontWeight: "500", fontSize: "24px", marginBottom: "10px", textAlign: "right"}}>{apartment.Price}€</h3>
                <button onClick={GoTo}>Rezerviraj</button>
            </div>
        </div>
    </div>
  )
}

export default ApartmentPageCard
