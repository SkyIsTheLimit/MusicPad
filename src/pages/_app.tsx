import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ToneProvider } from '@/components/context/tone';
import { ProjectProvider } from '@/components/context/project';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToneProvider>
      <ProjectProvider>
        <Component {...pageProps} />
      </ProjectProvider>
    </ToneProvider>
  );
}

export default MyApp;
