import React from 'react';
import Dynamic from './Dynamic';
import Static from './Static';

export default function PageFactory ({ Components }) {
  const Page =({
      pre,
      rows,
      post,
      src,
  }) => (
      <>
        <Static rows={pre} Components={Components} />
        <Dynamic rows={rows} src={src} Components={Components} />
        <Static rows={post} Components={Components} />
      </>    
  )
  return Page;
}

