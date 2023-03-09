import { HTMLAttributes } from 'react';

export function AppTitle({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='flex justify-center mt-4'>
      <h1 className='fixed font-sans text-6xl font-bold uppercase -rotate-90 bottom-[50%] -left-20 text-neutral-800'>
        Music Pad
      </h1>
      {children}
    </div>
  );
}
