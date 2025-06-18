'use client';

import { useEffect, useState } from 'react';
import { Seat, SeatStatus, rows, columns } from './data/seats';
import SeatPlan from './components/SeatPlan';
import styles from './page.module.css';


// Rastgele hangi koltuğun boş-dolu-rezerve olduğunu oluşturma
function RandomSeat(): SeatStatus {
  const random = Math.random();
  if (random < 0.8) return 'dolu';
  if (random < 0.85) return 'res';
  return 'bos';
}


// Kullanıcıyı bilgilendirmek için hangi rengin neyi temsil ettiğini belirleme
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className={styles.legendItem}>
      <div
        className={styles.legendBox}
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}

export default function Home() {

  const [event, setEvent] = useState<string | null>(null);


  const events = [
    { id: '01', title: 'Yalin - Bir Büyülü Gece', date: '18 Temmuz' }
  ];

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Oluşturulan rastgele koltuk verisini çekme
  useEffect(() => {
    const randomized: Seat[] = [];

    for (const row of rows) {
      for (const col of columns) {
        randomized.push({
          row,
          column: col,
          status: RandomSeat()
        });
      }
    }

    setSeats(randomized);
  }, []);


  // Koltuğu seçili hale getirme ya da seçimini kaldırma
  const toggleSeat = (id: string) => {
    setSelectedSeats(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };


  return (
    <main style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1>Etkinlikler</h1>
      {!event && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {events.map(event => (
            <button key={event.id} onClick={() => setEvent(event.id)}>
              {event.title} - {event.date}
            </button>
          ))}
        </div>
      )}

      {event && (
        <>
          <h1>Koltuk Seçimi</h1>
          {seats.length > 0 && (
            <SeatPlan seats={seats} selected={selectedSeats} toggle={toggleSeat} />
          )}
          
          <div className={styles.legend}>
            <LegendItem color='gray' label='Dolu' />
            <LegendItem color='orange' label='Rezerve' />
            <LegendItem color='#10b981' label='Seçilebilir' />
          </div>

          <p>
            Seçilen Koltuklar: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Yok'}
          </p>
          <button onClick={() => setEvent(null)}> Geri dön</button></>
      )}
    </main>
  );
}
