import Image from "next/image";
import styles from "./OrderHistoryItem.module.css";

const Ohi = ({ quantity, name, url }) => {
  return (
    <div className={styles.item}>
      <h1 className={styles.itemQuantity}>x{quantity}</h1>
      <h1 className={styles.itemName}>{name}</h1>
      <div className={styles.itemImage}>
        <Image src={url} alt={name} layout="fill" />
      </div>
    </div>
  );
};

export default Ohi;
