import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firestore from '../../firebase'; // Adjust the path according to your project structure
import './UrediApartman.css';

const UrediApartman = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const docRef = doc(firestore, 'Apartments', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.Name);
          setCity(data.Grad);
          setDescription(data.Description);
          setPrice(data.Price);
          setImage(data.Slika);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching apartment:', error);
      }
    };

    fetchApartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apartmentRef = doc(firestore, 'Apartments', id);

      await updateDoc(apartmentRef, {
        Name: name,
        Grad: city,
        Description: description,
        Price: parseFloat(price)
      });

      alert('Apartment updated successfully!');
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  return (
    <div className='UrediApartman'>
    <div className='SectionTop'>
        <h2>Uređivanje apartmana:</h2>
    </div>
    <div className="UrediApartmanMain">
      
      <div className='UrediApartmanImg' style={{backgroundImage: "url(" + image + ")"}}></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ime</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Grad</label>
          <input 
            type="text" 
            id="city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Opis</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Cijena (€)</label>
          <input 
            type="number" 
            id="price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">SPREMI PROMJENE</button>
      </form>
    </div>
    </div>
  );
}

export default UrediApartman;
