import * as React from "react";

type NoteType = { title: string; content: string };
type InputNoteProps = { addToNote: ({ title, content }: NoteType) => void };
function InputNote({ addToNote }: InputNoteProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleOnTitleChange = (event: { target: { value: string } }) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
  };

  const handleOnContentChange = (event: { target: { value: string } }) => {
    const inputContent = event.target.value;
    setContent(inputContent);
  };

  const handleSubmitOnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (title !== "" && content !== "") {
      addToNote({ title, content });
      setTitle("");
      setContent("");
    } else {
      alert("Please provide values for the Title and Content");
    }
  };

  return (
    <form className="formInput">
      <input
        placeholder="Type the title here"
        value={title}
        onChange={handleOnTitleChange}
        className="formInput-title"
        required
      />
      <input
        placeholder="Type the content here"
        value={content}
        onChange={handleOnContentChange}
        className="formInput-content"
        required
      />
      <input
        type="submit"
        value="Add to Note"
        onClick={handleSubmitOnClick}
        className="formInput-button"
      />
    </form>
  );
}

export default InputNote;
