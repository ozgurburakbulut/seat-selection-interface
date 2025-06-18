import { Seat as SeatType } from '../data/seats';
import Seat from './Seat';
import styles from '../page.module.css';

interface Props {
  seats: SeatType[];
  selected: string[];
  toggle: (id: string) => void;
}

// Belirlenen koltuk sayısını kullanıcıya gösterme
export default function SeatPlan({ seats, selected, toggle }: Props) {
  const rows = Array.from(new Set(seats.map(s => s.row))).sort();

  return (
    <div>
      {rows.map(row => {
        const rowSeats = seats
          .filter(s => s.row === row);

        return (
          <div className={styles.row} key={row}>
            <div className={styles.rowLabel}>{row}</div>
            {rowSeats.map(seat => {
              const id = `${seat.row}-${seat.column}`;
              return (
                <Seat
                  key={id}
                  id={id}
                  status={seat.status}
                  isSelected={selected.includes(id)}
                  onClick={() => toggle(id)} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
