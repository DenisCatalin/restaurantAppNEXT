import styles from "../styles/Contact.module.css";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import { motion } from "framer-motion";
import Head from "next/head";

const Contact = () => {
  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Head>
          <title>Good Food - Contact</title>
        </Head>
        <Header />
        <motion.div
          className={styles.contactForm}
          animate={{ scale: [0.8, 1], opacity: [0, 1] }}
        >
          <motion.h1
            className={styles.title}
            animate={{ scale: [0, 1] }}
            transition={{ delay: 0.2 }}
          >
            CONTACT US
          </motion.h1>
          <motion.div
            className={styles.formWrapper}
            animate={{ scale: [0, 1] }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={styles.formLabel}>Email</h3>
            <input type="text" className={styles.formInput} />
          </motion.div>
          <motion.div
            className={styles.formWrapper}
            animate={{ scale: [0, 1] }}
            transition={{ delay: 0.6 }}
          >
            <h3 className={styles.formLabel}>Subject</h3>
            <input type="text" className={styles.formInput} />
          </motion.div>
          <motion.div
            className={styles.formWrapperText}
            animate={{ scale: [0, 1] }}
            transition={{ delay: 0.8 }}
          >
            <h3 className={styles.formLabel}>Message</h3>
            <textarea type="text" className={styles.formInputText} />
          </motion.div>
          <motion.button
            className={styles.formButton}
            animate={{ scale: [0, 1] }}
            whileHover={{
              rotate: [0, 10, -10, 0],
            }}
          >
            SEND
          </motion.button>
        </motion.div>
      </div>
      <Navbar showNav={false} showOpen={true} />
    </div>
  );
};

export default Contact;
