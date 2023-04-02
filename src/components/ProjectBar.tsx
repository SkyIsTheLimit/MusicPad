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
  const { project, dispatch } = useProjectContext();
  const incrementTempo = () =>
    dispatch({ type: 'project:tempo', data: { tempo: project.tempo + 1 } });
  const decrementTempo = () =>
    dispatch({ type: 'project:tempo', data: { tempo: project.tempo - 1 } });

  const incrementRoot = () =>
    dispatch({
      type: 'project:keySignature',
      data: {
        keySignature: {
          ...project.keySignature,
          root: getNextRootNote(project.keySignature.root),
        },
      },
    });
  const decrementRoot = () =>
    dispatch({
      type: 'project:keySignature',
      data: {
        keySignature: {
          ...project.keySignature,
          root: getPreviousRootNote(project.keySignature.root),
        },
      },
    });

  const incrementMode = () =>
    dispatch({
      type: 'project:timeSignature',
      data: {
        keySignature: {
          ...project.keySignature,
          mode: getNextMode(project.keySignature.mode),
        },
      },
    });

  const decrementMode = () =>
    dispatch({
      type: 'project:timeSignature',
      data: {
        keySignature: {
          ...project.keySignature,
          mode: getPreviousMode(project.keySignature.mode),
        },
      },
    });

  const incrementNumerator = () =>
    dispatch({
      type: 'project:timeSignature',
      data: {
        timeSignature: [
          getNextTimeSignatureNumerator(project.timeSignature[0]),
          project.timeSignature[1],
        ],
      },
    });
  const decrementNumerator = () =>
    dispatch({
      type: 'project:timeSignature',
      data: {
        timeSignature: [
          getPreviousTimeSignatureNumerator(project.timeSignature[0]),
          project.timeSignature[1],
        ],
      },
    });

  const incrementDenominator = () =>
    dispatch({
      type: 'project:timeSignature',
      data: {
        timeSignature: [
          project.timeSignature[0],
          getNextTimeSignatureDenominator(project.timeSignature[1]),
        ],
      },
    });
  const decrementDenominator = () =>
    dispatch({
      type: 'project:timeSignature',
      data: {
        timeSignature: [
          project.timeSignature[0],
          getPreviousTimeSignatureDenominator(project.timeSignature[1]),
        ],
      },
    });

  return (
    <div
      className={`flex flex-1 gap-4 text-xs text-neutral-500 font-bold relative mb-4 md:mb-0 ${className}`}
    >
      <div className='flex flex-col flex-1 px-5 py-2 rounded-md md:mx-4 border-neutral-700 bg-neutral-900'>
        <span className='inline-block font-bold text-neutral-400'>Tempo</span>
        <div className='flex items-center gap-1'>
          <span className='inline-block w-[1.25rem] text-left'>
            {project.tempo}
          </span>
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
          <span className='inline-block w-[0.5rem]'>
            {project.keySignature.root}
          </span>
          <div className='flex flex-col'>
            <button onClick={incrementRoot} className='text-xs'>
              <ChevronUp className='w-4' />
            </button>
            <button onClick={decrementRoot} className='text-xs'>
              <ChevronDown className='w-4' />
            </button>
          </div>
          <span>{project.keySignature.mode}</span>
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
          <span className='inline-block w-[0.5rem]'>
            {project.timeSignature[0]}
          </span>
          <span>/</span>
          <span>{project.timeSignature[1]}</span>
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
  const { project } = useProjectContext();

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
        <button className='rounded-md bg-[#111] w-8 h-8 flex items-center justify-center'>
          <Edit className='w-5' />
        </button>
        <span className='text-xs font-bold'>{project.name}</span>
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
            className='rounded-md md:hidden text-neutral-400 bg-[#111] w-8 h-8 flex items-center justify-center'
          >
            <ChevronUp className='w-5' />
          </button>
        ) : (
          <button
            onClick={close}
            className='rounded-md md:hidden text-neutral-400 bg-[#111] w-8 h-8 flex items-center justify-center'
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
  const { transportState, toggleTransport } = useToneContext();

  const open = () => setShowAdvancedOptions(true);
  const close = () => setShowAdvancedOptions(false);

  return (
    <div className='fixed z-20 bottom-0 flex flex-col md:flex-row w-full px-4 py-2 bg-[#222] border-t-2 border-[#333] shadow-md'>
      <div className='absolute -translate-y-[75%] left-1/2 -translate-x-[50%] z-10'>
        {transportState === 'stopped' && (
          <button
            className='rounded-full ring-neutral-400 ring-1 bg-[#111] w-16 h-16 flex items-center justify-center'
            onClick={toggleTransport}
          >
            <Play className='w-8 opacity-80' />
          </button>
        )}
        {transportState === 'started' && (
          <button
            className='rounded-full ring-neutral-400 ring-1 bg-[#111] w-16 h-16 flex items-center justify-center'
            onClick={toggleTransport}
          >
            <Stop className='w-8 opacity-80' />
          </button>
        )}
      </div>
      {showAdvancedOptions && <TransportControls />}
      <ProjectInfo onOpen={open} onClose={close} />
      <TransportControls className='hidden md:flex' />
    </div>
  );
}
