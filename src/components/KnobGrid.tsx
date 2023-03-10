import {
  HTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Knob } from './Knob';

export interface KnobGridParams {
  values: number[][];
  rows: number;
  columns: number;
  gridTemplateAreas: string;
  horizontalLabels: ReactElement;
  verticalLabels: ReactElement;
}

export function KnobContainer({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={className || ''}>{children}</div>;
}

export function KnobGrid({
  values,
  rows,
  columns,
  gridTemplateAreas,
  className,
  horizontalLabels,
  verticalLabels,
  children,
}: KnobGridParams & HTMLAttributes<HTMLDivElement>) {
  const divRef = useRef<HTMLDivElement>(null);
  const [computedKnobRadius, setComputedKnobRadius] = useState(40);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const showOverlay = () => setOverlayVisible(true);
  const hideOverlay = () => setOverlayVisible(false);

  const knobGrid = values.map((columns) =>
    columns.map((column, index) => (
      <Knob
        value={column}
        key={index}
        radius={computedKnobRadius}
        showOverlay={showOverlay}
        hideOverlay={hideOverlay}
      />
    ))
  );

  function handleKnobSizes() {
    if (divRef && divRef.current) {
      const computedStyles = window.getComputedStyle(divRef.current);
      const radius =
        parseInt(computedStyles.gridTemplateColumns.split(' ')[0]) / 2;

      setComputedKnobRadius(radius);
    }
  }

  useEffect(() => handleKnobSizes(), [divRef]);

  useEffect(() => {
    window.addEventListener('resize', handleKnobSizes);

    return () => window.removeEventListener('resize', handleKnobSizes);
  }, []);

  return (
    <>
      {overlayVisible && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-80'></div>
      )}
      <div
        ref={divRef}
        className={`grid gap-2 w-full h-full mr-8 mb-8 ${className || ''}`}
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateAreas,
        }}
      >
        {knobGrid}
        {horizontalLabels}
        {verticalLabels}
        {children}
      </div>
    </>
  );
}
