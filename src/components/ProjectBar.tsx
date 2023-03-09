import { useProjectContext } from './context/project';
import { useToneContext } from './context/tone';
import {
  getNextMode,
  getNextRootNote,
  getNextTimeSignatureDenominator,
  getNextTimeSignatureNumerator,
  getPreviousMode,
  getPreviousRootNote,
  getPreviousTimeSignatureDenominator,
  getPreviousTimeSignatureNumerator,
} from './context/utils';
import { Edit, List, Play, Share, Stop } from './icons';

export function ProjectBar() {
  const {
    name,
    tempo,
    setTempo,
    keySignature,
    setKeySignature,
    timeSignature,
    setTimeSignature,
  } = useProjectContext();
  const { transportState, toggleTransport } = useToneContext();

  const incrementTempo = () => setTempo((tempo) => tempo + 1);
  const decrementTempo = () => setTempo((tempo) => tempo - 1);

  const incrementRoot = () =>
    setKeySignature((keySignature) => ({
      ...keySignature,
      root: getNextRootNote(keySignature.root),
    }));
  const decrementRoot = () =>
    setKeySignature((keySignature) => ({
      ...keySignature,
      root: getPreviousRootNote(keySignature.root),
    }));

  const incrementMode = () =>
    setKeySignature((keySignature) => ({
      ...keySignature,
      mode: getNextMode(keySignature.mode),
    }));
  const decrementMode = () =>
    setKeySignature((keySignature) => ({
      ...keySignature,
      mode: getPreviousMode(keySignature.mode),
    }));

  const incrementNumerator = () =>
    setTimeSignature((timeSignature) => [
      getNextTimeSignatureNumerator(timeSignature[0]),
      timeSignature[1],
    ]);
  const decrementNumerator = () =>
    setTimeSignature((timeSignature) => [
      getPreviousTimeSignatureNumerator(timeSignature[0]),
      timeSignature[1],
    ]);

  const incrementDenominator = () =>
    setTimeSignature((timeSignature) => [
      timeSignature[0],
      getNextTimeSignatureDenominator(timeSignature[1]),
    ]);
  const decrementDenominator = () =>
    setTimeSignature((timeSignature) => [
      timeSignature[0],
      getPreviousTimeSignatureDenominator(timeSignature[1]),
    ]);

  return (
    <div className='fixed z-10 bottom-0 flex justify-between w-full px-4 py-2 bg-[#222]'>
      <div className='flex items-center gap-8'>
        <div className='flex items-center gap-2'>
          <Edit className='w-6' />
          <span>{name}</span>
          {transportState === 'stopped' && (
            <button onClick={toggleTransport}>
              <Play className='w-8' />
            </button>
          )}
          {transportState === 'started' && (
            <button onClick={toggleTransport}>
              <Stop className='w-8' />
            </button>
          )}
        </div>

        <div className='flex gap-2'>
          <Share className='w-6' />
          <List className='w-6' />
        </div>
      </div>

      <div className='flex'>
        <div className='flex flex-col-reverse items-center mx-4'>
          <span className='inline-block text-xs font-bold text-center uppercase text-neutral-400'>
            Tempo
          </span>
          <div className='flex items-center gap-2'>
            <span className='inline-block w-[2rem] text-right'>{tempo}</span>
            <span>BPM</span>
            <div className='flex flex-col'>
              <button onClick={incrementTempo} className='text-xs'>
                &#9650;
              </button>
              <button onClick={decrementTempo} className='text-xs'>
                &#9660;
              </button>
            </div>
          </div>
        </div>

        <div className='w-1 h-full mx-2 border-r-[0.0625em] border-neutral-600'></div>

        <div className='flex flex-col-reverse items-center mx-4'>
          <span className='inline-block text-xs font-bold text-center uppercase text-neutral-400'>
            Key Signature
          </span>
          <div className='flex items-center gap-2'>
            <span className='inline-block w-[0.5rem]'>{keySignature.root}</span>
            <div className='flex flex-col'>
              <button onClick={incrementRoot} className='text-xs'>
                &#9650;
              </button>
              <button onClick={decrementRoot} className='text-xs'>
                &#9660;
              </button>
            </div>
            <span>{keySignature.mode}</span>
            <div className='flex flex-col'>
              <button onClick={incrementMode} className='text-xs'>
                &#9650;
              </button>
              <button onClick={decrementMode} className='text-xs'>
                &#9660;
              </button>
            </div>
          </div>
        </div>

        <div className='w-1 h-full mx-2 border-r-[0.0625em] border-neutral-600'></div>

        <div className='flex flex-col-reverse items-center mx-4'>
          <span className='inline-block text-xs font-bold text-center uppercase text-neutral-400'>
            Time Signature
          </span>
          <div className='flex items-center gap-2 text-sm font-bold'>
            <div className='flex flex-col'>
              <button onClick={incrementNumerator} className='text-xs'>
                &#9650;
              </button>
              <button onClick={decrementNumerator} className='text-xs'>
                &#9660;
              </button>
            </div>
            <span className='inline-block w-[0.5rem]'>{timeSignature[0]}</span>
            <span>/</span>
            <span>{timeSignature[1]}</span>
            <div className='flex flex-col'>
              <button onClick={incrementDenominator} className='text-xs'>
                &#9650;
              </button>
              <button onClick={decrementDenominator} className='text-xs'>
                &#9660;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
