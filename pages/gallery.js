import styles from "../styles/Gallery.module.css";
import Header from "../components/header/header";
import Head from "next/head";
import Photo from "../components/photo/photo";
import NavBar from "../components/navbar/navbar";
import { items } from "../lib/photos";
import { AnimateSharedLayout } from "framer-motion";

const Gallery = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Good Food Gallery</title>
      </Head>
      <div className={styles.content}>
        <Header />
        <div className={styles.galleryCollection}>
          <AnimateSharedLayout type="crossfade">
            {items.map((photo, i) => (
              <Photo key={i} layoutId={i} imgUrl={photo.url} />
            ))}
          </AnimateSharedLayout>
        </div>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default Gallery;
