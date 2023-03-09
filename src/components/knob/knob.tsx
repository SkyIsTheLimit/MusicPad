import { useEffect, useRef, useState } from 'react';
import {
  getPathDStringFunction,
  KnobOptions,
  KnobOptionsFull,
} from './circle-arc';

export interface KnobProps extends KnobOptions {
  onValueChanged?: (newValue: number) => void;
}

export default function Knob(props: KnobProps) {
  const [value, setValue] = useState(props.value);
  const [knobData, setKnobData] = useState({ ...props });
  const [redArcPathD, setRedArcPathD] = useState('');
  const [greenArcPathD, setGreenArcPathD] = useState('');
  const defaultOptions: KnobOptionsFull = {
    options: props,
    radius: props.radius || 35,
    rotation: 0,
    t1: 90,
  };
  const knobDiv = useRef<HTMLDivElement>(null);

  const [isMouseDown, setMouseDown] = useState(false);

  const redArcD = getPathDStringFunction(defaultOptions);
  const greenArcD = getPathDStringFunction({
    ...defaultOptions,
    radius: defaultOptions.radius * 1.0,
    cx: defaultOptions.radius,
    cy: defaultOptions.radius,
  });

  useEffect(() => {
    function updateKnobValue(newValue: number) {
      if (newValue >= props.min && newValue <= props.max) {
        setValue(newValue);
        if (props.onValueChanged) props.onValueChanged(newValue);
      }
    }

    let maxSpeed = 1;

    setInterval(() => (maxSpeed = 0), 300);

    knobDiv.current?.addEventListener(
      'wheel',
      function onWheel(e: any) {
        // console.log('Wheel', e, value);
        e.stopPropagation();
        e.preventDefault();

        if (Math.abs(e.deltaY) > maxSpeed) {
          maxSpeed = Math.abs(e.deltaY) || 1;
        }

        const speed = (e.deltaY / maxSpeed) * 2;

        // if (e.deltaY > 0) {
        updateKnobValue(Math.round(value + speed));
        // } else {
        // updateKnobValue(value - speed);
        // }

        return false;
      },
      { passive: false }
    );
  }, [props, value]);

  useEffect(() => {
    setValue(props.value);
  }, [props]);

  useEffect(() => {
    // setRedArcPathD(redArcD(359 * (value / props.max)));
    setGreenArcPathD(greenArcD(359 * (value / props.max)));
  }, [knobData, redArcD, greenArcD, props, value]);

  function performDrag(e: any) {
    console.log('Perfrom Drag', e);
  }

  return (
    <div
      className='relative items-center justify-center inline-block text-center rounded-full cursor-pointer w-fit bg-[#111] opacity-50 hover:opacity-100'
      // onWheel={captureWheel}
      onDragEnter={performDrag}
      onDrag={performDrag}
      onDragExit={performDrag}
      ref={knobDiv}
    >
      <svg
        width={defaultOptions.radius * 2}
        height={defaultOptions.radius * 2}
        className='p-0 bg-transparent'
      >
        <g>
          <path
            className='fill-transparent stroke-red-400'
            strokeWidth={defaultOptions.radius * 0.2}
            d={redArcPathD}
          />

          <path
            className='fill-transparent stroke-[#7EFF69]'
            strokeWidth={defaultOptions.radius * 0.2}
            d={greenArcPathD}
          />
        </g>
      </svg>
      <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
        <span className='text-xs font-bold text-center text-neutral-500'>
          {value}
        </span>
      </div>
    </div>
  );
}
