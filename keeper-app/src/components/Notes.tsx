import * as React from "react";

type NoteProps = {
  arrayOfNotes: { key: number; title: string; content: string }[];
};

function Note({ arrayOfNotes }: NoteProps) {
  return (
    <>
      {arrayOfNotes.map((noteItem) => (
        <div className="note" key={noteItem.key}>
          <h1>{noteItem.title}</h1>
          <p>{noteItem.content}</p>
        </div>
      ))}
    </>
  );
}

export default Note;
