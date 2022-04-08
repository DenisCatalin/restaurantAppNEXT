import styles from "./Photo.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Content({ id, img }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      className={styles.overlay}
    >
      <motion.div className={styles.cardContent} layout>
        {" "}
        <p>{id}</p>
        <Image
          src={img}
          alt=""
          className={styles.image}
          width={1300}
          height={720}
        />
      </motion.div>
    </motion.div>
  );
}

const Photo = ({ layoutId, imgUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div onClick={toggleOpen} layout variants={item}>
      <Image
        src={imgUrl}
        alt=""
        className={styles.image}
        width={400}
        height={220}
      />
      <AnimatePresence>
        {isOpen && <Content key={layoutId} id={layoutId} img={imgUrl} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Photo;
