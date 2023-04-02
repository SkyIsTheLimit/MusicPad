import { useEffect } from 'react';
import { useProjectContext } from '../context/project';
import { useToneContext } from '../context/tone';
import { ContextStarter } from '../ContextStarter';
import { Scale } from 'tonal';

export function ToneController() {
  const { project } = useProjectContext();
  const { setTempo, setTimeSignature, setScaleNotes } = useToneContext();

  useEffect(() => {
    setTempo(project.tempo);
  }, [project.tempo, setTempo]);

  useEffect(() => {
    setTimeSignature(project.timeSignature);
  }, [project.timeSignature, setTimeSignature]);

  useEffect(() => {
    setScaleNotes(
      Scale.get([
        project.keySignature.root,
        project.keySignature.mode,
      ]).notes.map((note) => `${note}${4}`)
    );
  }, [project.keySignature, setScaleNotes]);

  return <ContextStarter />;
}
