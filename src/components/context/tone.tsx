import {
  createContext,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Transport, PlaybackState } from 'tone';
import { TimeSignature } from '../utils';

export interface ToneContext {
  isStarted: boolean;
  transportState: PlaybackState;
  currentBeat: number;
  scaleNotes: string[];
}

export interface ToneContextApi {
  markAsStarted(): void;

  toggleTransport(): void;

  setTempo(tempo: number): void;
  setTimeSignature(timeSignature: TimeSignature): void;
  setCurrentBeat: Dispatch<SetStateAction<number>>;
  setScaleNotes: Dispatch<SetStateAction<string[]>>;
}

const defaultToneCtx: ToneContext & ToneContextApi = {
  isStarted: false,
  transportState: 'stopped',
  currentBeat: 0,
  scaleNotes: [],

  markAsStarted: () => {},

  toggleTransport: () => {},

  setTempo: (_) => {},
  setTimeSignature: (_) => {},
  setCurrentBeat: (_) => {},
  setScaleNotes: (_) => {},
};

export const ToneContext = createContext<ToneContext & ToneContextApi>(
  defaultToneCtx
);

export function ToneProvider({ children }: HTMLAttributes<HTMLElement>) {
  const [currentBeat, setCurrentBeat] = useState(defaultToneCtx.currentBeat);
  const [isStarted, setIsStarted] = useState(defaultToneCtx.isStarted);
  const [transportState, setTransportState] = useState<PlaybackState>(
    defaultToneCtx.transportState
  );
  const [scaleNotes, setScaleNotes] = useState<string[]>([]);

  function markAsStarted() {
    setIsStarted(true);
  }

  function setTempo(tempo: number) {
    Transport.bpm.value = tempo;
  }

  function setTimeSignature(timeSignature: TimeSignature) {
    Transport.timeSignature = timeSignature;
  }

  function toggleTransport() {
    Transport.toggle();

    setTransportState(Transport.state);
  }

  return (
    <ToneContext.Provider
      value={{
        isStarted,
        transportState,
        currentBeat,
        scaleNotes,

        toggleTransport,

        markAsStarted,

        setTempo,
        setTimeSignature,
        setCurrentBeat,
        setScaleNotes,
      }}
    >
      {children}
    </ToneContext.Provider>
  );
}

export const useToneContext = () => useContext(ToneContext);
