import * as React from "react";

const InputWithLabel = ({
  onSearch,
  search,
  onMouseEnter,
  ID,
  type,
  value,
  children,
}) => {
  // const [searchTerm, setSearchTerm] = React.useState("");

  // React.useEffect(() => {
  //   setSearchTerm(search);
  // }, [search]);

  const useSearchTerm = (search) => {
    const [value, setValue] = React.useState(search || "");

    React.useEffect(() => {
      setValue(search);
    }, [search]);

    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSearchTerm(search);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event);
  };

  const handleMouseEnter = (event) => {
    setSearchTerm(event.target.value);
    onMouseEnter(event);
  };
  return (
    <>
      <label htmlFor={ID}>{children}</label>
      <input
        id={ID}
        type={type}
        onChange={handleChange}
        onMouseEnter={handleMouseEnter}
        value={value}
      />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </>
  );
};
export { InputWithLabel };
