import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import firestore from '../../firebase'; // Adjust the path according to your project structure
import storage from '../../firebaseStorage'; // Adjust the path according to your project structure
import './DodajApartman.css';
import { getDownloadURL } from 'firebase/storage';

const DodajApartman = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const url = await getDownloadURL(storageRef);
    
      await addDoc(collection(firestore, 'Apartments'), {
        Name: name,
        Grad: city,
        Description: description,
        Price: parseFloat(price),
        Slika: url 
      });
  
      alert('Apartman uspješno dodan!');
      setName('');
      setCity('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImageUrl('');
    } catch (error) {
      console.error('Greška u dodavanju apartmana:', error);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <div className="DodajApartman">
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
          <label htmlFor="city">Mjesto</label>
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
        <div className="form-group">
          <label htmlFor="image">Slika</label>
          <input 
            type="file" 
            id="image" 
            accept="image/*"
            onChange={handleImageChange}
            required 
          />
          {imageUrl && <img src={imageUrl} alt="Apartment" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        </div>
        <button type="submit">Add Apartment</button>
      </form>
    </div>
  );
}

export default DodajApartman;