import './Zarada.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import firestore from '../../firebase';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Zarada = () => {
  const [apartments, setApartments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [earningsPerApartment, setEarningsPerApartment] = useState({});
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch apartments
        const apartmentsSnapshot = await getDocs(collection(firestore, 'Apartments'));
        const apartmentsList = apartmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApartments(apartmentsList);

        // Fetch reservations
        const reservationsSnapshot = await getDocs(collection(firestore, 'Reservations'));
        const reservationsList = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReservations(reservationsList);

        // Calculate earnings
        const earnings = {};
        let total = 0;
        reservationsList.forEach(reservation => {
          const apartment = apartmentsList.find(ap => ap.id === reservation.ApartmentID);
          if (apartment) {
            const startDate = reservation.StartDate.toDate();
            const endDate = reservation.EndDate.toDate();
            const daysStayed = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const pricePaid = daysStayed * apartment.Price;

            earnings[apartment.Name] = (earnings[apartment.Name] || 0) + pricePaid;
            total += pricePaid;
          }
        });

        setEarningsPerApartment(earnings);
        setTotalEarnings(total);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1A1A'];

  const pieData = Object.keys(earningsPerApartment).map((key, index) => ({
    name: key,
    value: Math.round(earningsPerApartment[key]),
    fill: colors[index % colors.length]
  }));

  return (
    <div className='Zarada'>
      <div className='SectionTop'>
        <h2>Zarada:</h2>
      </div>
      <div className='ZaradaContent'>
        <div className='LeftSide'>
          <h2>Ukupni prihod: <br />{totalEarnings.toFixed(2)}€</h2>
          <div className='EarningsList'>
            <div className='EarningsTop'>
                <p>Apartman:</p>
                <p>Prihod:</p>
            </div>
            {Object.entries(earningsPerApartment).map(([name, earnings]) => (
              <div className='EarningsCard' key={name}>
                <p>{name}</p>
                <p>{earnings.toFixed(2)}€</p>
              </div>
            ))}
          </div>
        </div>
        <div className='RightSide'>
          <PieChart width={500} height={500}>
            <Pie
              data={pieData}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={150}
              fill='#8884d8'
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(0)}`} />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Zarada;