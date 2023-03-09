export interface LEDProps {
  state: 'on' | 'off';
  color: 'blue' | 'green';
}

export function LED({ state, color }: LEDProps) {
  const bg =
    state === 'off' ? '#111' : color === 'blue' ? '#73DDFF' : '#7EFF69';

  return (
    <div
      style={{
        backgroundColor: bg,
      }}
      className={`${
        state === 'on' && 'blur-[0.05em]'
      } mx-auto rounded-full w-[0.6rem] h-[0.6rem]`}
    ></div>
  );
}

export interface LEDBarProps {
  ledCount: number;
  activeLed: number;
}

export function LEDBar({ ledCount, activeLed }: LEDBarProps) {
  return (
    <div
      className='grid gap-1 mt-2'
      style={{ gridTemplateColumns: `repeat(${ledCount}, minmax(0, 1fr)` }}
    >
      {new Array(ledCount).fill(-1).map((_, index) => (
        <LED
          key={index}
          color='blue'
          state={activeLed === index ? 'on' : 'off'}
        />
      ))}
    </div>
  );
}
