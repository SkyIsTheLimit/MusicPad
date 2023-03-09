import { useEffect, useState } from 'react';
import Knob from './knob';

export function KnobGrid(props: {
  probData?: number[][];
  onGridDataChanged?: (gridData: number[][]) => void;
  onGridData?: (grid: { getData: () => number[][] }) => void;
}) {
  const [probData, setProbData] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    if (props.probData) {
      setProbData(props.probData);
    }
  }, [props.probData]);

  useEffect(() => {
    if (props.onGridData) {
      props.onGridData({
        getData: () => {
          return probData;
        },
      });
    }
  }, []);

  const scaleDegrees = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'];

  const horizontalScaleLabels = [...scaleDegrees].map((degree, index) => (
    <div className='flex justify-center flex-1 text-neutral-500' key={index}>
      <span>{degree}</span>
    </div>
  ));
  const verticalScaleLabels = [...scaleDegrees].map((degree, index) => (
    <div
      className='flex items-center justify-center flex-1 text-neutral-500'
      key={index}
    >
      <span>{degree}</span>
    </div>
  ));

  const knobs = probData.map((row, index1) =>
    row.map((value, index2) => (
      <Knob
        key={(index1 + 1) * (index2 + 1)}
        isContinuous={false}
        min={0}
        max={100}
        radius={40}
        value={value}
        onValueChanged={(newValue) => {
          probData[index1][index2] = newValue;
          if (props.onGridDataChanged) props.onGridDataChanged(probData);
        }}
      ></Knob>
    ))
  );

  return (
    <div className='inline-grid grid-cols-8 mx-auto outer-grid grid-rows-[8] pr-8 pb-8 rounded-md mt-4'>
      <div className='zero'></div>
      <div className='flex my-8 hl'>{horizontalScaleLabels}</div>
      <div className='flex flex-col vl'> {verticalScaleLabels}</div>
      <div className='grid-cols-7 grid-rows-[7] inline-grid mx-auto gap-4 d'>
        {knobs}
      </div>
    </div>
  );
}
