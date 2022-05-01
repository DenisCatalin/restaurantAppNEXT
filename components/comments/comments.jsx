import styles from "./Comments.module.css";
import Image from "next/image";

const Comments = ({ commentId, displayName, comment, profilePic, visible }) => {
  return (
    <>
      {visible ? (
        <div className={styles.container}>
          <div className={styles.profilePicContainer}>
            <Image
              src={profilePic}
              alt={commentId}
              layout="fill"
              className={styles.profilePicture}
            />
          </div>
          <div className={styles.content}>
            <p className={styles.userName}>{displayName}</p>
            <h3 className={styles.comment}>{comment}</h3>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Comments;
