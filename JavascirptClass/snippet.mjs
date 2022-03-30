import fetch from "node-fetch";

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    if (!response.ok) {
      console.log("HTTP error: " + response.status);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Could not get products from server" + error);
  }
}

const jsonPromise = fetchProducts();

jsonPromise.then((data) => {
  console.log(typeof data);
  console.log(Object.entries(data));
});
