import Image from "next/image";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { magic } from "../../lib/magic-client";
import { useState, useEffect } from "react";

const Header = () => {
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [didToken, setDidToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState();
  const [profilePic, setProfilePic] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingProfilePic, setIsLoadingProfilePic] = useState(true);

  const router = useRouter();

  const handleOnClick = () => {
    router.push("/login");
  };

  const handleOnClickLogo = () => {
    router.push("/");
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
  }, []);

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
          />
        </div>
        <motion.button
          className={styles.manageProfile}
          whileHover={{ rotate: [0, -10, 10, 0] }}
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
