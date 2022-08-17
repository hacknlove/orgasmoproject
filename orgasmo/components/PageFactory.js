import Dynamic from './Dynamic';
import Static from './Static';

export default function PageFactory ({ Components }) {
  const Page =({ top, rows, bottom, getMore }) => (
      <>
        <Static rows={top} Components={Components} />
        <Dynamic rows={rows} getMore={getMore} Components={Components} />
        <Static rows={bottom} Components={Components} />
      </>    
  )
  return Page;
}

