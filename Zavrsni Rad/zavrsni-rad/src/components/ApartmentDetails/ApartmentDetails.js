import './ApartmentDetails.css';
import { doc, getDoc, getDocs, where, query, collection, addDoc, setDoc } from 'firebase/firestore';
import firestore from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from '../DatePicker/DatePicker';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const docRef = doc(firestore, 'Apartments', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApartment({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (e) {
        console.error('Error fetching document: ', e);
      }
    };

    const fetchReservationsForApartment = async (apartmentID) => {
      try {
        const q = query(collection(firestore, "Reservations"), where("ApartmentID", "==", apartmentID));
        
        const querySnapshot = await getDocs(q);
        const reservationList = querySnapshot.docs.map(doc => doc.data());

        setReservations(reservationList);

      } catch (e) {
        console.error("Error fetching reservations: ", e);
      }
    };

    fetchApartment();
    fetchReservationsForApartment(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalPrice = () => {
    if (startDate && endDate && apartment) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = Math.abs(end - start);
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return days * apartment.Price;
    }
    return 0;
  };

  const createNewUser = async () => {
    try {
      const userRef = doc(firestore, 'Gosti', formData.name.replace(/\s/g, ''));
      await setDoc(userRef, {
        Name: formData.name,
        Mail: formData.email,
        Phone: formData.phone,
        Country: formData.country,
      });
      console.log('User created successfully!');
      return userRef.id; // Return the document ID
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  const createReservation = async (userID) => {
    try {
      const reservationRef = await addDoc(collection(firestore, 'Reservations'), {
        ApartmentID: id,
        StartDate: startDate,
        EndDate: endDate,
        UserID: userID,
      });
      console.log('Reservation created successfully!');
      return reservationRef.id; // Return the document ID
    } catch (error) {
      console.error('Error creating reservation: ', error);
    }
  };

  const handleReservation = async () => {
    const userID = await createNewUser(); // Create user first and get user ID
    if (userID) {
      await createReservation(userID); // Create reservation with user ID
      closeModal(); // Close modal after successful reservation
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='ApartmentDetails'>
      {apartment && (
        <>
          <div>
            <h2 style={{fontWeight: "600", fontSize: "26px", marginBottom: "0.7rem"}}>{apartment.Name}</h2>
            <p style={{marginBottom: "1rem"}}>{apartment.Description}</p>
            <p style={{color: "green", fontWeight: "500", marginBottom: "0.7rem"}}>Rezervirajte ovaj apartman uz cijene od {apartment.Price}€.<br></br>Dolazi uz besplatan prijevoz taksijem do apartmana na dolasku</p>
          </div>

          <div className='ApartmentImage' style={{ backgroundImage: `url(${apartment.Slika})` }}>
          </div>

          <div>
            <h2 style={{fontWeight: "600", fontSize: "26px", marginTop: "2rem"}}>Pročitajte više</h2>
            <p style={{marginTop: "1rem"}}>{apartment.Description}</p>
            <button onClick={openModal}>REZERVIRAJTE APARTMAN</button>
          </div>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Reservation Form"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Rezervirajte apartman:</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Ime</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Država</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <DatePicker
            reservations={reservations}
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
            }}
          />
          <p style={{textAlign: "center", marginTop: "-0.6rem", marginBottom: "1rem"}}>Cijena: {calculateTotalPrice()}€</p>
          <button className='ReserveBtnModal' type="button" onClick={handleReservation}>Rezerviraj</button>
        </form>
      </Modal>
    </div>
  );
};

export default ApartmentDetails;
