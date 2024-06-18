import './ApartmentPage.css';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import firestore from "../../../firebase";
import ApartmentPageCard from './ApartmentPageCard';
import { useLocation } from 'react-router-dom';

const ApartmentPage = () => {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const location = useLocation();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Apartments"));
        const apartmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApartments(apartmentsList);
        setFilteredApartments(apartmentsList);
        setLoading(false);

        const queryParams = new URLSearchParams(location.search);
        const city = queryParams.get('city') || '';
        const maxPrice = queryParams.get('budget') || '';

        setDestination(city);
        setPriceMin('0');
        setPriceMax(maxPrice);

        if (city || maxPrice) {
          handleSearch(apartmentsList, city, 0, maxPrice);
        }
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchApartments();
  }, [location.search]);

  const handleSearch = (apartmentList = apartments, searchDestination = destination, searchPriceMin = priceMin, searchPriceMax = priceMax) => {
    const minPrice = parseFloat(searchPriceMin) || 0;
    const maxPrice = parseFloat(searchPriceMax) || Infinity;

    const filtered = apartmentList.filter(apartment => {
      const matchesDestination = apartment.Grad.toLowerCase().includes(searchDestination.toLowerCase());
      const matchesPrice = apartment.Price >= minPrice && apartment.Price <= maxPrice;
      return matchesDestination && matchesPrice;
    });

    setFilteredApartments(filtered);
  };

  return (
    <div className='ApartmentPage'>
      <div className='MainWrapper'>
        <div className='ApartmentFilter'>
          <h3>Pretraži</h3>

          <div>
            <p>Odredište</p>
            <input 
              placeholder='Osijek' 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div style={{marginTop: "1rem"}}>
            <p>Cijena (od) u €</p>
            <input 
              placeholder='0' 
              value={priceMin} 
              onChange={(e) => setPriceMin(e.target.value)}
            />
          </div>

          <div style={{marginTop: "1rem"}}>
            <p>Cijena (do) u €</p>
            <input 
              placeholder='150' 
              value={priceMax} 
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>

          <p style={{textAlign: "center", fontSize: "15px", marginTop: "2.5rem"}}>
            Iskoristite naš filter da pronađete savršen apartman za vas. Unesite vaše željeno odredište i budžet i prelistajte naše ponuđene smještajne jedinice.
          </p>
          
          <button onClick={() => handleSearch()}>Pretraži</button>
        </div>
        <div className='ApartmentPageCards'>
            {filteredApartments.length > 0 ? (
                filteredApartments.map(apartment => (
                    <ApartmentPageCard key={apartment.id} apartment={apartment} />
                ))
            ) : (
                <p style={{padding: "20px"}}>Nažalost nismo pronašli apartman koji odgovara vašim kriterijima.</p>
            )}
        </div>
      </div>
    </div>
  )
}

export default ApartmentPage;
