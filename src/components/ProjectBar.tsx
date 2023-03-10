import { HTMLAttributes, useState } from 'react';
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
} from './utils';
import { ChevronDown, ChevronUp, Edit, List, Play, Share, Stop } from './icons';

export function TransportControls({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const {
    tempo,
    setTempo,
    keySignature,
    setKeySignature,
    timeSignature,
    setTimeSignature,
  } = useProjectContext();
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
    <div
      className={`flex flex-1 gap-4 text-xs text-neutral-500 font-bold relative mb-4 md:mb-0 ${className}`}
    >
      <div className='flex flex-col flex-1 px-5 py-2 rounded-md md:mx-4 border-neutral-700 bg-neutral-900'>
        <span className='inline-block font-bold text-neutral-400'>Tempo</span>
        <div className='flex items-center gap-1'>
          <span className='inline-block w-[1.25rem] text-left'>{tempo}</span>
          <span>BPM</span>
          <div className='flex flex-col'>
            <button onClick={incrementTempo} className='text-xs'>
              <ChevronUp className='w-4' />
            </button>
            <button onClick={decrementTempo} className='text-xs'>
              <ChevronDown className='w-4' />
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col flex-1 px-5 py-2 rounded-md md:mx-4 border-neutral-700 bg-neutral-900'>
        <span className='inline-block text-xs font-bold text-neutral-400'>
          Key Signature
        </span>
        <div className='flex items-center gap-1'>
          <span className='inline-block w-[0.5rem]'>{keySignature.root}</span>
          <div className='flex flex-col'>
            <button onClick={incrementRoot} className='text-xs'>
              <ChevronUp className='w-4' />
            </button>
            <button onClick={decrementRoot} className='text-xs'>
              <ChevronDown className='w-4' />
            </button>
          </div>
          <span>{keySignature.mode}</span>
          <div className='flex flex-col'>
            <button onClick={incrementMode} className='text-xs'>
              <ChevronUp className='w-4' />
            </button>
            <button onClick={decrementMode} className='text-xs'>
              <ChevronDown className='w-4' />
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col flex-1 px-5 py-2 rounded-md md:mx-4 border-neutral-700 bg-neutral-900'>
        <span className='inline-block text-xs font-bold text-neutral-400'>
          Time Signature
        </span>
        <div className='flex items-center gap-2 font-bold'>
          <div className='flex flex-col gap-0'>
            <button className='text-xs' onClick={incrementNumerator}>
              <ChevronUp className='w-4' />
            </button>
            <button className='text-xs' onClick={decrementNumerator}>
              <ChevronDown className='w-4' />
            </button>
          </div>
          <span className='inline-block w-[0.5rem]'>{timeSignature[0]}</span>
          <span>/</span>
          <span>{timeSignature[1]}</span>
          <div className='flex flex-col'>
            <button onClick={incrementDenominator} className='text-xs'>
              <ChevronUp className='w-4' />
            </button>
            <button onClick={decrementDenominator} className='text-xs'>
              <ChevronDown className='w-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectInfo({
  onOpen,
  onClose,
}: {
  onOpen: () => void;
  onClose: () => void;
}) {
  const { name } = useProjectContext();
  const { transportState, toggleTransport } = useToneContext();
  const [opened, setOpened] = useState(false);

  function open() {
    if (onOpen) {
      onOpen();
    }

    setOpened(true);
  }

  function close() {
    if (onClose) {
      onClose();
    }

    setOpened(false);
  }

  return (
    <div className='flex items-center justify-between flex-1 gap-8 py-2 md:py-0 md:justify-start text-neutral-400'>
      <div className='flex items-center gap-2'>
        {transportState === 'stopped' && (
          <button
            className='rounded-md bg-[#111] w-8 h-8 flex items-center justify-center'
            onClick={toggleTransport}
          >
            <Play className='w-5' />
          </button>
        )}
        {transportState === 'started' && (
          <button
            className='rounded-md bg-[#111] w-8 h-8 flex items-center justify-center'
            onClick={toggleTransport}
          >
            <Stop className='w-5' />
          </button>
        )}

        <button className='rounded-md bg-[#111] w-8 h-8 flex items-center justify-center'>
          <Edit className='w-5' />
        </button>
        <span className='text-xs font-bold'>{name}</span>
      </div>

      <div className='flex gap-2'>
        <button className='rounded-md text-neutral-400 bg-[#111] w-8 h-8 flex items-center justify-center'>
          <Share className='w-4' />
        </button>
        <button className='rounded-md text-neutral-400 bg-[#111] w-8 h-8 flex items-center justify-center'>
          <List className='w-5' />
        </button>

        {!opened ? (
          <button
            onClick={open}
            className='rounded-md text-neutral-400 bg-[#111] w-8 h-8 flex items-center justify-center'
          >
            <ChevronUp className='w-5' />
          </button>
        ) : (
          <button
            onClick={close}
            className='rounded-md text-neutral-400 bg-[#111] w-8 h-8 flex items-center justify-center'
          >
            <ChevronDown className='w-5' />
          </button>
        )}
      </div>
    </div>
  );
}

export function ProjectBar() {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const open = () => setShowAdvancedOptions(true);
  const close = () => setShowAdvancedOptions(false);

  return (
    <div className='fixed z-20 bottom-0 flex flex-col md:flex-row w-full px-4 py-2 bg-[#222] border-t-2 border-[#333] shadow-md'>
      {showAdvancedOptions && <TransportControls />}
      <ProjectInfo onOpen={open} onClose={close} />
      <TransportControls className='hidden md:flex' />
    </div>
  );
}
