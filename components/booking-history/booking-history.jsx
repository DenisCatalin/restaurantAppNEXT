import styles from "./BookingHistory.module.css";
import LoadingData from "../loading-button/loading-button";

const BookingHistory = ({ bookings }) => {
  return (
    <div className={styles.bookingHistory}>
      <h1 className={styles.text}>Booking History</h1>
      <div className={styles.history}>
        {
          <div className={styles.historyList}>
            {bookings === undefined ? (
              <div className={styles.loadingData}>
                <LoadingData />
              </div>
            ) : bookings.length === 0 ? (
              <h1 className={styles.historyText}>
                Your booking history in empty
              </h1>
            ) : (
              bookings.map((booking, i) => (
                <div key={i} className={styles.historyItem}>
                  <h1 className={styles.historyText}>
                    {booking.seats} seats were booked for {booking.forDate} at
                    tables [{booking.tables}]
                  </h1>
                  <div className={styles.spans}>
                    <span
                      className={
                        booking.status === 1
                          ? styles.spanActive
                          : styles.spanInactive
                      }
                    >
                      {booking.status === 1 ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <span className={styles.spanHistory2}>
                      {booking.forDate}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default BookingHistory;
