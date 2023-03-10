import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  ProjectBar,
  ProjectInfo,
  TransportControls,
} from '../components/ProjectBar';
import { Transport } from 'tone';
import { ContextStarter } from '../components/ContextStarter';
import { SequenceEditor } from '../components/SequenceEditor';
import { useToneContext } from '../components/context/tone';
import { LEDBar } from '../components/LEDBar';
import { useProjectContext } from '../components/context/project';
import { AppTitle } from '../components/AppTitle';
import { splitArray } from '../components/utils';
import { KnobContainer, KnobGrid } from '../components/knob/KnobGrid';
import { PresetSelector } from '../components/PresetSelector';

const IndexPage: NextPage = () => {
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
      <ProjectBar>
        <ProjectInfo />
        <TransportControls />
      </ProjectBar>

      <ContextStarter />
      <AppTitle />

      <div className='flex justify-center mb-24'>
        <div className='flex flex-col p-4'>
          <div className='flex flex-col px-3 py-2 mb-4 rounded-lg bg-[#060606]'>
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

          <KnobContainer className='bg-[#060606] rounded-lg relative'>
            <KnobGrid
              className='max-w-[720px] max-h-[720px] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw]'
              values={probData}
              rows={8}
              columns={8}
              gridTemplateAreas={`'zero hl hl hl hl hl hl hl'
              'vl d d d d d d d'
              'vl d d d d d d d'
              'vl d d d d d d d'
              'vl d d d d d d d'
              'vl d d d d d d d'
              'vl d d d d d d d'
              'vl d d d d d d d'`}
              horizontalLabels={
                <div
                  className='flex items-end justify-center pb-2'
                  style={{ gridArea: 'hl' }}
                >
                  {['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'].map(
                    (label, index) => (
                      <span
                        className='flex-1 inline-block text-xs text-center text-neutral-500'
                        key={index}
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>
              }
              verticalLabels={
                <div
                  className='flex flex-col items-end justify-center pr-2'
                  style={{ gridArea: 'vl' }}
                >
                  {['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'].map(
                    (label, index) => (
                      <div className='flex items-center flex-1' key={index}>
                        <span className='inline-block text-xs text-center text-neutral-500'>
                          {label}
                        </span>
                      </div>
                    )
                  )}
                </div>
              }
            >
              <div style={{ gridArea: 'zero' }}></div>
            </KnobGrid>
          </KnobContainer>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
