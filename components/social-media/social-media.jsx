import React from "react";
import { motion } from "framer-motion";
import styles from "./SocialMedia.module.css";
import Image from "next/image";

const SocialMedia = ({ name }) => {
  return (
    <motion.div
      className={styles.socialMediaCard}
      whileHover={{ rotate: [0, 50, -30, 0], stiffness: 10 }}
      whileTap={{ scale: 0.8 }}
      animate={{ opacity: [0, 1] }}
    >
      <img
        src={`/static/${name}.svg`}
        alt=""
        className={styles.socialMediaImage}
      />
    </motion.div>
  );
};

export default SocialMedia;
