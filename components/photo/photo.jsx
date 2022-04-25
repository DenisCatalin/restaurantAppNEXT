import styles from "./Photo.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Photo = ({ items }) => {
  const router = useRouter();
  const { id, image } = items;

  return (
    <div onClick={() => router.push(`/gallery/${id}`)}>
      <Image
        src={image}
        alt=""
        className={styles.image}
        width={400}
        height={220}
      />
    </div>
  );
};

export default Photo;
