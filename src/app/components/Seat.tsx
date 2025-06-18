import styles from '../page.module.css';

interface SeatProps {
  id: string;
  status: 'bos' | 'dolu' | 'res';
  isSelected: boolean;
  onClick: () => void;
}

// Koltuğun durumuna göre rengini, tıklanıp tıklanamaması yapısını oluşturma
export default function Seat({ id, status, isSelected, onClick }: SeatProps) {
  const info = [styles.seat];
  if (status === 'dolu') info.push(styles.dolu);
  else if (status === 'res') info.push(styles.res);
  else if (isSelected) info.push(styles.selected);

  return (
    <button className={info.join(' ')} onClick={onClick} disabled={status !== 'bos'}>
      {id.split('-')[1]}
    </button>
  );
}
