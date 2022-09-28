export function Header(props: { children: any }) {
  return (
    <div className='flex justify-center mt-4'>
      <h1 className='fixed font-sans text-6xl font-extralight uppercase -rotate-90 bottom-[30vw] -left-20 text-neutral-800'>
        Music Pad
      </h1>
      {props.children}
    </div>
  );
}
