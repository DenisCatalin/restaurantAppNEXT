import styles from "./OrderHistory.module.css";
import LoadingData from "../loading-button/loading-button";
import OrderHistoryItem from "../order-history-list/order-history-list";

const OrderHistory = ({ orders }) => {
  return (
    <div className={styles.bookingHistory}>
      <h1 className={styles.text}>Order History</h1>
      <div className={styles.history}>
        {
          <div className={styles.historyList}>
            {orders === undefined ? (
              <div className={styles.loadingData}>
                <LoadingData />
              </div>
            ) : orders.length === 0 ? (
              <h1 className={styles.historyText}>
                Your order history in empty
              </h1>
            ) : (
              orders.map((cart, i) => (
                <OrderHistoryItem
                  key={i}
                  item={JSON.parse(cart.cartItems)}
                  date={cart.date}
                  price={cart.totalPrice}
                  paymentId={cart.paymentId}
                />
              ))
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default OrderHistory;
