import { createContext, HTMLAttributes, useContext, useState } from 'react';
import { Transport, PlaybackState } from 'tone';
import { TimeSignature } from '../utils';

export interface ToneContext {
  isStarted: boolean;
  transportState: PlaybackState;
}

export interface ToneContextApi {
  markAsStarted(): void;

  toggleTransport(): void;

  setTempo(tempo: number): void;
  setTimeSignature(timeSignature: TimeSignature): void;
}

export const ToneContext = createContext<ToneContext & ToneContextApi>({
  isStarted: false,
  transportState: 'stopped',
  markAsStarted: () => {},

  toggleTransport: () => {},

  setTempo: (_) => {},
  setTimeSignature: (_) => {},
});

export function ToneProvider({ children }: HTMLAttributes<HTMLElement>) {
  const [isStarted, setIsStarted] = useState(false);
  const [transportState, setTransportState] =
    useState<PlaybackState>('stopped');

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

        toggleTransport,

        markAsStarted,
        setTempo,
        setTimeSignature,
      }}
    >
      {children}
    </ToneContext.Provider>
  );
}

export const useToneContext = () => useContext(ToneContext);
