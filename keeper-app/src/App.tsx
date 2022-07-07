import * as React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Notes";
import notes from "./components/notes";

function App() {
  return (
    <div>
      <Header />
      <Note arrayOfNotes={notes} />
      <Footer />
    </div>
  );
}

export default App;
