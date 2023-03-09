import React from 'react';
import { TransportControls, TransportInfo } from './components/transport/types';

export interface ProjectDefinition {
  name: string;
  transportInfo: TransportInfo;
  gridPattern: number[][];
}

export interface ProjectParams {
  project: ProjectDefinition;
}

const Project = ({ project }: ProjectParams) => {
  const {
    play,
    stop,
    get: getTransportInfo,
    set,
  }: TransportControls = useTransport(project.transportInfo);
  const { tempo, timeSignature, currentBeat, key, keySignature } =
    getTransportInfo();

  return (
    <>
      <RhythmDesigner>
        <BeatIndicator currentBeat={currentBeat} />
      </RhythmDesigner>

      <KnobGrid />

      <ProjectInfo
        projectName={project.name}
        tempo={tempo}
        keySignature={keySignature}
        timeSignature={timeSignature}
      >
        <TransportControls onPlay={play} onStop={stop} />
      </ProjectInfo>
    </>
  );
};

export default Index;
