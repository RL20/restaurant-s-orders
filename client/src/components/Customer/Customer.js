import React, { useState, Suspense } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const Cart = React.lazy(() => import("./components/Cart/Cart"));

function Customer(props) {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CartProvider>
        {cartIsShown && <Cart onCloseCart={hideCartHandler} user={props.loggedUser} />}
        <Header onShowCart={showCartHandler} handleLogout={props.handleLogout} user={props.loggedUser} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </Suspense>
  );
}

export default Customer;
