import styles from "./CheckoutItem.module.css";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";

const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
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
  );
};

export default CheckoutItem;
