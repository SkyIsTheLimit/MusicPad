import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { KnobGrid } from '../components/knob-grid';
import { NoteSelector } from '../components/note-selector';
import { PresetSelector } from '../components/preset-selector';
import { TempoSelector } from '../components/tempo-selector';
import { TransportControls } from '../components/transport-controls';

const Home: NextPage = () => {
  const [startingNote, setStartingNote] = useState(0);
  const [currentNote, setCurrentNote] = useState(startingNote);
  const [nextNote, setNextNote] = useState(-1);
  const [gridData, setGridData] = useState([[]] as number[][]);
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
    if (gridData) {
      // Obtain possible paths from current note.

      const weights = gridData[currentNote];
      const total = weights.reduceRight(
        (agg: number, curr: number) => agg + curr,
        0
      );
      const probabilities = weights.map((weight) => Math.round(weight / total));

      console.log('Probabilities', weights, total, probabilities);
    }
  }, [startingNote, nextNote, gridData]);

  return (
    <>
      {' '}
      <Head>
        <title>Music Pad</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex justify-center'>
        <div>
          <Header>
            <NoteSelector></NoteSelector>
            <TempoSelector></TempoSelector>
            <TransportControls></TransportControls>
          </Header>
          <div className='flex items-center'>
            <KnobGrid probData={probData}></KnobGrid>
          </div>
        </div>

        <PresetSelector
          onPresetSelected={(preset) => {
            console.log('Setting preset', preset);
            setProbData(preset);
          }}
        ></PresetSelector>
      </div>
    </>
  );
};

export default Home;