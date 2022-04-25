import styles from "./Open.module.css";
import { motion } from "framer-motion";

const OpenNavbar = () => {
  return (
    <motion.div
      className={styles.openNav}
      // animate={{ scale: showOpen ? 1 : 0 }}
    >
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
