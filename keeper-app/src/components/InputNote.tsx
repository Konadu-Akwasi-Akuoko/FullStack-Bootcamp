import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

type NoteType = { title: string; content: string };
type InputNoteProps = { addToNote: ({ title, content }: NoteType) => void };
function InputNote({ addToNote }: InputNoteProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [onTitleClick, setOnTitleClick] = React.useState(false);

  const handleOnTitleChange = (event: { target: { value: string } }) => {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
  };

  const handleOnTitleClick = () => {
    setOnTitleClick(true);
  };

  const handleOnContentChange = (event: { target: { value: string } }) => {
    const inputContent = event.target.value;
    setContent(inputContent);
  };

  const handleSubmitOnClick = () => {
    // event.preventDefault();
    if (title !== "" && content !== "") {
      addToNote({ title, content });
      setTitle("");
      setContent("");
      setOnTitleClick(false);
    } else {
      // eslint-disable-next-line
      alert("Please provide values for the Title and Content");
    }
  };

  return (
    <form className="formInput">
      {onTitleClick ? (
        <div>
          <input
            placeholder="Type the title here"
            value={title}
            onChange={handleOnTitleChange}
            onClick={handleOnTitleClick}
            className="formInput-title"
            required
          />
          <input
            style={{ display: "block" }}
            placeholder="Type the content here"
            value={content}
            onChange={handleOnContentChange}
            className="formInput-content"
            required
          />
          <Zoom in>
            <Fab onClick={handleSubmitOnClick} className="formInput-button">
              <AddIcon fontSize="large" />
            </Fab>
          </Zoom>
        </div>
      ) : (
        <input
          placeholder="Take a note"
          value={title}
          onChange={handleOnTitleChange}
          onClick={handleOnTitleClick}
          className="formInput-title-first"
          required
        />
      )}
    </form>
  );
}

export default InputNote;
