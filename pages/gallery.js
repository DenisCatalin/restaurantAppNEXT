import styles from "../styles/Gallery.module.css";
import Header from "../components/header/header";
import Head from "next/head";
import Photo from "../components/photo/photo";
import NavBar from "../components/navbar/navbar";
import { search, mapImageResources } from "../lib/cloudinary";

const Gallery = ({ images }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Good Food Gallery</title>
      </Head>
      <div className={styles.content}>
        <Header />
        <div className={styles.galleryCollection}>
          {images.map((photo, i) => (
            <Photo key={i} items={photo} />
          ))}
        </div>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default Gallery;

export async function getStaticProps() {
  const results = await search({
    expression: 'folder="restaurant-app-gallery"',
  });

  const { resources, next_cursor: nextCursor } = results;
  const images = mapImageResources(resources);

  return {
    props: { images, nextCursor: nextCursor || false },
  };
}
