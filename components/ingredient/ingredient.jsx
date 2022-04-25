import styles from "./Ingredient.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const Ingredient = ({ text, img }) => {
  return (
    <motion.div className={styles.container} animate={{ scale: [0, 1] }}>
      <Image src={img} alt={text} width={50} height={50} />
      <p>{text}</p>
    </motion.div>
  );
};

export default Ingredient;
