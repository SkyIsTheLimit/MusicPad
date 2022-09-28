import { useState } from 'react';

export function TransportControls(props: {
  onPlay?: () => void;
  onStop?: () => void;
}) {
  const [state, setState] = useState('stopped');

  function play() {
    setState('playing');
    if (props.onPlay) props.onPlay();
  }

  function stop() {
    setState('stopped');
    if (props.onStop) props.onStop();
  }

  return (
    <div className='flex items-center p-4 mx-2 my-4 text-3xl rounded-md bg-neutral-900 text-neutral-500'>
      <span
        className={`inline-block mr-2 ${
          state === 'stopped' ? 'text-white' : ''
        } cursor-pointer`}
        onClick={play}
      >
        &#9658;
      </span>
      <span
        className={`inline-block mr-2 ${
          state === 'playing' ? 'text-white' : ''
        } cursor-pointer`}
        onClick={stop}
      >
        &#9633;
      </span>
    </div>
  );
}
