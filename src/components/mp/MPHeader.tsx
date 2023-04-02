import { useState } from 'react';
import { LEDBar } from '../LEDBar';
import { SequenceEditor } from '../SequenceEditor';
import { useProjectContext } from '../context/project';
import { splitArray } from '../utils';
import { useToneContext } from '../context/tone';

export function MPHeader() {
  const { project, dispatch } = useProjectContext();
  const { currentBeat } = useToneContext();
  const [measureCount] = useState(4);

  function toggleSequencerCell(index: number) {
    dispatch({
      type: 'project:update',
      data: {
        sequencerPattern: (() => {
          const full = project.sequencerPattern.join('');
          const existing = full.charAt(index);
          const fullArray = full.split('');

          return splitArray(
            [
              ...fullArray.slice(0, index),
              existing === '-' ? 'x' : '-',
              ...fullArray.slice(index + 1, fullArray.length),
            ],
            project.timeSignature[0]
          ).map((patternArr) => patternArr.join(''));
        })(),
      },
    });
  }

  return (
    <>
      <SequenceEditor
        measureCount={measureCount}
        timeSignature={project.timeSignature}
        pattern={project.sequencerPattern}
        onToggle={(index) => toggleSequencerCell(index)}
      />

      <LEDBar
        ledCount={measureCount * project.timeSignature[0]}
        activeLed={currentBeat}
      />
    </>
  );
}
