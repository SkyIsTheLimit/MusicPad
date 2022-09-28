export function Header(props: { children: any }) {
  return (
    <div className='flex justify-center mt-4'>
      <h1 className='fixed bottom-[20vw] -left-40 text-neutral-800 text-9xl -rotate-90 font-light'>
        Music Pad
      </h1>
      {props.children}
    </div>
  );
}
