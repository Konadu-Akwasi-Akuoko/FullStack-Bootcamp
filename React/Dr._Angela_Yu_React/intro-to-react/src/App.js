import "./App.css";
import List from "./components/List";
import Footer from "./components/Footer";

const fName = "AKwasi";
const lName = "Konadu Akuoko";
const currentDate = new Date();
const year = currentDate.getFullYear();

function App() {
  return (
    <>
      <p>Hello, world!</p>
      <List></List>
      <p>
        My name is {fName} {lName}
      </p>
      <Footer author={"Konadu"} year={year}></Footer>
    </>
  );
}

export default App;
