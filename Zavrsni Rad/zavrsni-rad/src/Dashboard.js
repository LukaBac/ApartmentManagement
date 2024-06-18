import Navbar from "./components/Navbar/Navbar"

import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import firestore from "./firebase";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBed, faHouseChimney, faBookOpen, faEarthEurope } from '@fortawesome/free-solid-svg-icons';
import ApartmentCardMain from "./components/ApartmentCard/ApartmentCardMain";
import ApartmentCardSecondary from "./components/ApartmentCard/ApartmentCardSecondary";


library.add(faBed, faHouseChimney, faBookOpen, faEarthEurope);


const Dashboard = () => {

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Apartments"));
        const apartmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApartments(apartmentsList);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchApartments();
  }, []);

  return (
    <>
      <div className="CardContainer">
  {loading ? ( 
    <p>Loading...</p>
  ) : (
    apartments.slice(0, 3).map(apartment => (
      <ApartmentCardMain Apartment={apartment}></ApartmentCardMain>
    ))
  )}
</div>

        <div className="Cards2">
          <h3 className="Naslov">Pogledajte neke od naših apartmana</h3>

          <div className="CardContainer2">
        {loading ? ( 
          <p>Loading...</p>
        ) : (
          apartments.length > 0 && ( 
            apartments.map(apartment => (
              <ApartmentCardSecondary apartment={apartment}></ApartmentCardSecondary>
            ))
          )
        )}
      </div>
        </div>

        <div className="SaveDiv">
          <h2>Želite uštedjeti?</h2>
          <p>Pretplatite se na naš letak se i poslati ćemo vam obavijesti o najnovijim ponudama</p>
          <div style={{display: "flex", marginTop: "2rem"}}>
            <input type="text" placeholder="Unesite vaš Mail"></input>
            <button>Pretplati se</button>
          </div>
        </div>
    </>
  )
}

export default Dashboard
