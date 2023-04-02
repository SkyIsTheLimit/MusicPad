import { NextPage } from 'next';
import { AppTitle } from '@/components/AppTitle';
import { PianoPlayer } from '@/components/controllers/PianoPlayer';
import { UIController } from '@/components/controllers/UIController';
import { ToneController } from '@/components/controllers/ToneController';
import { useProjectContext } from '@/components/context/project';
import { useEffect } from 'react';

const IndexPage: NextPage = () => {
  const { dispatch } = useProjectContext();

  useEffect(() => {
    dispatch({
      type: 'project:update',
      data: {
        name: 'Music Pad Demo',
        sequencerPattern: ['xxxx', 'xx-x', 'xxxx', '--xx'],
        tempo: 100,
        timeSignature: [4, 8],
        keySignature: { root: 'C', mode: 'lydian' },
        data: [
          [0, 12, 25, 50, 75, 50, 5],
          [0, 0, 25, 50, 75, 0, 87],
          [25, 0, 0, 75, 12, 50, 0],
          [0, 0, 0, 25, 75, 50, 0],
          [0, 0, 0, 50, 25, 75, 0],
          [0, 0, 0, 75, 50, 0, 50],
          [100, 0, 0, 50, 75, 50, 0],
        ],
      },
    });
  }, [dispatch]);

  return (
    <>
      <AppTitle />

      <PianoPlayer />
      <ToneController />
      <UIController />
    </>
  );
};

export default IndexPage;
