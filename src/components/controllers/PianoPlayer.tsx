import { useCallback, useEffect, useRef } from 'react';
import { Piano, usePiano } from '../context/piano';
import { Transport } from 'tone';
import { useProjectContext } from '../context/project';
import { useToneContext } from '../context/tone';
import { getNextNote } from '../utils';
import { Time } from 'tone/build/esm/core/type/Units';

function playNotes(notes: string[], duration: Time, piano: Piano) {
  if (piano && piano.isLoaded() && piano.triggerAttackRelease) {
    piano.triggerAttackRelease(notes, duration);
  }
}

export function PianoPlayer() {
  const { piano } = usePiano();
  const { project, dispatch } = useProjectContext();
  const { currentBeat, setCurrentBeat, scaleNotes, transportState } =
    useToneContext();
  const transportSchedulerId = useRef<number | null>(null);
  const noteToPlayRef = useRef<number>(project.currentNote);

  const perform = useCallback(
    (currentBeat: number) => {
      const sequence = project.sequencerPattern.join('');
      const currSeq = sequence.charAt(currentBeat);

      if (currSeq === 'x' && transportState === 'started') {
        const noteToPlay = getNextNote(
          noteToPlayRef.current,
          project.data[noteToPlayRef.current]
        );

        if (piano) {
          playNotes(
            [scaleNotes[noteToPlay]],
            `${project.timeSignature[1]}n`,
            piano
          );
        }

        dispatch({
          type: 'project:update',
          data: {
            previousNote: noteToPlayRef.current,
            currentNote: noteToPlay,
          },
        });
        noteToPlayRef.current = noteToPlay;
      }
    },
    [
      piano,
      scaleNotes,
      transportState,
      dispatch,
      project.timeSignature,
      project.data,
      project.sequencerPattern,
    ]
  );

  useEffect(() => {
    perform(currentBeat);
  }, [currentBeat, perform]);

  useEffect(() => {
    if (transportSchedulerId.current === null) {
      transportSchedulerId.current = Transport.scheduleRepeat(() => {
        setCurrentBeat(
          (currentBeat) => (currentBeat + 1) % (4 * project.timeSignature[0])
        );
      }, `${project.timeSignature[1]}n`);
    }

    return () => {
      if (transportSchedulerId.current !== null) {
        Transport.clear(transportSchedulerId.current);
        transportSchedulerId.current = null;
      }
    };
  }, [project.timeSignature, transportSchedulerId, setCurrentBeat]);

  return <></>;
}
