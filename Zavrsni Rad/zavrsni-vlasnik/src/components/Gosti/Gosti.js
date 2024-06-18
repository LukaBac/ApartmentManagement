import './Gosti.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firestore from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Gosti = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Gosti'));
        const guestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGuests(guestsList);
      } catch (e) {
        console.error("Error fetching guests: ", e);
      }
    };

    fetchGuests();
  }, []);

  const deleteGuest = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Gosti', id));
      setGuests(guests.filter(guest => guest.id !== id));
    } catch (e) {
      console.error("Error deleting guest: ", e);
    }
  };

  return (
    <div className='Gosti'>
      <div className='SectionTop'>
        <h2>Gosti:</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Država</th>
            <th>Email</th>
            <th>Mobitel</th>
            <th>Uredi</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest.ID}>
              <td>{guest.Name}</td>
              <td>{guest.Country}</td>
              <td>{guest.Mail}</td>
              <td>{guest.Phone}</td>
              <td>
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteGuest(guest.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Gosti;