import * as React from "react";

type NoteItemProps = {
  noteItem: { key: number; title: string; content: string };
  deleteNote: (key: number) => void;
};
function NoteItem({ noteItem, deleteNote }: NoteItemProps) {
  const handleOnButtonClick = () => {
    deleteNote(noteItem.key);
  };

  return (
    <div className="note" key={noteItem.key}>
      <h1>{noteItem.title}</h1>
      <p>{noteItem.content}</p>
      <button type="button" onClick={handleOnButtonClick}>
        DELETE
      </button>
    </div>
  );
}

export default NoteItem;
