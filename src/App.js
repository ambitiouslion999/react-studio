import { useState } from "react";
import "./App.css";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    let itemIndex = cart.findIndex((v) => v.name === item.name);
    if (itemIndex === -1) {
      let newCart = cart.concat({ name: item.name, amount: 1 });
      setCart(newCart);
      setTotal((val) => val + item.price);
    } else {
      let newCart = [...cart];
      newCart[itemIndex] = {
        name: item.name,
        amount: newCart[itemIndex].amount + 1,
      };
      setCart(newCart);
      setTotal((val) => val + item.price);
    }
  };

  return (
    <div className="App">
      <div className="bakeryDisplay">
        <h1 className="bakeryTitle">My Bakery</h1>
        <div className="bakeryItems">
          {bakeryData.map((item) => (
            <BakeryItem
              key={item.name}
              {...item}
              addItem={() => addItem(item)}
            /> // replace with BakeryItem component
          ))}
        </div>
      </div>
      <div>
        <h2>Cart</h2>
        {cart.length ? (
          <>
            {cart.map((item) => (
              <p>
                {item.name}: {item.amount}
              </p>
            ))}
            <h3>Total: ${Math.round(total * 100) / 100}</h3>
          </>
        ) : (
          <h3>No items yet!</h3>
        )}
      </div>
    </div>
  );
}

export default App;