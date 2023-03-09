import { useEffect, useState } from 'react';
import { EighthNote } from './eighth';
import { HalfNote } from './half';
import { QuarterNote } from './quarter';
import { SixteenthNote } from './sixteenth';

export function NoteSelector(props: {
  selectedNote?: string;
  onNoteSelected?: (note: string) => void;
}) {
  const [selectedNote, setSelectedNote] = useState(
    props.selectedNote || 'half'
  );

  const createNoteSelectedHandler = (note: string) => () => {
    setSelectedNote(note);
    if (props.onNoteSelected) props.onNoteSelected(note);
  };

  useEffect(() => {
    if (props.selectedNote) setSelectedNote(props.selectedNote);
  }, [props.selectedNote]);

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
