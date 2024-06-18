import './Apartments.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import firestore from '../../firebase';
import ApartmentCardMain from './ApartmentCardMain';
import { useNavigate } from 'react-router';

const Apartments = () => {

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const query = await getDocs(collection(firestore, "Apartments"));
        const apartmentsList = query.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApartments(apartmentsList);
        setLoading(false);
      } catch (e) {
        console.error("Greška u dohvaćanju dokumenata: ", e);
      }
    };

    fetchApartments();
  }, []);

  const goTo = () =>{
    navigate("apartman-dodaj");
  }

  return (
    <div className='ApartmentSection Spacer'>
      <div className='SectionTop'>
        <h2>Vaši Apartmani:</h2>
      </div>
      <div className='SectionMain'>
        <div className='ApartmentCards'>
          {apartments.map(apartment => (
            <ApartmentCardMain Apartment={apartment}></ApartmentCardMain>  
          ))}
        <button onClick={goTo} className='CreateButton'>KREIRAJ NOVI APARTMAN</button>
        </div>
      </div>
    </div>
  )
}

export default Apartments
