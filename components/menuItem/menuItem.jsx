import styles from "./MenuItem.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getItemById } from "../../lib/menuFetch";
import Modal from "react-modal";
import Ingredient from "../ingredient/ingredient";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import Loading from "../loading-button/loading-button";
import useWindowDimensions from "../../utils/useWindowDimensions";

Modal.setAppElement("#__next");

function Content({ id, img, dataMeal }) {
  const meal = { ...dataMeal };
  const [isHover, setIsHover] = useState(false);

  let ingredients = [];
  let ingredients2 = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]}`);
    } else break;
  }
  ingredients.sort();

  ingredients.forEach((item) => {
    if (ingredients2.indexOf(item) < 0) {
      ingredients2.push(item);
    }
  });

  const comp = ingredients2.map((ing, i) => {
    const string = `https://www.themealdb.com/images/ingredients/${ing}.png`;
    return <Ingredient key={i} text={ing} img={string} />;
  });

  return (
    <>
      <div className={styles.modalImageContainer}>
        <motion.img
          animate={{ scale: [1, 1] }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 2.8, y: 100 }}
          onMouseEnter={() => setIsHover(!isHover)}
          onMouseLeave={() => setIsHover(!isHover)}
          src={img}
          alt=""
          width={150}
          height={150}
          className={styles.modalImage}
        />
      </div>
      <motion.div
        className={styles.modalMealDescrption}
        animate={{ scale: isHover ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.modalUpperText}>
          <h1>{meal.strMeal}</h1>
          <h1>
            <span className={styles.dollar}>$</span>9.99
          </h1>
        </div>
        <div className={styles.modalDescrption}>
          <h1>{meal.strInstructions}</h1>
        </div>
      </motion.div>
      <div className={styles.modalUpperText}>
        <h1>Inredients</h1>
        <h1>{meal.strArea}</h1>
      </div>
      <div className={styles.modalIngredientsContainer}>{comp}</div>
    </>
  );
}

const MenuItem = ({ items }) => {
  const { width, height } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const [mealImage, setMealImage] = useState(undefined);
  let mealStorage = {};

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const { idMeal, strMeal, strMealThumb } = items;

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://api.resmush.it/ws.php?img=${strMealThumb}&qlty=30`
      );
      const data = await res.json();
      setMealImage(data?.dest);
    })();
  }, []);

  const [meal, setMeal] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const price = { price: 9.99 };
    (async () => {
      const data = await getItemById(idMeal);
      const data2 = { ...data, ...price };
      setMeal(data2);
    })();
  }, [idMeal]);

  return (
    <div className={styles.container}>
      <div className={styles.textSide} onClick={toggleOpen}>
        <h1 className={styles.mealName}>
          {strMeal.length > 35 ? strMeal.substring(0, 28) + "..." : strMeal}
        </h1>
        <h2 className={styles.mealDescription}>
          {meal.strInstructions &&
            (meal.strInstructions.length > 500
              ? meal.strInstructions.substring(0, 220) + "..."
              : meal.strInstructions.substring(0, 220) + "...")}
        </h2>
        <h1 className={styles.mealPrice}>
          <span className={styles.dollar}>$</span>9.99
        </h1>
      </div>
      <div className={styles.imageCard} onClick={toggleOpen}>
        {mealImage !== undefined ? (
          <Image
            src={mealImage}
            alt={strMeal}
            width={120}
            height={120}
            quality={50}
            blurDataURL={strMealThumb}
            placeholder="blur"
            className={styles.itemImage}
          />
        ) : (
          <Loading />
        )}
      </div>
      <Modal
        isOpen={isOpen}
        className={styles.modal}
        contentLabel="Menu Item"
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContainer}>
          <motion.div
            className={styles.modalClose}
            onClick={toggleOpen}
            initial={{ scale: 0.9 }}
            whileHover={{ rotate: 180, scale: 1 }}
          >
            <h1>X</h1>
          </motion.div>
          <Content id={idMeal} img={strMealThumb} dataMeal={meal} />
          <div className={styles.modalButtons}>
            <motion.button
              className={styles.modalAddToCart}
              whileHover={{ rotate: [0, 5, -5, 0] }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                dispatch(addToCart(meal));
                toggleOpen();
              }}
            >
              <Image
                src={"/static/add_to_cart.svg"}
                alt=""
                width={30}
                height={30}
              />
              {width > 680 ? <p>Add to cart</p> : null}
            </motion.button>
            <motion.button
              className={styles.modalAddToFav}
              whileHover={{ rotate: [0, 5, -5, 0] }}
              whileTap={{ scale: 0.8 }}
            >
              <Image
                src={"/static/add_to_favourite.svg"}
                alt=""
                width={30}
                height={30}
              />
              {width > 680 ? <p>Add to favourite</p> : null}
            </motion.button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuItem;
