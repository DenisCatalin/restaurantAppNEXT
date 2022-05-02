import styles from "../styles/Profile.module.css";
import Head from "next/head";
import Header from "../components/header/header";
import NavBar from "../components/navbar/navbar";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading-component/loading-component";
import { motion } from "framer-motion";
import BookingHistory from "../components/booking-history/booking-history";
import OrderHistory from "../components/order-history/order-history";
import {
  useFetchUserDetails,
  useCheckBookingHistory,
  useCheckOrders,
  useChangeDisplayName,
  useChangeAddress,
} from "../utils/useFetch";

const Profile = () => {
  const [profilePic, setProfilePic] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [loadingProfilePic, setIsLoadingProfilePic] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [editDisplayName, setEditDisplayName] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [issuer, setIssuer] = useState();
  const [bookings, setBookings] = useState();
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const displayNameInput = useRef(null);
  const addressInput = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await useFetchUserDetails();

      setProfilePic(data?.userDetails?.data?.users[0].profilePic);
      setDisplayName(data?.userDetails?.data?.users[0].displayName);
      setEmail(data?.userDetails?.data?.users[0].email);
      setAddress(data?.userDetails?.data?.users[0].address);
      setIsLoadingProfilePic(false);
      setIsLoading(false);
      setIssuer(data?.userDetails?.data?.users[0].issuer);
    })();
  }, [displayName, address]);

  useEffect(() => {
    (async () => {
      const data = await useCheckBookingHistory(issuer);
      setBookings(data?.checkBookingForUser?.reservations);
      setLoadingBookings(false);
    })();
  }, [loadingBookings, issuer]);

  useEffect(() => {
    (async () => {
      if (orders === undefined || orders.length === 0) {
        const data = await useCheckOrders(issuer);
        if (data !== undefined) {
          const item = data?.checkOrderForUser;
          setOrders(item);
        }
        setLoadingOrders(false);
      }
    })();
  }, [loadingOrders, issuer, orders]);

  const handleEditDisplayName = () => {
    setEditDisplayName(!editDisplayName);
    displayNameInput.current.value = "";
    displayNameInput.current.focus();
  };

  const handleEditAddress = () => {
    setEditAddress(!editAddress);
    addressInput.current.value = "";
    addressInput.current.focus();
  };

  const saveNewDisplayName = async () => {
    if (displayNameInput.current.value.length > 2) {
      setEditDisplayName(!editDisplayName);
      displayNameInput.current.value = "";
      const data = await useChangeDisplayName(
        newDisplayName,
        displayName,
        profilePic,
        email
      );
      setDisplayName(
        data?.changes?.data?.update_users?.returning[0]?.displayName
      );
    } else console.log("Too short");
  };

  const saveNewAddress = async () => {
    if (addressInput.current.value.length > 10) {
      setEditAddress(!editAddress);
      addressInput.current.value = "";
      const data = await useChangeAddress(
        newAddress,
        displayName,
        profilePic,
        email
      );
      setAddress(data?.changes?.data?.update_users?.returning[0]?.address);
    } else console.log("Too short");
  };

  return (
    <div className={styles.imageBG}>
      <Head>
        <title>Good Food - Profile</title>
      </Head>
      <div className={styles.container}>
        <Header />
        {isLoading ? <Loading /> : <BookingHistory bookings={bookings} />}
        <div className={styles.tools}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles.Item}>
              <div className={styles.profilePic}>
                <div className={styles.displayImage}>
                  <Image
                    src={loadingProfilePic ? "/static/logo.svg" : profilePic}
                    alt={displayName}
                    layout="fill"
                  />
                </div>
              </div>
              <div className={styles.itemContent}>
                <div className={styles.spaceBetween}>
                  <motion.h1 animate={{ scale: editDisplayName ? 0 : 1 }}>
                    {displayName}
                  </motion.h1>
                  <motion.input
                    type="text"
                    className={styles.input}
                    animate={{ scale: editDisplayName ? 1 : 0 }}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    ref={displayNameInput}
                  />
                  <div className={styles.icons}>
                    {editDisplayName ? (
                      <Image
                        src={"/static/done.svg"}
                        alt="Edit"
                        width={30}
                        height={30}
                        className={styles.hover}
                        onClick={saveNewDisplayName}
                      />
                    ) : null}
                    {editDisplayName ? (
                      <Image
                        src={"/static/close.svg"}
                        alt="Edit"
                        width={30}
                        height={30}
                        className={styles.hover}
                        onClick={handleEditDisplayName}
                      />
                    ) : (
                      <Image
                        src={"/static/edit.svg"}
                        alt="Edit"
                        width={30}
                        height={30}
                        className={styles.hover}
                        onClick={handleEditDisplayName}
                      />
                    )}
                  </div>
                </div>
                <h3>{email}</h3>
              </div>
            </div>
          )}
          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles.Item}>
              <div className={styles.profilePic}>
                <Image
                  src={"/static/home.svg"}
                  alt={displayName}
                  layout="fill"
                />
              </div>
              <div className={styles.itemContent}>
                <h1>Address</h1>
                <div className={styles.spaceBetween}>
                  <motion.h3
                    className={styles.addressText}
                    animate={{ scale: editAddress ? 0 : 1 }}
                  >
                    {address}
                  </motion.h3>
                  <motion.input
                    type="text"
                    className={styles.inputAddress}
                    animate={{ scale: editAddress ? 1 : 0 }}
                    ref={addressInput}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                  <div className={styles.icons}>
                    {editAddress ? (
                      <Image
                        src={"/static/done.svg"}
                        alt="Edit"
                        width={30}
                        height={30}
                        className={styles.hover}
                        onClick={saveNewAddress}
                      />
                    ) : null}
                    {editAddress ? (
                      <Image
                        src={"/static/close.svg"}
                        alt="Edit"
                        width={30}
                        height={30}
                        className={styles.hover}
                        onClick={handleEditAddress}
                      />
                    ) : (
                      <Image
                        src={"/static/edit.svg"}
                        alt="Edit"
                        width={30}
                        height={30}
                        className={styles.hover}
                        onClick={handleEditAddress}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {isLoading ? <Loading /> : <OrderHistory orders={orders} />}
      </div>
      <NavBar showNav={false} showOpen={true} />
    </div>
  );
};

export default Profile;
