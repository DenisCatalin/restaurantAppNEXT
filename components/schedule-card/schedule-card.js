import styles from "../../styles/Schedule.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Content(props) {
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
      <motion.div className={styles.cardContent} layout>
        {" "}
        <p style={{ color: "white" }}>{props.id + 1}</p>
        <p style={{ color: "white" }}>{props.name}</p>
      </motion.div>
    </motion.div>
  );
}

const ScheduleCard = (props) => {
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
        currentDay === props.day + 1
          ? styles.calendarCardNow
          : styles.calendarCard
      }
      variants={item}
      animate={{ scale: [0, 1], rotate: [90, 0] }}
    >
      <motion.h1 className={styles.calendarDay} layout>
        {props.day + 1}
      </motion.h1>
      <motion.p
        layout
        className={
          currentDay === props.day + 1
            ? styles.calendarDayNameNow
            : styles.calendarDayName
        }
      >
        {props.dayName}
      </motion.p>
      <AnimatePresence>
        {isOpen && <Content id={props.day} name={props.dayName} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScheduleCard;
