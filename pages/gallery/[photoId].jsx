import { search } from "../../lib/cloudinary";
import Head from "next/head";
import Header from "../../components/header/header";
import styles from "./photoId.module.css";
import Image from "next/image";
import NavBar from "../../components/navbar/navbar";
import { motion } from "framer-motion";
import UseRedirectUser from "../../utils/redirectUser";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import Comment from "../../components/comments/comments";
import Loading from "../../components/loading-button/loading-button";
import useWindowDimensions from "../../utils/useWindowDimensions";

export async function getServerSideProps(context) {
  const { userId } = await UseRedirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const photo = context.params.photoId;

  const results = await search({
    expression: 'folder="restaurant-app-gallery"',
  });

  const { resources } = results;
  const id = resources.find((elem) => elem.asset_id === photo);

  const { asset_id, secure_url, uploaded_at } = id;

  return {
    props: { asset_id, secure_url, uploaded_at },
  };
}

const PhotoId = ({ asset_id, secure_url, uploaded_at }) => {
  const [like, setLike] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [photoComments, setPhotoComments] = useState([]);
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState();
  const [sendingComment, setSendingComment] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const commentInput = useRef(null);

  const { height, width } = useWindowDimensions();

  console.log(width);

  useEffect(() => {
    if (width >= 1024) setToggleComments(false);
  }, [width]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/userDetails");
      const data = await res.json();
      setDisplayName(data?.userDetails?.data?.users[0].displayName);
      setProfilePic(data?.userDetails?.data?.users[0].profilePic);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (displayName !== "") {
        const res = await fetch("/api/getLikes", {
          method: "GET",
          headers: {
            body: JSON.stringify({
              displayName: displayName,
              photoId: asset_id,
            }),
          },
        });
        const likes = await res.json();
        setLike(likes?.photoLikes?.data?.likes[0]?.like);
      }
    })();
  }, [displayName, asset_id]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/getComments", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          body: JSON.stringify({
            photoId: asset_id,
          }),
        },
      });
      const comments = await res.json();
      setPhotoComments(comments.photoComments.data.comments);
    })();
  }, [newComment, asset_id]);

  const sendComment = async () => {
    if (!sendingComment) {
      setSendingComment(true);
      setComment("");
      const res = await fetch("/api/postComment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          body: JSON.stringify({
            photoId: asset_id,
            displayName,
            profilePic,
            comment,
          }),
        },
      });
      const data = await res.json();
      setNewComment(data);
      setSendingComment(false);
    } else console.log("Anti-spam");
  };

  const likeButton = async () => {
    setLike(!like);
    const res = await fetch("/api/modifyLike", {
      method: "POST",
      headers: {
        body: JSON.stringify({
          displayName: displayName,
          photoId: asset_id,
          like: like ? false : true,
        }),
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const focusCommentInput = () => commentInput.current.focus();

  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Head>
          <title>Good Food - Viewing Photo {asset_id}</title>
        </Head>
        <div className={styles.content}>
          <Header />
          <motion.div
            className={
              toggleComments
                ? styles.displayNone
                : width >= 1024 && height >= 768
                ? height >= 768
                  ? styles.imageSection
                  : styles.displayNone
                : styles.imageSection
            }
          >
            <Image
              src={secure_url}
              alt=""
              className={styles.image}
              layout="fill"
            />
          </motion.div>
          <button
            className={styles.responsiveButton}
            onClick={() => setToggleComments(!toggleComments)}
          >
            To comments section
          </button>
          <div
            className={
              toggleComments
                ? styles.commentsSection
                : width >= 1024
                ? height >= 768
                  ? styles.commentsSection
                  : styles.displayNone
                : styles.displayNone
            }
          >
            <div className={styles.photoDescription}>
              <div className={styles.profilePic}>
                <Image
                  src={
                    "https://res.cloudinary.com/dgkdpysp5/image/upload/v1649855065/restaurant-app-images/landing_prznt2.jpg"
                  }
                  alt=""
                  layout="fill"
                />
              </div>
              <div className={styles.photoDetails}>
                <h1 className={styles.userPosted}>
                  Our Restaurant
                  <span className={styles.datePosted}>
                    {moment(`${uploaded_at}`).utc().format("MMM Do YYYY")}
                  </span>
                </h1>
              </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.like} onClick={likeButton}>
                {like ? (
                  <Image
                    src={"/static/like-fill.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                ) : (
                  <Image
                    src={"/static/like.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                )}
                <p className={styles.buttonLabel}>Like</p>
              </div>
              <div className={styles.comment} onClick={focusCommentInput}>
                <Image
                  src={"/static/comment.svg"}
                  alt=""
                  width={25}
                  height={25}
                />
                <p className={styles.buttonLabel}>Comment</p>
              </div>
            </div>
            <div className={styles.commentsSpace}>
              <div className={styles.comments}>
                {photoComments.map((comment, i) => {
                  return (
                    <Comment
                      key={i}
                      commentId={comment.id}
                      displayName={comment.displayName}
                      comment={comment.comment}
                      visible={comment.visible}
                      profilePic={comment.profilePic}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.commentInput}>
              {sendingComment ? (
                <Loading />
              ) : (
                <input
                  type="text"
                  ref={commentInput}
                  value={comment}
                  className={styles.inputComment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      sendComment();
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default PhotoId;
