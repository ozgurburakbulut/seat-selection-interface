export type SeatStatus = 'bos' | 'dolu' | 'res';

export interface Seat {
  row: string;
  column: number;
  status: SeatStatus;
}

// Kaç adet satır ve koltuk olacakğını belirleme
export const rows = 'ABCDEFGH'.split('');
export const columns = Array.from({ length: 10 }, (_, i) => i + 1);
