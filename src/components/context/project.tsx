import {
  createContext,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Transport } from 'tone';
import { useToneContext } from './tone';
import { KeySignature, TimeSignature } from './utils';

export interface ProjectContext {
  name: string;
  tempo: number;
  keySignature: KeySignature;
  timeSignature: TimeSignature;
  sequencerPattern: string[];
}

export interface ProjectContextApi {
  setName: Dispatch<SetStateAction<string>>;
  setTempo: Dispatch<SetStateAction<number>>;
  setKeySignature: Dispatch<SetStateAction<KeySignature>>;
  setTimeSignature: Dispatch<SetStateAction<TimeSignature>>;
  setSequencerPattern: Dispatch<SetStateAction<string[]>>;
}

const defaultCtx: ProjectContext & ProjectContextApi = {
  name: 'Untitled Song',
  tempo: 120,
  keySignature: {
    root: 'C',
    mode: 'major',
  },
  timeSignature: [4, 4],
  sequencerPattern: ['x---', 'x---', 'x---', 'x---'],

  setName: () => {},
  setTempo: () => {},
  setKeySignature: () => {},
  setTimeSignature: () => {},
  setSequencerPattern: () => {},
};

export const ProjectContext = createContext<ProjectContext & ProjectContextApi>(
  defaultCtx
);
export function ProjectProvider({ children }: HTMLAttributes<HTMLElement>) {
  const [name, setName] = useState(defaultCtx.name);
  const [tempo, setTempo] = useState(defaultCtx.tempo);
  const [keySignature, setKeySignature] = useState(defaultCtx.keySignature);
  const [timeSignature, setTimeSignature] = useState(defaultCtx.timeSignature);
  const [sequencerPattern, setSequencerPattern] = useState(
    defaultCtx.sequencerPattern
  );
  const { setTempo: setTempoOnTone, setTimeSignature: setTimeSignatureOnTone } =
    useToneContext();

  useEffect(() => {
    setTempo(Transport.bpm?.value);
  }, []);

  useEffect(() => {
    setTempoOnTone(tempo);
  }, [tempo, setTempoOnTone]);

  useEffect(() => {
    setTimeSignatureOnTone(timeSignature);
  }, [timeSignature, setTimeSignatureOnTone]);

  return (
    <ProjectContext.Provider
      value={{
        name,
        tempo,
        keySignature,
        timeSignature,
        sequencerPattern,

        setName,
        setTempo,
        setKeySignature,
        setTimeSignature,
        setSequencerPattern,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
