import Image from "next/image";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <motion.div
      className={styles.headerContainer}
      animate={{ y: [-250, 0], opacity: [0, 1] }}
    >
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.8 }}
      >
        <Image
          src={"/static/logo.svg"}
          alt=""
          width={250}
          height={70}
          onClick={handleOnClick}
          className={styles.logo}
        />
      </motion.div>
      <motion.div
        className={styles.usernameContainer}
        whileTap={{ scale: 0.95 }}
      >
        <h3 className={styles.userName}>deniscotecata@gmail.com</h3>
        <Image src={"/static/expand.svg"} alt="" width={40} height={40} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
