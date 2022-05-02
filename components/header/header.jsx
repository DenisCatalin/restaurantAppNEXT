import Image from "next/image";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import HeaderCart from "../header-cart/header-cart";
import {
  useFetchUserDetails,
  useLogout,
  useUploadPhoto,
} from "../../utils/useFetch";
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
  const [toggleCart, setToggleCart] = useState(false);
  const isMounted = useRef(true);

  const cart = useSelector((state) => state.cart);

  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        try {
          const { email } = await magic.user.getMetadata();
          if (email) {
            const didToken = await magic.user.getIdToken();

            const data = await useFetchUserDetails();

            if (isMounted.current) {
              setProfilePic(data?.userDetails?.data?.users[0].profilePic);
              setDisplayName(data?.userDetails?.data?.users[0].displayName);
              setIsLoadingProfilePic(false);

              setUsername(email);
              setLoggedIn(true);
              setDidToken(didToken);
            }
          }
        } catch (error) {
          console.error("Can't retrieve email in NavBar", error);
        }
      } else {
      }

      setIsLoading(false);
    })();

    return () => {
      isMounted.current = false;
    };
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
      const res = await useLogout(didToken);
      console.log(res);

      setShowDropdown(!showDropdown);
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

    const response = await useUploadPhoto(
      displayName,
      data.secure_url,
      profilePic,
      username
    );
    console.log(response);
  };

  const handleToggleCart = () => {
    setToggleCart(!toggleCart);
    setTogglemodal(false);
    setShowDropdown(false);
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
        <div className={styles.logoHeader}>
          <Image
            src={"/static/logo.svg"}
            alt=""
            onClick={handleOnClickLogo}
            className={styles.logo}
            layout="fill"
          />
        </div>
      </motion.div>
      <div className={styles.headerTools}>
        {loggedIn ? (
          <motion.div
            className={styles.cartContainer}
            onClick={handleToggleCart}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={"/static/header_cart.svg"}
              alt="Shopping Cart"
              layout="fill"
              onClick={handleToggleModal}
            />
            <span className={styles.countCartItems}>{getItemsCount()}</span>
          </motion.div>
        ) : null}
        <motion.div
          className={styles.usernameContainer}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? null : (
            <div
              className={styles.userName}
              onClick={
                loggedIn
                  ? () => {
                      setShowDropdown(!showDropdown);
                      setToggleCart(false);
                    }
                  : handleOnClick
              }
            >
              {loggedIn ? (
                <div className={styles.headerProfilePic}>
                  <Image
                    src={
                      loadingProfilePic
                        ? "/static/logo.svg"
                        : profilePic === undefined
                        ? "/static/logo.svg"
                        : profilePic
                    }
                    alt=""
                    layout="fill"
                    className={styles.profilePic}
                  />
                </div>
              ) : (
                <h3 style={{ cursor: "pointer" }}>Login</h3>
              )}
            </div>
          )}
        </motion.div>
      </div>
      <Modal
        isOpen={toggleModal}
        contentLabel="Change Profile Picture"
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
      <motion.div
        className={styles.dropdownCart}
        animate={{ scale: toggleCart ? 1 : 0 }}
      >
        <HeaderCart cart={cart} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
