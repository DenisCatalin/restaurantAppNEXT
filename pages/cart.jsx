import styles from "../styles/Cart.module.css";
import Header from "../components/header/header";
import { useSelector } from "react-redux";
import NavBar from "../components/navbar/navbar";
import StripeCheckoutButton from "../components/stripe-button/stripeButton";
import CheckoutItem from "../components/checkout-item/checkout-item";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    );
  };

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
                {cart.map((item, i) => (
                  <CheckoutItem key={i} item={item} />
                ))}
              </div>
              <div className={styles.footer}>
                <h2>
                  Total: <span className={styles.toMainColor}>$</span>
                  {getTotalPrice().toFixed(2)}
                </h2>
                <StripeCheckoutButton price={getTotalPrice().toFixed(2)} />
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
