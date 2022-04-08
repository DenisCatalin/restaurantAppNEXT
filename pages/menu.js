import Header from "../components/header/header";
import styles from "../styles/Menu.module.css";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/navbar/navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { getMenuItems } from "../lib/menuFetch";
import MenuItem from "../components/menuItem/menuItem";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const beefItems = await getMenuItems("Beef");
  const chickenItems = await getMenuItems("Chicken");
  const dessertItems = await getMenuItems("Dessert");
  const lambItems = await getMenuItems("Lamb");
  const miscellaneousItems = await getMenuItems("Miscellaneous");
  const pastaItems = await getMenuItems("Pasta");
  const porkItems = await getMenuItems("Pork");
  const seafoodItems = await getMenuItems("Seafood");
  const sideItems = await getMenuItems("Side");
  const starterItems = await getMenuItems("Starter");
  const veganItems = await getMenuItems("Vegan");
  const vegetarianItems = await getMenuItems("Vegetarian");
  const breakfastItems = await getMenuItems("Breakfast");
  const goatItems = await getMenuItems("Goat");

  return {
    props: {
      beefItems,
      chickenItems,
      dessertItems,
      lambItems,
      miscellaneousItems,
      pastaItems,
      porkItems,
      seafoodItems,
      sideItems,
      starterItems,
      veganItems,
      vegetarianItems,
      breakfastItems,
      goatItems,
    },
  };
}

const Menu = ({
  beefItems,
  chickenItems,
  dessertItems,
  lambItems,
  miscellaneousItems,
  pastaItems,
  porkItems,
  seafoodItems,
  sideItems,
  starterItems,
  veganItems,
  vegetarianItems,
  breakfastItems,
  goatItems,
}) => {
  const [moveCircle, setMoveCircle] = useState(18);
  const [isHover, setIsHover] = useState(0);
  const [labelLink, setLabelLink] = useState("");
  const [moveLabel, setMoveLabel] = useState(25);

  const navbarVisibility = useSelector((state) => state.navbar);
  console.log("text", navbarVisibility);
  return (
    <div className={styles.imageBG}>
      <motion.div
        className={styles.categoriesCollections}
        onMouseLeave={() => {
          setIsHover(0);
          setMoveLabel(0);
        }}
        initial={{ scale: 1 }}
        animate={{
          y: [-100, 0],
          scale: navbarVisibility ? 1 : 0,
        }}
      >
        <motion.div
          className={styles.menuCircle}
          animate={{
            x: moveCircle,
            scale: isHover,
          }}
        ></motion.div>
        <div className={styles.categories}>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/meat.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(0);
                  setIsHover(1);
                  setLabelLink("BEEF");
                  setMoveLabel(9);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/turkey.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(70);
                  setIsHover(1);
                  setLabelLink("CHICKEN");
                  setMoveLabel(68);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/dessert.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(140);
                  setIsHover(1);
                  setLabelLink("DESSERT");
                  setMoveLabel(135);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/lamb.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(210);
                  setIsHover(1);
                  setLabelLink("LAMB");
                  setMoveLabel(215);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/food.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(279);
                  setIsHover(1);
                  setLabelLink("MISCELLANEOUS");
                  setMoveLabel(250);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/spaguetti.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(348);
                  setIsHover(1);
                  setLabelLink("PASTA");
                  setMoveLabel(352);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/pork.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(420);
                  setIsHover(1);
                  setLabelLink("PORK");
                  setMoveLabel(427);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/seafood.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(488);
                  setIsHover(1);
                  setLabelLink("SEAFOOD");
                  setMoveLabel(480);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/rice.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(558);
                  setIsHover(1);
                  setLabelLink("SIDE");
                  setMoveLabel(570);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/starters.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(626);
                  setIsHover(1);
                  setLabelLink("STARTER");
                  setMoveLabel(624);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/salad.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(696);
                  setIsHover(1);
                  setLabelLink("VEGAN");
                  setMoveLabel(697);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/eco-food.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(765);
                  setIsHover(1);
                  setLabelLink("VEGETARIAN");
                  setMoveLabel(750);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/breakfast.png"}
                alt=""
                width={40}
                height={40}
                onMouseEnter={() => {
                  setMoveCircle(835);
                  setIsHover(1);
                  setLabelLink("BREAKFAST");
                  setMoveLabel(825);
                }}
              />
            </a>
          </Link>
          <Link href={`#${labelLink}`}>
            <a>
              <Image
                src={"/static/goat.png"}
                alt=""
                width={40}
                height={38}
                onMouseEnter={() => {
                  setMoveCircle(904);
                  setIsHover(1);
                  setLabelLink("GOAT");
                  setMoveLabel(915);
                }}
              />
            </a>
          </Link>
        </div>
        <motion.p
          animate={{ x: moveLabel, scale: isHover }}
          className={styles.menuNavText}
        >
          {labelLink}
        </motion.p>
      </motion.div>
      <div className={styles.container}>
        <Head>
          <title>Good Food - Menu</title>
        </Head>
        <Header />
        <div className={styles.menu}>
          <div className={styles.foodCategories} id="BEEF">
            <h1 className={styles.categoryTitle}>Beef</h1>
            <div className={styles.collection}>
              {beefItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="CHICKEN">
            <h1 className={styles.categoryTitle}>Chicken</h1>
            <div className={styles.collection}>
              {chickenItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="DESSERT">
            <h1 className={styles.categoryTitle}>Dessert</h1>
            <div className={styles.collection}>
              {dessertItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="LAMB">
            <h1 className={styles.categoryTitle}>Lamb</h1>
            <div className={styles.collection}>
              {lambItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="MISCELLANEOUS">
            <h1 className={styles.categoryTitle}>Miscellaneous</h1>
            <div className={styles.collection}>
              {miscellaneousItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="PASTA">
            <h1 className={styles.categoryTitle}>Pasta</h1>
            <div className={styles.collection}>
              {pastaItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="PORK">
            <h1 className={styles.categoryTitle}>Pork</h1>
            <div className={styles.collection}>
              {porkItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="SEAFOOD">
            <h1 className={styles.categoryTitle}>Seafood</h1>
            <div className={styles.collection}>
              {seafoodItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="SIDE">
            <h1 className={styles.categoryTitle}>Side</h1>
            <div className={styles.collection}>
              {sideItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="STARTER">
            <h1 className={styles.categoryTitle}>Starter</h1>
            <div className={styles.collection}>
              {starterItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="VEGAN">
            <h1 className={styles.categoryTitle}>Vegan</h1>
            <div className={styles.collection}>
              {veganItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="VEGETARIAN">
            <h1 className={styles.categoryTitle}>Vegetarian</h1>
            <div className={styles.collection}>
              {vegetarianItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="BREAKFAST">
            <h1 className={styles.categoryTitle}>Breakfast</h1>
            <div className={styles.collection}>
              {breakfastItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
          <div className={styles.foodCategories} id="GOAT">
            <h1 className={styles.categoryTitle}>Goat</h1>
            <div className={styles.collection}>
              {goatItems.map((item, i) => (
                <MenuItem key={i} items={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default Menu;
