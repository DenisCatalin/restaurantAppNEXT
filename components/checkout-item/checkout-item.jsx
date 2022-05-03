import styles from "./CheckoutItem.module.css";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";
import useWindowDimensions from "../../utils/useWindowDimensions";

const CheckoutItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  return (
    <div className={styles.body}>
      <div className={styles.image}>
        <div className={styles.anotherImage}>
          <Image
            src={item.strMealThumb}
            className={styles.imageCart}
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <p>{item.strMeal}</p>
      <p>
        <span className={styles.toMainColor}>$</span>
        {item.price}
      </p>
      <div className={styles.itemQuantity}>
        <Image
          src={"/static/previous.svg"}
          height={width > 1024 ? 25 : 20}
          width={width > 1024 ? 25 : 20}
          alt=""
          className={styles.imageCart}
          onClick={() => dispatch(decrementQuantity(item.idMeal))}
        />
        <p>{item.quantity}</p>
        <Image
          src={"/static/next.svg"}
          height={width > 1024 ? 25 : 20}
          width={width > 1024 ? 25 : 20}
          alt=""
          className={styles.imageCart}
          onClick={() => dispatch(incrementQuantity(item.idMeal))}
        />
      </div>
      <p>
        <span className={styles.toMainColor}>$</span>
        {item.quantity * item.price}
      </p>
      <div className={styles.buttons}>
        <Image
          src={"/static/close.svg"}
          height={25}
          width={25}
          alt=""
          className={styles.imageCart}
          onClick={() => dispatch(removeFromCart(item.idMeal))}
        />
      </div>
    </div>
  );
};

export default CheckoutItem;
