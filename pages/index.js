import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header/header";
import NavBar from "../components/navbar/navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

/*
Completare pagina galerie [upload imagini pe cloud, comments(edit, delete, report), likes]
Logare prin magic.link
Responsive
Cerc pe pagina principala cu poza profilului in loc de e-mail text doar (dupa click sa apara un pop-up cu alte detalii, notificari, istoric comenzi, rezervari, etc...)]
Dashboard pentru admini (Count comenzi/rezervari pe luna, profit pe luna, etc...)
db pe cloud
*/

export default function Home() {
  const [buttonScale, setButtonScale] = useState(0);
  const [buttonScale2, setButtonScale2] = useState(0);

  const router = useRouter();
  Cookies.remove("scheduleDay");

  return (
    <div className={styles.container}>
      <Head>
        <title>Good Food - Homepage</title>
        <meta name="description" content="Good Food Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.imageBackground}>
        <Header />
        <div className={styles.bannerContainer}>
          <motion.h2
            animate={{ y: [-300, 0], opacity: [0, 1] }}
            transition={{ delay: 0.3 }}
          >
            WELCOME TO
          </motion.h2>
          <motion.h1
            animate={{ y: [-500, 0], opacity: [0, 1] }}
            transition={{ delay: 0.7 }}
          >
            GOOD FOOD
          </motion.h1>
          <motion.h3
            animate={{ y: [-600, 0], opacity: [0, 1] }}
            transition={{ delay: 1 }}
          >
            THE FINEST RESTAURANT IN SILICON VALLEY
          </motion.h3>
        </div>
        <div className={styles.buttonsContainer}>
          <motion.button
            className={styles.bannerButton}
            animate={{ x: [-500, 0], opacity: [0, 1] }}
            transition={{ duration: 1 }}
            onMouseEnter={() => setButtonScale(1)}
            onMouseLeave={() => setButtonScale(0)}
            whileHover={{
              rotate: [0, 10, -10, 0],
            }}
            onClick={() => router.push("/about")}
          >
            <motion.div
              className={styles.buttonChangeBG}
              animate={{ scale: buttonScale }}
            ></motion.div>
            <p
              className={styles.buttonText}
              style={{ color: buttonScale ? "black" : "white" }}
            >
              Find more
            </p>
          </motion.button>
          <motion.button
            className={styles.bannerButton}
            animate={{ x: [300, 0], opacity: [0, 1] }}
            transition={{ duration: 1 }}
            onMouseEnter={() => setButtonScale2(1)}
            onMouseLeave={() => setButtonScale2(0)}
            whileHover={{
              rotate: [0, -10, 10, 0],
            }}
            onClick={() => router.push("/booking")}
          >
            <motion.div
              className={styles.buttonChangeBG}
              animate={{ scale: buttonScale2 }}
            ></motion.div>
            <p
              className={styles.buttonText}
              style={{ color: buttonScale2 ? "black" : "white" }}
            >
              Booking
            </p>
          </motion.button>
        </div>
        <NavBar showNav={true} showOpen={false} />
        <div className={styles.socialMedia}>
          <motion.div
            className={styles.socialMediaCard}
            whileHover={{ rotate: [0, 50, -30, 0], stiffness: 10 }}
            whileTap={{ scale: 0.8 }}
            animate={{ opacity: [0, 1] }}
          >
            <Image src={"/static/facebook.svg"} alt="" width={35} height={35} />
          </motion.div>
          <motion.div
            className={styles.socialMediaCard}
            whileHover={{ rotate: [0, 50, -30, 0], stiffness: 10 }}
            whileTap={{ scale: 0.8 }}
            animate={{ opacity: [0, 1], delay: 0.7 }}
          >
            <Image src={"/static/twitter.svg"} alt="" width={35} height={35} />
          </motion.div>
          <motion.div
            className={styles.socialMediaCard}
            whileHover={{ rotate: [0, 50, -30, 0], stiffness: 10 }}
            whileTap={{ scale: 0.8 }}
            animate={{ opacity: [0, 1] }}
          >
            <Image
              src={"/static/instagram.svg"}
              alt=""
              width={35}
              height={35}
            />
          </motion.div>
          <motion.div
            className={styles.socialMediaCard}
            whileHover={{ rotate: [0, 50, -30, 0], stiffness: 10 }}
            whileTap={{ scale: 0.8 }}
            animate={{ opacity: [0, 1] }}
          >
            <Image src={"/static/linkedin.svg"} alt="" width={35} height={35} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
