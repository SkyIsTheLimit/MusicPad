import { HTMLAttributes } from 'react';

export function AppTitle({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='flex justify-center mt-12'>
      <h1 className='font-sans text-6xl font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-900'>
        Music Pad
      </h1>
      {children}
    </div>
  );
}
