import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ToneProvider } from '@/components/context/tone';
import { ProjectProvider } from '@/components/context/project';
import { PianoProvider } from '@/components/context/piano';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToneProvider>
      <ProjectProvider>
        <PianoProvider>
          <Component {...pageProps} />
        </PianoProvider>
      </ProjectProvider>
    </ToneProvider>
  );
}

export default MyApp;
