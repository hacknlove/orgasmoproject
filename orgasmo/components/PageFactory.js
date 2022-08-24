import Dynamic from './Dynamic/Dynamic';
import Static from './Static/Static';

export default function PageFactory ({ Components }) {
  const Page =({ top, rows, bottom, src }) => (
      <>
        <Static rows={top} Components={Components} />
        <Dynamic rows={rows} src={src} Components={Components} />
        <Static rows={bottom} Components={Components} />
      </>    
  )
  return Page;
}

