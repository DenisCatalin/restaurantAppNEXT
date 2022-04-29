import styles from "./cart-item.module.css";
import { useDispatch } from "react-redux";
import Image from "next/image";
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
        <div className={styles.mealImage}>
          <Image src={strMealThumb} alt="" layout="fill" />
        </div>
      </div>
      <div className={styles.cartItemDetails}>
        <h2 className={styles.cartItemTitle}>
          {strMeal.length > 40 ? strMeal.substring(0, 35) + "..." : strMeal}
        </h2>
        <div className={styles.cartItemQuantity}>
          <Image
            src={"/static/previous.svg"}
            alt=""
            width={25}
            height={25}
            onClick={() => dispatch(decrementQuantity(idMeal))}
            className={styles.hover}
          />
          <p>{quantity}</p>
          <Image
            src={"/static/next.svg"}
            alt=""
            width={25}
            height={25}
            onClick={() => dispatch(incrementQuantity(idMeal))}
            className={styles.hover}
          />
        </div>
        <Image
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
