const img = "https://picsum.photos/200";

const date = new Date();
const currentTime = date.getHours();
let greeting = "";

const customStyle = {
  color: "",
};

switch (currentTime) {
  case currentTime < 12:
    greeting = "Good Morning";
    customStyle.color = "red";
    break;
  case currentTime < 18:
    greeting = "Good Afternoon";
    customStyle.color = "green";
    break;
  default:
    greeting = "Good Night";
    customStyle.color = "blue";
}

function List() {
  return (
    <>
      <h1 style={customStyle}>{greeting}</h1>
      <img alt="random" src={img + "?grayscale"} />

      <img
        className="food-img"
        alt="bacon"
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-air-fryer-bacon-0035-landscape-pf-1567632709.jpg?crop=0.645xw:0.967xh;0.170xw,0.0204xh&resize=480:*"
      />
      <img
        className="food-img"
        alt="jamon"
        src="https://images-na.ssl-images-amazon.com/images/I/71lNrnbMXsL._SL1200_.jpg"
      />
      <img
        className="food-img"
        alt="noodles"
        src="https://www.errenskitchen.com/wp-content/uploads/2014/04/quick-and-easy-chinese-noodle-soup3-1.jpg"
      />
    </>
  );
}

export default List;
