import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header/header";
import NavBar from "../components/navbar/navbar";
import { motion } from "framer-motion";
import SocialMedia from "../components/social-media/social-media";
import IndexButton from "../components/index-button/index-button";

/*
Responsive
Dashboard pentru admini (Count comenzi/rezervari pe luna, profit pe luna, etc...)
sistem de notificari
sistem de chat
fetch la userdetails doar daca nu e pus nimic in redux
*/

export default function Home() {
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
          <IndexButton name={"Find More"} to={"about"} />
          <IndexButton name={"Booking"} to={"booking"} />
        </div>
        <NavBar showNav={true} showOpen={false} />
        <div className={styles.socialMedia}>
          <SocialMedia name={"facebook"} />
          <SocialMedia name={"twitter"} />
          <SocialMedia name={"instagram"} />
          <SocialMedia name={"linkedin"} />
        </div>
      </div>
    </div>
  );
}
