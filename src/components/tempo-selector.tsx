import { useState } from 'react';

export function TempoSelector(props: {
  onTempoChanged?: (tempo: number) => void;
}) {
  const [bpm, setBpm] = useState(120);

  function tempoChanged(newTempo: number) {
    setBpm(newTempo);
    if (props.onTempoChanged) props.onTempoChanged(newTempo);
  }

  return (
    <div className='flex items-center px-8 py-0 mx-2 my-4 text-2xl font-bold rounded-md bg-neutral-900 text-neutral-500'>
      <span className='w-12'>{bpm}</span>
      <span>BPM</span>

      <div className='flex flex-col ml-4 text-sm text-neutral-50'>
        <span
          className='inline-block cursor-pointer'
          onClick={() => setBpm(bpm + 1)}
        >
          &#9650;
        </span>
        <span
          className='inline-block cursor-pointer'
          onClick={() => setBpm(bpm - 1)}
        >
          &#9660;
        </span>
      </div>
    </div>
  );
}
