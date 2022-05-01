import styles from "./Ingredient.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import useWindowDimensions from "../../utils/useWindowDimensions";

const Ingredient = ({ text, img }) => {
  const { width, height } = useWindowDimensions();
  return (
    <motion.div className={styles.container} animate={{ scale: [0, 1] }}>
      {width > 520 ? (
        <Image src={img} alt={text} width={50} height={50} />
      ) : null}
      <p>{text}</p>
    </motion.div>
  );
};

export default Ingredient;
