/*
This function  converts a string to kebab case.
The function takes a string as an argument and if it 
is null would return null(&&), but if it is not it will 
return a string with the first letter of each word in 
the string converted to lowercase(match() & map()) and then it would put 
hyphens between the words(join()).
*/
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

//Change to ESM syntax
module.exports = { toKebabCase };
