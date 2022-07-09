import * as React from "react";
import uniqueRandom from "unique-random";
import NoteItem from "./NoteItem";
import InputNote from "./InputNote";

const random = uniqueRandom(10, 99999999);

type NoteProps = {
  arrayOfNotes: { key: number; title: string; content: string }[];
};
function Note({ arrayOfNotes }: NoteProps) {
  const [notesArr, setNotesArr] = React.useState(arrayOfNotes);

  type NoteType = { title: string; content: string };
  const addToNote = ({ title, content }: NoteType) => {
    const noteKey = random();
    setNotesArr([...notesArr, { key: noteKey, title, content }]);
  };

  const deleteNote = (key: number) => {
    const newArray = notesArr.filter((item) => item.key !== key);
    setNotesArr(newArray);
  };

  return (
    <>
      <InputNote addToNote={addToNote} />
      {notesArr.map((noteItem) => (
        <NoteItem
          key={noteItem.key}
          noteItem={noteItem}
          deleteNote={deleteNote}
        />
      ))}
    </>
  );
}

export default Note;
