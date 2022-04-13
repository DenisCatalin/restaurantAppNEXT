import { search } from "../../lib/cloudinary";
import Head from "next/head";
import Header from "../../components/header/header";
import styles from "./photoId.module.css";
import Image from "next/image";
import NavBar from "../../components/navbar/navbar";
import { motion } from "framer-motion";

export async function getStaticProps(context) {
  const photo = context.params.photoId;

  const results = await search({
    expression: 'folder="restaurant-app-gallery"',
  });

  const { resources } = results;
  const id = resources.find((elem) => elem.asset_id === photo);

  const { asset_id, secure_url, uploaded_at, width, height } = id;

  return {
    props: { asset_id, secure_url, uploaded_at, width, height },
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((photoId) => ({
    params: { photoId },
  }));

  return { paths, fallback: "blocking" };
}

const PhotoId = ({ asset_id, secure_url, uploaded_at, width, height }) => {
  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Head>
          <title>Good Food - Viewing Photo {asset_id}</title>
        </Head>
        <div className={styles.content}>
          <Header />
          <motion.div
            className={styles.imageSection}
            animate={{ scale: [0, 1] }}
          >
            <Image
              src={secure_url}
              alt=""
              className={styles.image}
              layout="fill"
            />
          </motion.div>
          <div className={styles.commentsSection}></div>
        </div>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default PhotoId;
