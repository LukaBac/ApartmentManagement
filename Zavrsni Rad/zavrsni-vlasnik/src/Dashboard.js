import React, { useEffect, useState } from 'react';
import './index.css';
import './Dashboard.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook, faBookOpen, faHouseChimney, faUser, faChartLine, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import firestore from './firebase';

library.add(faBook, faBookOpen, faHouseChimney, faUser, faChartLine, faTrash, faPencilAlt);

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Reservations'));
        const reservationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservations(reservationsList);
      } catch (e) {
        console.error("Error fetching reservations: ", e);
      }
    };

    const fetchApartments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Apartments'));
        const apartmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApartments(apartmentsList);
      } catch (e) {
        console.error("Error fetching apartments: ", e);
      }
    };

    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Gosti'));
        const guestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGuests(guestsList);
      } catch (e) {
        console.error("Error fetching guests: ", e);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchReservations(), fetchApartments(), fetchGuests()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getApartmentPrice = (apartmentID) => {
    const apartment = apartments.find(ap => ap.id === apartmentID);
    return apartment ? apartment.Price : 0;
  };

  const getGuestName = (userID) => {
    const guest = guests.find(g => g.id === userID);
    return guest ? guest.Name : 'Unknown Guest';
  };

  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    const start = new Date(startDate.seconds * 1000);
    const end = new Date(endDate.seconds * 1000);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days * pricePerDay;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='Dashboard Spacer'>
      <div className='left-panel'>
        <h2 style={{marginBottom: "1rem"}}>Aktivne rezervacije</h2>
        {reservations.map(reservation => {
          const pricePerDay = getApartmentPrice(reservation.ApartmentID);
          const totalPrice = calculateTotalPrice(reservation.StartDate, reservation.EndDate, pricePerDay);
          const guestName = getGuestName(reservation.UserID);
          return (
            <div key={reservation.id} className='reservation-card'>
              <p><strong>Gost:</strong> {guestName}</p>
              <p><strong>Cijena:</strong> ${totalPrice}</p>
              <p><strong>Od:</strong> {new Date(reservation.StartDate.seconds * 1000).toDateString()}</p>
              <p><strong>Do:</strong> {new Date(reservation.EndDate.seconds * 1000).toDateString()}</p>
            </div>
          );
        })}
      </div>
      <div className='right-panel'>
        <h2 style={{marginBottom: "1rem"}}>Dostupni apartmani</h2>
        {apartments.map(apartment => (
          <div key={apartment.id} className='apartment-card'>
            <p><strong>Ime:</strong> {apartment.Name}</p>
            <p><strong>Mjesto:</strong> {apartment.location}</p>
            <p><strong>Cijena:</strong> ${apartment.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;