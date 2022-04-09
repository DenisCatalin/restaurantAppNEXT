import Header from "../components/header/header";
import styles from "../styles/Menu.module.css";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/navbar/navbar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [lastKnownCirle, setLastKnownCirle] = useState(0);
  const [lastKnownLabel, setLastKnownLabel] = useState(9);
  const [lastKnownLabelName, setLastKnownLabelName] = useState("");

  const navbarVisibility = useSelector((state) => state.navbar);

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const scroll = scrollHeight - scrollTop - clientHeight;

    console.log(scroll);

    if (!categoryClicked) {
      if (scroll < 20609 && scroll > 18409) {
        setMoveCircle(0);
        setIsHover(1);
        setLabelLink("BEEF");
        setLastKnownLabelName("BEEF");
        setMoveLabel(9);
        setLastKnownCirle(0);
        setLastKnownLabel(9);
      }
      if (scroll < 17609 && scroll > 15909) {
        setMoveCircle(70);
        setIsHover(1);
        setLabelLink("CHICKEN");
        setLastKnownLabelName("CHICKEN");
        setMoveLabel(68);
        setLastKnownCirle(70);
        setLastKnownLabel(68);
      }
      if (scroll < 15109 && scroll > 11309) {
        setMoveCircle(140);
        setIsHover(1);
        setLabelLink("DESSERT");
        setLastKnownLabelName("DESSERT");
        setMoveLabel(135);
        setLastKnownCirle(140);
        setLastKnownLabel(135);
      }

      if (scroll < 10609 && scroll > 10209) {
        setMoveCircle(210);
        setIsHover(1);
        setLabelLink("LAMB");
        setLastKnownLabelName("LAMB");
        setMoveLabel(215);
        setLastKnownCirle(210);
        setLastKnownLabel(215);
      }

      if (scroll < 9409 && scroll > 9309) {
        setMoveCircle(279);
        setIsHover(1);
        setLabelLink("MISCELLANEOUS");
        setLastKnownLabelName("MISCELLANEOUS");
        setMoveLabel(250);
        setLastKnownCirle(279);
        setLastKnownLabel(250);
      }

      if (scroll < 8609 && scroll > 8509) {
        setMoveCircle(348);
        setIsHover(1);
        setLabelLink("PASTA");
        setLastKnownLabelName("PASTA");
        setMoveLabel(352);
        setLastKnownCirle(348);
        setLastKnownLabel(352);
      }

      if (scroll < 7909 && scroll > 7109) {
        setMoveCircle(420);
        setIsHover(1);
        setLabelLink("PORK");
        setLastKnownLabelName("PORK");
        setMoveLabel(427);
        setLastKnownCirle(420);
        setLastKnownLabel(427);
      }

      if (scroll < 6409 && scroll > 5209) {
        setMoveCircle(488);
        setIsHover(1);
        setLabelLink("SEAFOOD");
        setLastKnownLabelName("SEAFOOD");
        setMoveLabel(480);
        setLastKnownCirle(488);
        setLastKnownLabel(480);
      }

      if (scroll < 4709 && scroll > 3909) {
        setMoveCircle(558);
        setIsHover(1);
        setLabelLink("SIDE");
        setLastKnownLabelName("SIDE");
        setMoveLabel(570);
        setLastKnownCirle(558);
        setLastKnownLabel(570);
      }

      if (scroll < 3409 && scroll > 3209) {
        setMoveCircle(626);
        setIsHover(1);
        setLabelLink("STARTER");
        setLastKnownLabelName("STARTER");
        setMoveLabel(624);
        setLastKnownCirle(626);
        setLastKnownLabel(624);
      }

      if (scroll < 2909 && scroll > 2809) {
        setMoveCircle(696);
        setIsHover(1);
        setLabelLink("VEGAN");
        setLastKnownLabelName("VEGAN");
        setMoveLabel(697);
        setLastKnownCirle(696);
        setLastKnownLabel(697);
      }

      if (scroll < 2509 && scroll > 809) {
        setMoveCircle(765);
        setIsHover(1);
        setLabelLink("VEGETARIAN");
        setLastKnownLabelName("VEGETARIAN");
        setMoveLabel(750);
        setLastKnownCirle(765);
        setLastKnownLabel(750);
      }

      if (scroll < 109) {
        setMoveCircle(835);
        setIsHover(1);
        setLabelLink("BREAKFAST");
        setLastKnownLabelName("BREAKFAST");
        setMoveLabel(825);
        setLastKnownCirle(835);
        setLastKnownLabel(825);
      }

      if (scroll === 0) {
        setMoveCircle(904);
        setIsHover(1);
        setLabelLink("GOAT");
        setLastKnownLabelName("GOAT");
        setMoveLabel(915);
        setLastKnownCirle(904);
        setLastKnownLabel(915);
      }
    }
  };
  return (
    <div className={styles.imageBG}>
      <motion.div
        className={styles.categoriesCollections}
        onMouseLeave={() => {
          setIsHover(lastKnownLabelName === "" ? 0 : 1);
          setMoveCircle(lastKnownCirle);
          setMoveLabel(lastKnownLabel);
          setLabelLink(lastKnownLabelName);
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("BEEF");
                  setLastKnownLabel(9);
                  setLastKnownCirle(0);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("CHICKEN");
                  setLastKnownLabel(68);
                  setLastKnownCirle(70);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("DESSERT");
                  setLastKnownLabel(135);
                  setLastKnownCirle(140);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("LAMB");
                  setLastKnownLabel(215);
                  setLastKnownCirle(210);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("MISCELLANEOUS");
                  setLastKnownLabel(250);
                  setLastKnownCirle(279);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("PASTA");
                  setLastKnownLabel(352);
                  setLastKnownCirle(348);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("PORK");
                  setLastKnownLabel(427);
                  setLastKnownCirle(420);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("SEAFOOD");
                  setLastKnownLabel(480);
                  setLastKnownCirle(488);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("SIDE");
                  setLastKnownLabel(570);
                  setLastKnownCirle(558);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("STARTER");
                  setLastKnownLabel(624);
                  setLastKnownCirle(626);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("VEGAN");
                  setLastKnownLabel(697);
                  setLastKnownCirle(696);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("VEGETARIAN");
                  setLastKnownLabel(750);
                  setLastKnownCirle(765);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("BREAKFAST");
                  setLastKnownLabel(825);
                  setLastKnownCirle(835);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
                onClick={() => {
                  console.log("clicked");
                  setCategoryClicked(true);
                  setLastKnownLabelName("GOAT");
                  setLastKnownLabel(915);
                  setLastKnownCirle(904);
                  setTimeout(() => {
                    setCategoryClicked(false);
                    console.log("done timer");
                  }, 5000);
                }}
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
      <div className={styles.container} onScroll={handleScroll}>
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
