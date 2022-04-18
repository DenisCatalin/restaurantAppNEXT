import Image from "next/image";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const Header = () => {
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [didToken, setDidToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState();
  const [profilePic, setProfilePic] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingProfilePic, setIsLoadingProfilePic] = useState(true);
  const [imgSrc, setImgSrc] = useState();
  const [uploadData, setUploadData] = useState(false);
  const [toggleModal, setTogglemodal] = useState(false);

  useEffect(async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();

        const res = await fetch("/api/userDetails");
        const data = await res.json();

        setProfilePic(data?.userDetails?.data?.users[0].profilePic);
        setDisplayName(data?.userDetails?.data?.users[0].displayName);
        setIsLoadingProfilePic(false);

        if (email) {
          setUsername(email);
          setLoggedIn(true);
          setDidToken(didToken);
        }
      } catch (error) {
        console.error("Can't retrieve email in NavBar", error);
      }
    } else {
    }

    setIsLoading(false);
  }, [profilePic]);

  const router = useRouter();

  const handleOnClick = () => {
    router.push("/login");
  };

  const handleOnClickLogo = () => {
    router.push("/");
  };

  const handleToggleModal = () => {
    setTogglemodal(!toggleModal);
    setUploadData(false);
  };

  const logout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      setShowDropdown(!showDropdown);

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  const uploadPhoto = (e) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImgSrc(onLoadEvent.target.result);
      setUploadData(true);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    console.log(fileInput);

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "restaurant-app-profile-pics");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dgkdpysp5/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setProfilePic(data.secure_url);
    handleToggleModal();

    const res = await fetch("/api/uploadPhoto", {
      method: "POST",
      headers: {
        body: JSON.stringify({
          displayName: displayName,
          newProfilePic: data.secure_url,
          profilePic: profilePic,
          email: username,
        }),
      },
    });
    const response = await res.json();
    console.log(response);
  };

  return (
    <motion.div
      className={styles.headerContainer}
      animate={{ y: [-250, 0], opacity: [0, 1] }}
    >
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.8 }}
      >
        <Image
          src={"/static/logo.svg"}
          alt=""
          width={250}
          height={70}
          onClick={handleOnClickLogo}
          className={styles.logo}
        />
      </motion.div>
      <motion.div
        className={styles.usernameContainer}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? null : (
          <div
            className={styles.userName}
            onClick={
              loggedIn ? () => setShowDropdown(!showDropdown) : handleOnClick
            }
          >
            {loggedIn ? (
              <Image
                src={loadingProfilePic ? "/static/logo.svg" : profilePic}
                alt=""
                width={70}
                height={70}
                className={styles.profilePic}
              />
            ) : (
              <h3 style={{ cursor: "pointer" }}>Login</h3>
            )}
          </div>
        )}
      </motion.div>
      <Modal
        isOpen={toggleModal}
        contentLabel="Watch the video"
        // onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.containerModal}>
          <div className={styles.center}>
            <form
              onChange={uploadPhoto}
              className={styles.imageContainerModal}
              onSubmit={uploadFile}
            >
              <input type="file" name="file" />
              {uploadData ? (
                <div className={styles.imageHolder}>
                  <Image src={imgSrc} alt="" layout="fill" />
                </div>
              ) : null}
              <button className={styles.buttonUpload}>Upload</button>
            </form>
          </div>
          <div className={styles.buttonsModal}>
            <button className={styles.buttonModal} onClick={handleToggleModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <motion.div
        className={styles.dropdown}
        animate={{ scale: showDropdown ? 1 : 0 }}
      >
        <div className={styles.dropdownImage}>
          <Image
            src={loadingProfilePic ? "/static/logo.svg" : profilePic}
            alt={displayName}
            layout="fill"
            className={styles.profilePic}
            onClick={handleToggleModal}
          />
        </div>
        <motion.button
          className={styles.manageProfile}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          onClick={() => router.push("/profile")}
        >
          Manage Profile
        </motion.button>
        <h2>{displayName}</h2>
        <h3>{username}</h3>
        <motion.button
          className={styles.signOut}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          onClick={logout}
        >
          Sign Out
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Header;
