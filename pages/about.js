import styles from "../styles/About.module.css";
import { motion } from "framer-motion";
import Header from "../components/header/header";
import NavBar from "../components/navbar/navbar";
import Head from "next/head";
import Image from "next/image";

const About = () => {
  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Head>
          <title>Good Food - About Us</title>
        </Head>
        <Header />
        <motion.div
          className={styles.content}
          animate={{ scale: [0.7, 1], opacity: [0, 1] }}
        >
          <div className={styles.textSide}>
            <h1 className={styles.title}>ABOUT US</h1>
            <h3 className={styles.text}>
              Pariatur esse occaecat nostrud ex officia enim consectetur irure
              magna ullamco laborum laborum fugiat reprehenderit. Amet duis
              magna labore magna culpa eu consequat culpa fugiat officia elit ad
              nulla. Ipsum dolor elit fugiat in consectetur id minim officia
              magna tempor ad. Fugiat amet pariatur cupidatat reprehenderit
              aliquip nulla anim ipsum deserunt officia. Cupidatat proident
              labore labore ea enim fugiat commodo magna nisi elit aliquip non.
              Veniam consequat ad do aliqua reprehenderit dolore veniam id qui
              ipsum reprehenderit. Pariatur esse occaecat nostrud ex officia
              enim consectetur irure magna ullamco laborum laborum fugiat
              reprehenderit. Amet duis magna labore magna culpa eu consequat
              culpa fugiat officia elit ad nulla. Ipsum dolor elit fugiat in
              consectetur id minim officia magna tempor ad. Fugiat amet pariatur
              cupidatat reprehenderit aliquip nulla anim ipsum deserunt officia.
              Cupidatat proident labore labore ea enim fugiat commodo magna nisi
              elit aliquip non. Veniam consequat ad do aliqua reprehenderit
              dolore veniam id qui ipsum reprehenderit. Pariatur esse occaecat
              nostrud ex officia enim consectetur irure magna ullamco laborum
              laborum fugiat reprehenderit. Amet duis magna labore magna culpa
              eu consequat culpa fugiat officia elit ad nulla. Ipsum dolor elit
              fugiat in consectetur id minim officia magna tempor ad. Fugiat
              amet pariatur cupidatat reprehenderit aliquip nulla anim ipsum
              deserunt officia. Cupidatat proident labore labore ea enim fugiat
              commodo magna nisi elit aliquip non. Veniam consequat ad do aliqua
              reprehenderit dolore veniam id qui ipsum reprehenderit.
            </h3>
          </div>
          <div className={styles.imageSide}>
            <Image
              src={
                "https://res.cloudinary.com/dgkdpysp5/image/upload/v1649854505/restaurant-app-images/aboutImage_dxekq8.jpg"
              }
              alt=""
              width={750}
              height={750}
              layout="fixed"
              className={styles.image}
            />
          </div>
        </motion.div>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default About;
