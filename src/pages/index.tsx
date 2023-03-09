import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ProjectBar } from '../components/ProjectBar';
import { KnobGrid } from '../components/knob/knob-grid';
import { Transport } from 'tone';
import { ContextStarter } from '../components/ContextStarter';
import { SequenceEditor } from '../components/SequenceEditor';
import { useToneContext } from '../components/context/tone';
import { LEDBar } from '../components/LEDBar';
import { useProjectContext } from '../components/context/project';
import { AppTitle } from '../components/AppTitle';
import { splitArray } from '../components/context/utils';
import { PresetSelector } from '../components/preset-selector';

const M: NextPage = () => {
  const [probData, setProbData] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const [measureCount] = useState(4);
  const { timeSignature, sequencerPattern, setSequencerPattern } =
    useProjectContext();
  const { transportState } = useToneContext();
  const [currentBeat, setCurrentBeat] = useState(0);

  useEffect(() => {
    setSequencerPattern((patterns) => {
      return patterns.map((pattern) => {
        const newLength = timeSignature[0];

        if (newLength > pattern.length) {
          return `${pattern}${new Array(newLength - pattern.length)
            .fill('-')
            .join('')}`;
        } else {
          return pattern.substring(0, newLength);
        }
      });
    });
  }, [timeSignature, setSequencerPattern]);

  function toggle(index: number) {
    setSequencerPattern((measurePatterns) => {
      const full = measurePatterns.join('');
      const existing = full.charAt(index);
      const fullArray = full.split('');

      return splitArray(
        [
          ...fullArray.slice(0, index),
          existing === '-' ? 'x' : '-',
          ...fullArray.slice(index + 1, fullArray.length),
        ],
        timeSignature[0]
      ).map((patternArr) => patternArr.join(''));
    });
  }

  useEffect(() => {
    const id = Transport.scheduleRepeat((time) => {
      setCurrentBeat(
        (currBeat) => (currBeat + 1) % (measureCount * timeSignature[0])
      );
    }, `${timeSignature[1]}n`);

    return () => {
      Transport.clear(id);
    };
  }, [transportState, timeSignature, measureCount]);

  return (
    <>
      <ProjectBar />
      <ContextStarter />
      <AppTitle />

      <div className='flex justify-center'>
        <div className='flex flex-col p-4'>
          <div className='flex flex-col px-3 py-2 m-4 rounded-lg bg-[#060606]'>
            <SequenceEditor
              measureCount={measureCount}
              timeSignature={timeSignature}
              pattern={sequencerPattern}
              onToggle={(index) => toggle(index)}
            />

            <LEDBar
              ledCount={measureCount * timeSignature[0]}
              activeLed={currentBeat}
            />
          </div>

          <div className='rounded-lg bg-[#060606] p-4 mx-4'>
            <KnobGrid probData={probData} />
          </div>
        </div>

        {/* <PresetSelector
          onPresetSelected={(preset) => {
            setProbData(preset);
          }}
        ></PresetSelector> */}
      </div>
    </>
  );
};

export default M;
