// @ts-check
import * as React from "react";
import { InputWithLabel } from "./searchInput";
import MyName from "./name";
import './App.css'

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

/**
 * @description - This function is the main/root component of this app, where all
 * other components are children.
 * @returns This returns a react component. This component is the root component.
 */
function App() {
  //Custom react hook that stores an item when there is a change.
  const useSemiPersistenceState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistenceState("search", "");

  const onMouseEnterSearch = (event) => {
    setSearchTerm(event.target.value + ".");
  };

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return { data: [], isLoading: true, isError: false };
      case "STORIES_FETCH_SUCCESS":
        return { data: action.payload, isLoading: false, isError: false };
      case "STORIES_FETCH_FAILURE":
        return { data: [], isLoading: false, isError: true };
      default:
        console.error("No action.type matched");
        throw new Error();
    }
  };
  //Reducer function for stories

  const [stories, storiesDispatch] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // const handleSearchSubmit = (event) => {
  //   handleFetchStories();
  // }

  const handleFetchStories = React.useCallback(() => {
    //@ts-ignore
    storiesDispatch({ type: "STORIES_FETCH_INIT" });

    fetch(`${API_ENDPOINT}${url}`)
      .then((response) => response.json())
      .then((results) => {
        //@ts-ignore
        storiesDispatch({
          type: "STORIES_FETCH_SUCCESS",
          payload: results.hits,
        });
      });
  }, [url]);

  const handleSearchSubmit = (event) => {
    setUrl(searchTerm);
    //handleFetchStories();
  };

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories, url]);

  const handleRemoveStory = (item) => {
    const newStories = stories.data.filter((story) => {
      return story["title"] !== item.target.value;
    });
    //@ts-ignore
    storiesDispatch({ type: "DELETE_STORIES", payload: newStories });
  };

  return (
    <>
      <h1>My hacker stories</h1>
      {/** Call the JSX element and pass props to it
       * the props are onSearch and search.
       *
       * The onSearch passes a function to the Search prop, where the Search component would
       * use it as a callback.
       *
       * The search passes the initial value of the searchTerm that is passed in
       * the useState as a prop to the Search component, which then sets the initial value
       * of the input.
       */}
      <InputWithLabel
        onSearch={onSearch}
        search={searchTerm}
        onMouseEnter={onMouseEnterSearch}
        ID={"search"}
        type={"text"}
        value={searchTerm}
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>
      <hr></hr>
      <MyName></MyName>
      <p>SearchTerm: {searchTerm}</p>
      {stories.isError && <p>Error fetching data</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory}></List>
      )}

      <Name name={"Akwasi Konadu Akuoko"}></Name>
    </>
  );
}

// const Button = ({ buttonClicked, children }) => {
//   return (
//     <>
//       <button onClick={buttonClicked}>{children}</button>
//     </>
//   );
// };

function List({ list, onRemoveItem }) {
  return (
    <>
      <ul>
        {/**Use the props passed down to the function as an array */}
        {list.map((element) => {
          return (
            <Item
              key={element.objectID}
              item={element}
              onRemoveItem={onRemoveItem}
            ></Item>
          );
        })}
      </ul>
    </>
  );
}

function Item({ item, onRemoveItem }) {
  return (
    <div>
      <li>Title: {item.title} </li>
      <li>
        url: <a href={item.url}>{item.url}</a>{" "}
      </li>
      <li>author: {item.author} </li>
      <li>Number of comments: {item.num_comments} </li>
      <li>Number of points: {item.points}</li>
      <button onClick={onRemoveItem} value={item.title}>
        Delete Me
      </button>
      <hr></hr>
    </div>
  );
}

function Name(props) {
  return <h1> My name is {props.name}</h1>;
}

export default App;
