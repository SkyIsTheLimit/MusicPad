import {
  HTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Knob } from './Knob';

export interface KnobGridParams {
  highlight: [number, number];
  values: number[][];
  rows: number;
  columns: number;
  gridTemplateAreas: string;
  horizontalLabels: ReactElement;
  verticalLabels: ReactElement;
  onValueChanged?: (values: number[][]) => void;
}

export function KnobContainer({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={className || ''}>{children}</div>;
}

export function KnobGrid({
  highlight,
  values,
  rows,
  columns,
  gridTemplateAreas,
  className,
  horizontalLabels,
  verticalLabels,
  children,
  onValueChanged,
}: KnobGridParams & HTMLAttributes<HTMLDivElement>) {
  const divRef = useRef<HTMLDivElement>(null);
  const [computedKnobRadius, setComputedKnobRadius] = useState(40);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const showOverlay = () => setOverlayVisible(true);
  const hideOverlay = () => setOverlayVisible(false);

  function valueChanged(row: number, column: number) {
    return (value: number) => {
      if (onValueChanged) {
        const newValues = [...values];
        newValues[row][column] = value;
        onValueChanged(newValues);
      }
    };
  }

  const knobGrid = values.map((columns, row) =>
    columns.map((value, column) => (
      <Knob
        highlighted={row === highlight[0] && column === highlight[1]}
        value={value}
        key={column}
        radius={computedKnobRadius}
        showOverlay={showOverlay}
        hideOverlay={hideOverlay}
        onValueChanged={valueChanged(row, column)}
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
        className={`grid gap-2 mr-8 mb-8 ${className || ''}`}
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
