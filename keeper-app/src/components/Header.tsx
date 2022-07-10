import * as React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header() {
  return (
    <header>
      <HighlightIcon style={{ display: "inline", color: "#fff" }} />
      <h1 style={{ display: "inline" }}>Keeper</h1>
    </header>
  );
}

export default Header;
