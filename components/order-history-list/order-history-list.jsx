import React from "react";
import Item from "../order-history-item/order-history-item";
import styles from "./OrderHistoryList.module.css";
import { useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
Modal.setAppElement("#__next");

const OrderHistoryItem = ({ item, date, price, paymentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  let count = 0;
  const fmm = item.map(({ quantity, strMeal, strMealThumb } = single, i) => {
    count++;
    return (
      <Item key={i} quantity={quantity} name={strMeal} url={strMealThumb} />
    );
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    window.scrollTo(0, 0);
    Cookies.set("overflowHidden", isOpen);
  };
  return (
    <div className={styles.bar} onClick={toggleOpen}>
      <h1 className={styles.historyText}>
        {count} different meals were ordered. Click for more details
      </h1>
      <div className={styles.spans}>
        <span className={styles.spanActive}>${price}</span>
        <span className={styles.spanHistory2}>{date}</span>
      </div>
      <Modal
        isOpen={isOpen}
        className={styles.modal}
        contentLabel="View Order"
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContainer}>
          <h1>View Previous Order</h1>
          <div className={styles.details}>
            <h4>
              Date ordered: <span className={styles.spanDetails}>{date}</span>
            </h4>
          </div>
          <div className={styles.listOfItems}>{fmm}</div>
          <div className={styles.modalFooter}>
            <h4 className={styles.extraText}>
              Total cost: <span className={styles.spanActive}>${price}</span>
            </h4>
            <h4 className={styles.extraText}>
              Payment ID:{" "}
              <span className={styles.spanDetails}>
                {paymentId.replace("tok_", "")}
              </span>
            </h4>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderHistoryItem;
