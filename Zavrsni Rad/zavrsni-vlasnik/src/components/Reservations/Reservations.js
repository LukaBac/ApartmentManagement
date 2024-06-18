import './Reservations.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firestore from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [apartments, setApartments] = useState({});
  const [guests, setGuests] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsSnapshot = await getDocs(collection(firestore, 'Reservations'));
        const reservationsList = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const apartmentsSnapshot = await getDocs(collection(firestore, 'Apartments'));
        const apartmentsMap = apartmentsSnapshot.docs.reduce((map, doc) => {
          map[doc.id] = doc.data();
          return map;
        }, {});
        setApartments(apartmentsMap);

        const guestsSnapshot = await getDocs(collection(firestore, 'Gosti'));
        const guestsMap = guestsSnapshot.docs.reduce((map, doc) => {
          map[doc.id] = doc.data();
          return map;
        }, {});
        setGuests(guestsMap);

        const detailedReservations = reservationsList.map(reservation => {
          const apartment = apartmentsMap[reservation.ApartmentID];
          const guest = guestsMap[reservation.UserID];

          const startDate = reservation.StartDate.toDate();
          const endDate = reservation.EndDate.toDate();
          const daysStayed = (endDate - startDate) / (1000 * 60 * 60 * 24);
          const pricePaid = daysStayed * (apartment?.Price || 0);

          return {
            ...reservation,
            ApartmentName: apartment?.Name || 'Unknown Apartment',
            GuestName: guest?.Name || 'Unknown Guest',
            StartDateFormatted: format(startDate, 'dd/MM/yyyy'),
            EndDateFormatted: format(endDate, 'dd/MM/yyyy'),
            PricePaid: pricePaid
          };
        });

        setReservations(detailedReservations);
      } catch (e) {
        console.error("Error fetching reservations: ", e);
      }
    };

    fetchData();
  }, []);

  const deleteReservation = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Reservations', id));
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (e) {
      console.error("Error deleting reservation: ", e);
    }
  };

  return (
    <div className='Reservations'>
      <div className='SectionTop'>
        <h2>Vaše rezervacije:</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Apartman</th>
            <th>Datum (Od)</th>
            <th>Datum (Do)</th>
            <th>Gost</th>
            <th>Cijena</th>
            <th>Uredi</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.ApartmentName}</td>
              <td>{reservation.StartDateFormatted}</td>
              <td>{reservation.EndDateFormatted}</td>
              <td>{reservation.GuestName}</td>
              <td>{reservation.PricePaid.toFixed(2)}€</td>
              <td>
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteReservation(reservation.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservations;
