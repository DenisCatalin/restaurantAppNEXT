import Image from "next/image";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
import { useState, useEffect } from "react";

const Header = () => {
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const handleOnClick = () => {
    router.push("/login");
  };

  const handleOnClickLogo = () => {
    router.push("/");
  };

  const logout = () => {
    magic.user.logout().then(() => {
      setUsername();
      setLoggedIn(false);
    });
  };

  useEffect(async () => {
    try {
      const { email, issuer } = await magic.user.getMetadata();
      const didToken = await magic.user.getIdToken();

      if (email) {
        setUsername(email);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Can't retrieve email in NavBar", error);
    }
  }, []);

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
          onClick={handleOnClickLogo}
          className={styles.logo}
        />
      </motion.div>
      <motion.div
        className={styles.usernameContainer}
        whileTap={{ scale: 0.95 }}
      >
        <h3
          className={styles.userName}
          onClick={loggedIn ? logout : handleOnClick}
        >
          {loggedIn ? username : "Login"}
        </h3>
        <Image src={"/static/expand.svg"} alt="" width={40} height={40} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
