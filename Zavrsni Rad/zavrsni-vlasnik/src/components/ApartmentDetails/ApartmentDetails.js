import './ApartmentDetails.css';
import { doc, getDoc } from 'firebase/firestore';
import firestore from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const docRef = doc(firestore, 'Apartments', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const apartmentData = { id: docSnap.id, ...docSnap.data() };
          setApartment(apartmentData);
          console.log("Fetched apartment data:", apartmentData); // Output the fetched data to the console
        } else {
          console.log('No such document!');
        }
      } catch (e) {
        console.error('Error fetching document: ', e);
      } finally {
        setLoading(false); // Set loading to false regardless of the outcome
      }
    };

    fetchApartment();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='ApartmentDetails Spacer'>
      {apartment && (
        <>
          <div className='ApartmentImage' style={{ backgroundImage: `url(${apartment.Slika})` }}>
          </div>

          <div className='ApartmentText'>
            <h2>{apartment.Name}</h2>
            <p id='ApartmentCity'>{apartment.Grad}</p>
            <p id='ApartmentDescription'>{apartment.Description}</p>
            <p>Cijene od: {apartment.Price}€</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ApartmentDetails;