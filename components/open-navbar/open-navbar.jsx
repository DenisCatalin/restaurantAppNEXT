import styles from "./Open.module.css";
import { motion } from "framer-motion";
import ScrollToTop from "react-scroll-to-top";

const OpenNavbar = () => {
  return (
    <motion.div className={styles.openNav}>
      <ScrollToTop />
      <div className={styles.openNavElipse}></div>
      <div className={styles.openNavElipse}></div>
      <div className={styles.openNavElipse}></div>
      <div className={styles.openNavElipse}></div>
      <div className={styles.openNavElipse}></div>
      <div className={styles.openNavElipse}></div>
    </motion.div>
  );
};

export default OpenNavbar;
