import styles from "./cart-item.module.css";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";

const CartItem = ({ cartItem }) => {
  const { idMeal, strMeal, strMealThumb, quantity } = cartItem;

  const dispatch = useDispatch();
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImage}>
        <img src={strMealThumb} alt="" className={styles.mealImage} />
      </div>
      <div className={styles.cartItemDetails}>
        <h2 className={styles.cartItemTitle}>
          {strMeal.length > 40 ? strMeal.substring(0, 35) + "..." : strMeal}
        </h2>
        <div className={styles.cartItemQuantity}>
          <img
            src={"/static/previous.svg"}
            alt=""
            width={25}
            height={25}
            onClick={() => dispatch(decrementQuantity(idMeal))}
            className={styles.hover}
          />
          <p>{quantity}</p>
          <img
            src={"/static/next.svg"}
            alt=""
            width={25}
            height={25}
            onClick={() => dispatch(incrementQuantity(idMeal))}
            className={styles.hover}
          />
        </div>
        <img
          src={"/static/close.svg"}
          alt=""
          width={25}
          height={25}
          onClick={() => dispatch(removeFromCart(idMeal))}
          className={styles.hover}
        />
      </div>
    </div>
  );
};

export default CartItem;
