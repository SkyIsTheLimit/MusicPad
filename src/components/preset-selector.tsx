import { useEffect, useState } from 'react';

function createRandomPreset() {
  return new Array(7)
    .fill(0)
    .map(() => [
      ...new Array(7).fill(0).map(() => Math.round(Math.random() * 100) % 100),
    ]);
}

export function PresetSelector(props: {
  onPresetSelected: (preset: number[][]) => void;
}) {
  const [presets, setPresets] = useState([
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
    createRandomPreset(),
  ]);
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);

  useEffect(() => {
    if (props.onPresetSelected) props.onPresetSelected(selectedPreset);
  }, []);

  return (
    <div className='p-4 mt-8 ml-8 rounded-md bg-neutral-900'>
      <h2 className='mb-4 font-bold text-center underline underline-offset-2 text-neutral-500'>
        Preset List
      </h2>
      {presets.map((preset, index) => (
        <div
          key={index}
          className={`px-8 py-2 rounded-md mb-4 cursor-pointer  w-full ${
            selectedPreset === preset
              ? 'text-white font-bold bg-neutral-800'
              : 'text-neutral-500'
          }`}
          onClick={() => {
            setSelectedPreset(preset);
            props.onPresetSelected(preset);
          }}
        >
          <span>Preset {index}</span>
        </div>
      ))}
    </div>
  );
}
