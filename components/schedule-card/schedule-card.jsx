import styles from "../../styles/Schedule.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Loading from "../loading-component/loading-component";

function Content({ id, name }) {
  Cookies.set("scheduleDay", id + 1);
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setSchedule(data.getScheduleQuery.data.schedule);
      setIsLoading(false);
      window.scrollTo(0, 0);
    })();
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{ pointerEvents: "auto" }}
      className={styles.overlay}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div className={styles.cardContent} layout>
          {" "}
          <p style={{ color: "white" }}>{id + 1}</p>
          <p style={{ color: "white" }}>{name}</p>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Event Type</th>
              <th className={styles.th}>Starting Hour</th>
              <th className={styles.th}>Ending Hour</th>
            </tr>
            {schedule.length === 0 ? (
              <div className={styles.tr}>
                <h1>No events for this day</h1>
              </div>
            ) : (
              schedule.map((item, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{i + 1}</td>
                  <td className={styles.td}>{item.eventType}</td>
                  <td className={styles.td}>{item.eventStartHour}</td>
                  <td className={styles.td}>{item.eventStopHour}</td>
                </tr>
              ))
            )}
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}

const ScheduleCard = ({ day, dayName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const d = new Date();
  const currentDay = d.getDate();

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      onClick={toggleOpen}
      layout
      initial={{ borderRadius: 10 }}
      className={
        currentDay === day + 1 ? styles.calendarCardNow : styles.calendarCard
      }
      variants={item}
    >
      <motion.h1 className={styles.calendarDay} layout>
        {day + 1}
      </motion.h1>
      <motion.p
        layout
        className={
          currentDay === day + 1
            ? styles.calendarDayNameNow
            : styles.calendarDayName
        }
      >
        {dayName}
      </motion.p>
      <AnimatePresence>
        {isOpen && <Content id={day} name={dayName} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScheduleCard;
