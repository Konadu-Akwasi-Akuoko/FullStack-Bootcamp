// @ts-check
import * as React from "react";
import { InputWithLabel } from "./searchInput";
import MyName from "./name";

/**
 * @description - This function is the main/root component of this app, where all
 * other components are children.
 * @returns This returns a react component. This component is the root component.
 */
function App() {
  /**
   * @description The initial array we are working with.
   */
  const initialStories = React.useCallback(
    () => [
      {
        title: "React",
        url: "https://reactjs.org/",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: "Redux",
        url: "https://redux.js.org/",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
        objectID: 1,
      },
    ],
    []
  );

  //Async fetch of stories
  const getAsyncStories = React.useCallback(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(initialStories);
        }, 500);
      }),
    [initialStories]
  );

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return { data: [], isLoading: true, isError: false };
      case "STORIES_FETCH_SUCCESS":
        return { data: action.payload, isLoading: false, isError: false };
      case "STORIES_FETCH_FAILURE":
        return { data: [], isLoading: false, isError: true };
      default:
        console.log("No action.type matched");
        throw new Error();
    }
  };
  //Reducer function for stories

  const [stories, storiesDispatch] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    //setIsLoading(true);
    //@ts-ignore
    storiesDispatch({ type: "STORIES_FETCH_INIT" });

    getAsyncStories()
      .then((result) => {
        //setStories(result);
        //console.log(result);
        //@ts-ignore
        storiesDispatch({ type: "STORIES_FETCH_SUCCESS", payload: result() });
        //setIsLoading(false);
        //console.log(state);
      })
      .catch((e) => {
        console.log(e);
        // setIsLoading(false);
        // setIsError(true);
        //@ts-ignore
        storiesDispatch({ type: "STORIES_FETCH_FAILURE" });
      });
  }, [getAsyncStories]);

  const handleRemoveStory = (item) => {
    const newStories = stories.data.filter((story) => {
      return story["title"] !== item.target.value;
    });
    //@ts-ignore
    storiesDispatch({ type: "DELETE_STORIES", payload: newStories });
  };

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

  /**
   * @description - The searchedStories is a function. Why?
   * Because it is assigned to an array.filter() that returns a new array
   * filled with elements that pass a test provided by a function.
   * And the text they need to pass is any array that includes the
   * current searchTerm in it's title is eligible.
   * @returns {Array} filteredArray
   */
  const searchedStories = stories.data.filter((story) => {
    //Because of the array.filter the array.includes method returns an array that
    //includes only the searchTerm
    // @ts-ignore
    return story.title.includes(searchTerm);
  });

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
      <hr></hr>
      <MyName></MyName>
      <p>SearchTerm: {searchTerm}</p>
      {/**Call the list with searchStories, but check if the data has come
       * if it has come render the list. This is achieved using JS ternary operator
       */}
      {stories.isError && <p>Error fetching data</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory}></List>
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
