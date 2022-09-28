import {
  MouseEvent as ReactMouseEvent,
  UIEvent,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react';
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
    radius: props.radius || 25,
    rotation: 0,
    t1: 90,
  };

  const [isMouseDown, setMouseDown] = useState(false);

  const redArcD = getPathDStringFunction(defaultOptions);
  const greenArcD = getPathDStringFunction({
    ...defaultOptions,
    radius: defaultOptions.radius * 0.8,
    cx: defaultOptions.radius,
    cy: defaultOptions.radius,
  });

  useEffect(() => {
    setValue(props.value);
  }, [props]);

  useEffect(() => {
    // setRedArcPathD(redArcD(359 * (value / props.max)));
    setGreenArcPathD(greenArcD(359 * (value / props.max)));
  }, [knobData, redArcD, greenArcD, props, value]);

  function updateKnobValue(newValue: number) {
    if (newValue >= props.min && newValue <= props.max) {
      setValue(newValue);
      if (props.onValueChanged) props.onValueChanged(newValue);
    }
  }

  function captureWheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      updateKnobValue(value + 1);
    } else {
      updateKnobValue(value - 1);
    }
  }

  return (
    <div
      className='relative items-center justify-center inline-block text-center rounded-full cursor-pointer w-fit bg-neutral-800'
      onWheel={captureWheel}
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
            className='fill-transparent stroke-green-400'
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
