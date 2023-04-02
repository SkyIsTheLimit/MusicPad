import {
  Dispatch,
  createContext,
  HTMLAttributes,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Transport } from 'tone';
import { useToneContext } from './tone';
import { KeySignature, TimeSignature } from '../utils';

export interface Project {
  name: string;
  tempo: number;
  keySignature: KeySignature;
  timeSignature: TimeSignature;
  sequencerPattern: string[];
  data: number[][];
  previousNote: number;
  currentNote: number;
  highlight: [number, number];
}

export interface ProjectContextApi {
  project: Project;
  dispatch: Dispatch<{ type: string; data: Partial<Project> }>;
  setProject(project: Partial<Project>): void;
}
const defaultProject: Project = {
  name: 'Untitled Song',
  tempo: 80,
  keySignature: {
    root: 'C',
    mode: 'major',
  },
  timeSignature: [4, 4],
  sequencerPattern: ['----', '----', '----', '----'],
  data: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  previousNote: 0,
  currentNote: 0,
  highlight: [0, 0],
};

const defaultCtx: ProjectContextApi = {
  project: defaultProject,

  dispatch() {},
  setProject() {},
};

function projectReducer(
  state: Project,
  action: { type: string; data: Partial<Project> }
): Project {
  switch (action.type) {
    case 'project:update':
    case 'project:tempo':
    case 'project:keySignature':
    case 'project:timeSignature':
    case 'project:sequencePattern':
    case 'project:data':
    case 'project:currentNote':
    case 'project:highlight':
      return { ...state, ...action.data };

    default:
      return { ...state, ...action.data };
  }
}

export const ProjectContext = createContext<ProjectContextApi>(defaultCtx);
export function ProjectProvider({ children }: HTMLAttributes<HTMLElement>) {
  const [project, dispatch] = useReducer(projectReducer, defaultProject);

  function setProject(project: Project) {
    dispatch({
      type: 'project:update',
      data: { ...defaultProject, ...project },
    });
  }

  return (
    <ProjectContext.Provider
      value={{
        project: { ...defaultProject, ...project },
        dispatch,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
