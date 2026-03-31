'use client';

import { useState } from 'react';

export default function AprilFoolReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="april-fool-reveal">
      <button onClick={() => setRevealed(!revealed)}>
        {revealed ? 'Hide' : 'Reveal'}
      </button>
      {revealed && <div>🎉 April Fool!</div>}
    </div>
  );
}
