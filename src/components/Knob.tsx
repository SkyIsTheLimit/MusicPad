import { useEffect, useRef, useState } from 'react';
import { getPath } from './utils';

export interface KnobParams {
  min?: number;
  max?: number;
  value: number;
  radius?: number;
}

export interface Touchable {
  showOverlay: () => void;
  hideOverlay: () => void;
}

export function Knob({
  min,
  max,
  value: value_,
  radius,
  showOverlay,
  hideOverlay,
}: KnobParams & Touchable) {
  const divRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState('');
  const [value, setValue] = useState(value_ || 0);
  const [touchStarted, setTouchStarted] = useState(-1);

  useEffect(() => {
    const divRefCopy = divRef;
    let maxSpeed = 1;

    function updateKnobValue(newValue: number) {
      const minLimit = min || 0;
      const maxLimit = max || 100;

      if (newValue >= minLimit && newValue <= maxLimit) {
        setValue(newValue);
      }
    }

    function handleWheel(e: WheelEvent) {
      e.stopPropagation();
      e.preventDefault();

      if (Math.abs(e.deltaY) > maxSpeed) {
        maxSpeed = Math.abs(e.deltaY) || 1;
      }

      const speed = (e.deltaY / maxSpeed) * 2;

      updateKnobValue(Math.round(value + speed));

      return false;
    }

    function touchStart(e: TouchEvent) {
      e.preventDefault();
      e.stopPropagation();
      setTouchStarted(e.touches[0].clientY);
      showOverlay();
    }

    function touchMove(e: TouchEvent) {
      if (touchStarted !== -1) {
        const diff = touchStarted - e.changedTouches[0].clientY;

        updateKnobValue(Math.round(value + diff));

        setTouchStarted(e.changedTouches[0].clientY);
      }
    }

    function touchEnd(e: TouchEvent) {
      setTouchStarted(-1);
      hideOverlay();
    }

    if (divRefCopy && divRefCopy.current) {
      divRefCopy.current.addEventListener('wheel', handleWheel, {
        passive: false,
      });

      divRefCopy.current.addEventListener('touchstart', touchStart);
      divRefCopy.current.addEventListener('touchmove', touchMove);
      divRefCopy.current.addEventListener('touchend', touchEnd);
    }

    return () => {
      if (divRefCopy && divRefCopy.current) {
        divRefCopy.current.removeEventListener('wheel', handleWheel);
        divRefCopy.current.removeEventListener('touchstart', touchStart);
        divRefCopy.current.removeEventListener('touchmove', touchMove);
        divRefCopy.current.removeEventListener('touchend', touchEnd);
      }
    };
  }, [divRef, min, max, value, showOverlay, hideOverlay, touchStarted]);

  useEffect(() => {
    if (radius) {
      const minLimit = min || 0;
      const maxLimit = max || 100;
      setPath(
        getPath(radius)(359 * ((value - minLimit) / (maxLimit - minLimit)))
      );
    }
  }, [radius, setPath, min, max, value]);

  return (
    <div
      className={`relative flex items-center justify-center rounded-full cursor-pointer ${
        touchStarted !== -1 ? 'z-40 shadow-lg right-16' : ''
      }`}
      ref={divRef}
    >
      <div className='absolute w-full h-full rounded-full bg-[#111] z-0'></div>
      <svg className='absolute z-10 w-full h-full p-0 bg-transparent rounded-full peer group'>
        <g>
          <path
            className='fill-transparent stroke-[#7EFF69] opacity-50 group-hover:opacity-100'
            strokeWidth={`${(radius || 50) / 7.5}`}
            d={path}
          ></path>
        </g>
      </svg>

      <div className='z-0 flex flex-col items-center w-full text-[0.5em] md:text-[0.75em] text-neutral-500 peer-hover:font-bold peer-hover:text-neutral-100'>
        <span className='inline-block'>{value}</span>
        <span className='text-[6px] md:text-[0.5em] leading-none indent-1 !font-normal !text-neutral-500 inline-block'>
          /{max || 100}
        </span>
      </div>
    </div>
  );
}
