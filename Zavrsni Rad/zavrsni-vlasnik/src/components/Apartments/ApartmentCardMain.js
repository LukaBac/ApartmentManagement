import './Apartments.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, deleteDoc } from 'firebase/firestore';
import firestore from '../../firebase';

const ApartmentCardMain = ({ Apartment }) => {

  const handleDelete = async () => {
    try {
      const apartmentRef = doc(firestore, 'Apartments', Apartment.id);
      await deleteDoc(apartmentRef);
      window.location.reload();
    } catch (error) {
      console.error('Greška u brisanju apartmana:', error);
    }
  };

  return (
    <div className='ApartmentCard'>
      <Link className='LinkStyle' to={"/apartmani/apartman-uredi/" + Apartment.id}>
        <h3>{Apartment.Name}</h3>
      </Link>
      <div className="Icons">
        <Link to={"/apartmani/apartman-uredi/" + Apartment.id}>
          <FontAwesomeIcon icon={"pencil-alt"} className="EditIcon" />
        </Link>
        <FontAwesomeIcon icon={"trash"} onClick={handleDelete} className="DeleteIcon" />
      </div>
    </div>
  );
};

export default ApartmentCardMain;