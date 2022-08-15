import React from 'react';
import Dynamic from './Dynamic';
import Static from './Static';

export default function PageFactory ({ Components }) {
  const Page =({
      pre,
      rows,
      post,
      getMore,
  }) => (
      <>
        <Static rows={pre} Components={Components} />
        <Dynamic rows={rows} getMore={getMore} Components={Components} />
        <Static rows={post} Components={Components} />
      </>    
  )
  return Page;
}

