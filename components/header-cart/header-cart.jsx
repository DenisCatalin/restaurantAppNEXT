import styles from "./HeaderCart.module.css";
import { useRouter } from "next/router";
import CartItem from "../cart-item/cart-item";

const HeaderCart = ({ cart }) => {
  const router = useRouter();
  return (
    <>
      <h1 className={styles.textCart}>Your Cart</h1>
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <h1 className={styles.textCart}>Your Cart is Empty</h1>
        ) : (
          <>
            {cart.map((item, i) => {
              return <CartItem key={i} cartItem={item} />;
            })}
          </>
        )}
      </div>
      {cart.length === 0 ? null : (
        <button
          className={styles.cartCheckout}
          onClick={() => router.push("/cart")}
        >
          Go To Checkout
        </button>
      )}
    </>
  );
};

export default HeaderCart;
