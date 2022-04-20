import styles from "../styles/Cart.module.css";
import Header from "../components/header/header";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart.slice";
import NavBar from "../components/navbar/navbar";
import StripeCheckoutButton from "../components/stripe-button/stripeButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    );
  };

  console.log("getpricetotal", getTotalPrice());
  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <h1>Your Cart is Empty!</h1>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <div>Image</div>
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total Price</div>
                <div>Actions</div>
              </div>
              <div className={styles.cartItems}>
                {cart.map((item) => (
                  <div className={styles.body}>
                    <div className={styles.image}>
                      <img
                        src={item.strMealThumb}
                        height="90"
                        width="90"
                        className={styles.imageCart}
                      />
                    </div>
                    <p>{item.strMeal}</p>
                    <p>
                      <span className={styles.toMainColor}>$</span>
                      {item.price}
                    </p>
                    <div className={styles.itemQuantity}>
                      <img
                        src={"/static/previous.svg"}
                        height="25"
                        width="25"
                        className={styles.imageCart}
                        onClick={() => dispatch(decrementQuantity(item.idMeal))}
                      />
                      <p>{item.quantity}</p>
                      <img
                        src={"/static/next.svg"}
                        height="25"
                        width="25"
                        className={styles.imageCart}
                        onClick={() => dispatch(incrementQuantity(item.idMeal))}
                      />
                    </div>
                    <p>
                      <span className={styles.toMainColor}>$</span>
                      {item.quantity * item.price}
                    </p>
                    <div className={styles.buttons}>
                      <img
                        src={"/static/close.svg"}
                        height="25"
                        width="25"
                        className={styles.imageCart}
                        onClick={() => dispatch(removeFromCart(item.idMeal))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.footer}>
                <h2>
                  Total: <span className={styles.toMainColor}>$</span>
                  {getTotalPrice().toFixed(2)}
                </h2>
                <StripeCheckoutButton price={getTotalPrice().toFixed(2)}>
                  CHECKOUT
                </StripeCheckoutButton>
              </div>
            </>
          )}
        </div>
        <NavBar showNav={false} showOpen={true} />
      </div>
    </div>
  );
};

export default Cart;
