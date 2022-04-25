import styles from "./Comments.module.css";
import Image from "next/image";

const Comments = ({ commentId, displayName, comment, profilePic, visible }) => {
  return (
    <>
      {visible ? (
        <div className={styles.container}>
          <Image
            src={profilePic}
            alt={commentId}
            width={60}
            height={60}
            className={styles.profilePicture}
          />
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
