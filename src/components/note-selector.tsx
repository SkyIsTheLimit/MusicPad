import { useState } from 'react';
import { EighthNote } from './notes/eighth';
import { HalfNote } from './notes/half';
import { QuarterNote } from './notes/quarter';
import { SixteenthNote } from './notes/sixteenth';

export function NoteSelector(props: {
  onNoteSelected?: (note: string) => void;
}) {
  const [selectedNote, setSelectedNote] = useState('half');

  const createNoteSelectedHandler = (note: string) => () => {
    setSelectedNote(note);
    if (props.onNoteSelected) props.onNoteSelected(note);
  };

  return (
    <div className='inline-flex px-8 py-0 mx-2 my-4 rounded-md cursor-pointer bg-neutral-900'>
      <HalfNote
        selected={selectedNote === 'half'}
        onClick={createNoteSelectedHandler('half')}
      ></HalfNote>
      <QuarterNote
        selected={selectedNote === 'quarter'}
        onClick={createNoteSelectedHandler('quarter')}
      ></QuarterNote>
      <EighthNote
        selected={selectedNote === 'eighth'}
        onClick={createNoteSelectedHandler('eighth')}
      ></EighthNote>
      <SixteenthNote
        selected={selectedNote === 'sixteenth'}
        onClick={createNoteSelectedHandler('sixteenth')}
      ></SixteenthNote>
    </div>
  );
}
