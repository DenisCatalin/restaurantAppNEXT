import moment from "moment";
import Header from "../components/header/header";
import ScheduleCard from "../components/schedule-card/schedule-card";
import styles from "../styles/Schedule.module.css";
import { AnimateSharedLayout, motion } from "framer-motion";
import Head from "next/head";
import NavBar from "../components/navbar/navbar";
import clx from "classnames";
import { useState } from "react";

const Schedule = () => {
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const fullDays = [];

  const getDayNames = (month, year) => {
    const daysInMonth = moment(
      `${month}-01-${year}`,
      "MM-DD-YYYY"
    ).daysInMonth();

    for (let i = 1; i <= daysInMonth; i++) {
      let date = moment(`${month}-${i}-${year}`, "MM-DD-YYYY");
      let dayName = date.format("dddd");

      fullDays.push(`${dayName}`);
    }

    return fullDays;
  };

  const d = new Date();
  const month = d.getMonth();
  const year = d.getFullYear();

  getDayNames(month + 1, year);

  return (
    <div className={styles.scheduleImage}>
      <Head>
        <title>Good Food - Calendar for {months[month]}</title>
      </Head>
      <div className={styles.scheduleContainer}>
        <Header />
        <div>
          <div className={styles.scheduleTextContainer}>
            <motion.h1
              className={styles.scheduleTextContent}
              animate={{ scale: [0, 1] }}
            >
              SCHEDULE FOR{" "}
              <span className={styles.scheduleSpan}>
                {months[month].toUpperCase()}
              </span>
            </motion.h1>
          </div>
        </div>
        <AnimateSharedLayout type="crossfade">
          <motion.div
            className={styles.calendarContainer}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {fullDays.map((day, i) => (
              <ScheduleCard key={i} day={i} dayName={day} />
            ))}
          </motion.div>
        </AnimateSharedLayout>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default Schedule;
