import styles from "./Navbar.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import clx from "classnames";

const NavBar = ({ showNav = true, showOpen = false }) => {
  const [moveCircle, setMoveCircle] = useState(18);
  const [isHover, setIsHover] = useState(0);
  const [labelLink, setLabelLink] = useState("");
  const [moveLabel, setMoveLabel] = useState(25);
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.navbarContainer}
        onMouseLeave={() => {
          setIsHover(0);
          setMoveLabel(0);
        }}
        animate={{
          y: [150, 0],
          scale: showNav ? (showNavbar ? 0 : 1) : showNavbar ? 1 : 0,
        }}
        // transition={{ delay: 0.7 }}
      >
        <div className={styles.navbarLabel}>
          <motion.p
            animate={{ x: moveLabel, scale: isHover }}
            style={{ textShadow: "3px 2px #00000096" }}
          >
            {labelLink}
          </motion.p>
        </div>
        <motion.div
          className={styles.navbarCircle}
          animate={{
            x: moveCircle,
            scale: isHover,
          }}
        ></motion.div>
        <div className={styles.navbarCollection}>
          <Link href="/">
            <a>
              <Image
                src={"/static/home.svg"}
                alt=""
                width={45}
                height={45}
                className={styles.navbarImage}
                onMouseEnter={() => {
                  setMoveCircle(2);
                  setIsHover(1);
                  setLabelLink("HOME");
                  setMoveLabel(8);
                }}
              />
            </a>
          </Link>
          <Link href="/schedule">
            <a>
              <Image
                src={"/static/calendar.svg"}
                alt=""
                width={45}
                height={45}
                className={styles.navbarImage}
                onMouseEnter={() => {
                  setMoveCircle(103);
                  setIsHover(1);
                  setLabelLink("SCHEDULE");
                  setMoveLabel(90);
                }}
              />
            </a>
          </Link>
          <Link href="/gallery">
            <a>
              <Image
                src={"/static/gallery.svg"}
                alt=""
                width={45}
                height={45}
                className={styles.navbarImage}
                onMouseEnter={() => {
                  setMoveCircle(202);
                  setIsHover(1);
                  setLabelLink("GALLERY");
                  setMoveLabel(200);
                }}
              />
            </a>
          </Link>
          <Link href="/menu">
            <a>
              <Image
                src={"/static/menu.svg"}
                alt=""
                width={45}
                height={45}
                className={styles.navbarImage}
                onMouseEnter={() => {
                  setMoveCircle(302);
                  setIsHover(1);
                  setLabelLink("MENU");
                  setMoveLabel(308);
                }}
              />
            </a>
          </Link>
          <Link href="/about">
            <a>
              <Image
                src={"/static/about.svg"}
                alt=""
                width={45}
                height={45}
                className={styles.navbarImage}
                onMouseEnter={() => {
                  setMoveCircle(402);
                  setIsHover(1);
                  setLabelLink("ABOUT");
                  setMoveLabel(402);
                }}
              />
            </a>
          </Link>
          <Link href="/contact">
            <a>
              <Image
                src={"/static/contact.svg"}
                alt=""
                width={45}
                height={45}
                className={styles.navbarImage}
                onMouseEnter={() => {
                  setMoveCircle(502);
                  setIsHover(1);
                  setLabelLink("CONTACT");
                  setMoveLabel(495);
                }}
              />
            </a>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className={showNavbar ? clx(styles.openNav, styles.up) : styles.openNav}
        animate={{ scale: showOpen ? 1 : 0 }}
        onClick={() => setShowNavbar(!showNavbar)}
        initial={{ borderRadius: 50 }}
        whileHover={{
          rotate: 90,
          borderRadius: 10,
        }}
        whileTap={{ scale: 0.7 }}
        transition={{ delay: 0 }}
      >
        <motion.div
          className={styles.openNavElipse}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.2 }}
        ></motion.div>
        <motion.div
          className={styles.openNavElipse}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.3 }}
        ></motion.div>
        <motion.div
          className={styles.openNavElipse}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.4 }}
        ></motion.div>
        <motion.div
          className={styles.openNavElipse}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.5 }}
        ></motion.div>
        <motion.div
          className={styles.openNavElipse}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.6 }}
        ></motion.div>
        <motion.div
          className={styles.openNavElipse}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.7 }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default NavBar;
