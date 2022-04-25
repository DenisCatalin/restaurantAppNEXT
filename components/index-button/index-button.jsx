import styles from "./IndexButton.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

const IndexButton = ({ name, to }) => {
  const [buttonScale, setButtonScale] = useState(0);
  const router = useRouter();
  return (
    <motion.button
      className={styles.bannerButton}
      animate={{ x: [-500, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      onMouseEnter={() => setButtonScale(1)}
      onMouseLeave={() => setButtonScale(0)}
      whileHover={{
        rotate: [0, 10, -10, 0],
      }}
      onClick={() => router.push(`${to}`)}
    >
      <motion.div
        className={styles.buttonChangeBG}
        animate={{ scale: buttonScale }}
      ></motion.div>
      <p
        className={styles.buttonText}
        style={{ color: buttonScale ? "black" : "white" }}
      >
        {name}
      </p>
    </motion.button>
  );
};

export default IndexButton;
