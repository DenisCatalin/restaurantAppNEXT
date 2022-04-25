import { motion } from "framer-motion";
import Head from "next/head";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import Loading from "../components/loading-button/loading-button";
import LoadingPage from "../components/loading-component/loading-component";
import styles from "../styles/Booking.module.css";
import { useState, useEffect } from "react";
import cls from "classnames";

const Booking = () => {
  let months = [
    "Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Day",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const currentYear = new Date();
  const cYear = currentYear.getFullYear();
  let years = ["Year", cYear, cYear + 1];

  const seatReserved = {
    background: "#646464",
    pointerEvents: "none",
  };
  const [notification, setNotification] = useState("");
  const [notificationOn, setNotificationOn] = useState(false);
  const [notificationColor, setNotificationColor] = useState(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [seatsNumber, setSeatsNumber] = useState("");
  const [tablesNumber, setTablesNumber] = useState(0);
  const [tablesToSelect, setTablesToSelect] = useState(0);
  const [Table1, setTable1] = useState({ selected: false, reserved: false });
  const [Table2, setTable2] = useState({ selected: false, reserved: false });
  const [Table3, setTable3] = useState({ selected: false, reserved: false });
  const [Table4, setTable4] = useState({ selected: false, reserved: false });
  const [Table5, setTable5] = useState({ selected: false, reserved: false });
  const [Table6, setTable6] = useState({ selected: false, reserved: false });
  const [Table7, setTable7] = useState({ selected: false, reserved: false });
  const [Table8, setTable8] = useState({ selected: false, reserved: false });
  const [Table9, setTable9] = useState({ selected: false, reserved: false });
  const [Bookings, setBookings] = useState([]);
  const [issuer, setIssuer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const res = await fetch("/api/userDetails");
    const data = await res.json();

    setIssuer(data?.userDetails?.data?.users[0].issuer);
  }, []);

  const showNotification = (content, color) => {
    if (color === 0) setNotificationColor(false);
    else setNotificationColor(true);
    setNotification(content);
    setNotificationOn(true);
    setTimeout(() => {
      setNotificationOn(false);
    }, 10000);
  };

  const sendReservation = async () => {
    if (
      month === "" ||
      day === "" ||
      year === "" ||
      month === "Month" ||
      day === "Day" ||
      year === "Year"
    )
      return showNotification(
        "You will have to select a date for your reservation in order to select a table.",
        0
      );
    if (tablesNumber === 0)
      return showNotification(
        "You will have to complete the reservation form and select at least a table in order to complete the reservation.",
        0
      );
    if (Bookings.length === 0)
      return showNotification(
        "You will have to select the table(s) in order to complete your reservation.",
        0
      );
    if (Bookings.length !== tablesToSelect)
      return showNotification(
        "You should select as many tables as you chose in order to complete your order.",
        0
      );

    const today = new Date();
    let luni = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = `${luni[today.getMonth()]}-${
      days[today.getDate()]
    }-${today.getFullYear()}`;

    const dateString = `${month}-${day}-${year}`;
    const res = await fetch("/api/addTablesToBooking", {
      method: "POST",
      headers: {
        body: JSON.stringify({
          tables: Bookings,
          issuer: issuer,
          seats: seatsNumber,
          date: dateString,
          currentDate: date,
        }),
      },
    });
    const data = await res.json();
    console.log(data);
    let d = new Date();
    let currentMonth = d.getMonth();
    let currentDay = d.getDate();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setTable1((prevState) => ({ ...prevState, selected: false }));
    setTable2((prevState) => ({ ...prevState, selected: false }));
    setTable3((prevState) => ({ ...prevState, selected: false }));
    setTable4((prevState) => ({ ...prevState, selected: false }));
    setTable5((prevState) => ({ ...prevState, selected: false }));
    setTable6((prevState) => ({ ...prevState, selected: false }));
    setTable7((prevState) => ({ ...prevState, selected: false }));
    setTable8((prevState) => ({ ...prevState, selected: false }));
    setTable9((prevState) => ({ ...prevState, selected: false }));
    setBookings([]);
    setSeatsNumber("");
    setTimeout(() => {
      setYear(year);
    }, 100);
    setYear("year");
  };

  useEffect(() => {
    if (seatsNumber < 0)
      return showNotification(
        "Try to add a number of tables that is greater than 0.",
        0
      );
    if (seatsNumber > 36)
      return showNotification(
        `We're very sorry! This number of seats exceeds the limit of tables in our restaurant.`,
        0
      );

    setTablesNumber(Math.round(seatsNumber / 4));
    setTablesToSelect(Math.round(seatsNumber / 4));
  }, [seatsNumber]);

  useEffect(async () => {
    if (
      month !== "" &&
      day !== "" &&
      year !== "" &&
      month !== "Month" &&
      day !== "Day" &&
      year !== "Year"
    ) {
      setIsLoading(true);
      const dateString = `${month}-${day}-${year}`;
      const res = await fetch("/api/checkTablesForBooking", {
        method: "GET",
        headers: {
          body: JSON.stringify({
            date: dateString,
          }),
        },
      });

      const data = await res.json();
      console.log("data", data);
      const tables = data?.check?.data?.booking.length;
      console.log("tables", tables);
      if (tables === 0) {
        setTable1((prevState) => ({ ...prevState, reserved: false }));
        setTable2((prevState) => ({ ...prevState, reserved: false }));
        setTable3((prevState) => ({ ...prevState, reserved: false }));
        setTable4((prevState) => ({ ...prevState, reserved: false }));
        setTable5((prevState) => ({ ...prevState, reserved: false }));
        setTable6((prevState) => ({ ...prevState, reserved: false }));
        setTable7((prevState) => ({ ...prevState, reserved: false }));
        setTable8((prevState) => ({ ...prevState, reserved: false }));
        setTable9((prevState) => ({ ...prevState, reserved: false }));
      } else {
        const seats = data?.check?.data?.booking[0].bookingTables.split("|");
        if (seats[0] === "1")
          setTable1((prevState) => ({ ...prevState, reserved: true }));
        else setTable1((prevState) => ({ ...prevState, reserved: false }));
        if (seats[1] === "1")
          setTable2((prevState) => ({ ...prevState, reserved: true }));
        else setTable2((prevState) => ({ ...prevState, reserved: false }));
        if (seats[2] === "1")
          setTable3((prevState) => ({ ...prevState, reserved: true }));
        else setTable3((prevState) => ({ ...prevState, reserved: false }));
        if (seats[3] === "1")
          setTable4((prevState) => ({ ...prevState, reserved: true }));
        else setTable4((prevState) => ({ ...prevState, reserved: false }));
        if (seats[4] === "1")
          setTable5((prevState) => ({ ...prevState, reserved: true }));
        else setTable5((prevState) => ({ ...prevState, reserved: false }));
        if (seats[5] === "1")
          setTable6((prevState) => ({ ...prevState, reserved: true }));
        else setTable6((prevState) => ({ ...prevState, reserved: false }));
        if (seats[6] === "1")
          setTable7((prevState) => ({ ...prevState, reserved: true }));
        else setTable7((prevState) => ({ ...prevState, reserved: false }));
        if (seats[7] === "1")
          setTable8((prevState) => ({ ...prevState, reserved: true }));
        else setTable8((prevState) => ({ ...prevState, reserved: false }));
        if (seats[8] === "1")
          setTable9((prevState) => ({ ...prevState, reserved: true }));
        else setTable9((prevState) => ({ ...prevState, reserved: false }));
      }
      setIsLoading(false);
    }
  }, [month, day, year]);

  function tableButton(e) {
    if (tablesNumber === 0)
      return showNotification(
        "You will have to complete the reservation form and select at least a table in order to complete the reservation.",
        0
      );
    if (
      month === "" ||
      day === "" ||
      year === "" ||
      month === "Month" ||
      day === "Day" ||
      year === "Year"
    )
      return showNotification(
        "You will have to select a date for your reservation in order to select a table.",
        0
      );
    const id = e.target.id;

    switch (+id) {
      case 1: {
        if (!Table1.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable1((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable1((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 2: {
        if (!Table2.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable2((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable2((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 3: {
        if (!Table3.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable3((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable3((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 4: {
        if (!Table4.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable4((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable4((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 5: {
        if (!Table5.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable5((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable5((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 6: {
        if (!Table6.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable6((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable6((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 7: {
        if (!Table7.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable7((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable7((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 8: {
        if (!Table8.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable8((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable8((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      case 9: {
        if (!Table9.selected) {
          if (Bookings.length > tablesToSelect - 1)
            return showNotification(
              "You cannot select any more tables since you already chose the number of seats.",
              0
            );
          addBookingTable(id);
          setTable9((prevState) => ({ ...prevState, selected: true }));
        } else {
          removeBookingTable(id);
          setTable9((prevState) => ({ ...prevState, selected: false }));
        }
        break;
      }
      default: {
        console.log("Something didnt work well", id);
        break;
      }
    }
  }

  const addBookingTable = (id) => {
    if (tablesNumber === 0) {
      showNotification(
        "You will have to complete the reservation form in order to select a table.",
        0
      );
      setTable1((prevState) => ({ ...prevState, selected: false }));
      setTable2((prevState) => ({ ...prevState, selected: false }));
      setTable3((prevState) => ({ ...prevState, selected: false }));
      setTable4((prevState) => ({ ...prevState, selected: false }));
      setTable5((prevState) => ({ ...prevState, selected: false }));
      setTable6((prevState) => ({ ...prevState, selected: false }));
      setTable7((prevState) => ({ ...prevState, selected: false }));
      setTable8((prevState) => ({ ...prevState, selected: false }));
      setTable9((prevState) => ({ ...prevState, selected: false }));
      return;
    }
    setBookings((oldArray) => [...oldArray, id]);
  };

  const removeBookingTable = (id) => {
    const index = Bookings.indexOf(id);
    Bookings.splice(index, 1);
  };
  return (
    <div className={styles.imageBG}>
      <div className={styles.container}>
        <Head>
          <title>Good Food - Booking</title>
        </Head>
        <Header />
        <div
          className={styles.mgn}
          style={{
            left: notificationOn ? "2%" : "-50%",
            background: notificationColor ? "#6ec25d" : "#c25d5d",
          }}
        >
          <div className={styles.mgnContent}>
            <h3 style={{ background: "transparent" }}>{notification}</h3>
          </div>
        </div>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <div className={styles.bookingScheme}>
            <div className={styles.bookPlace}>
              <div
                className={
                  Table1.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table1.reserved ? seatReserved : {}}
                id="1"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>1</h1>
              </div>
              <div
                className={
                  Table2.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table2.reserved ? seatReserved : {}}
                id="2"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>2</h1>
              </div>
              <div
                className={
                  Table3.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table3.reserved ? seatReserved : {}}
                id="3"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>3</h1>
              </div>
              <div
                className={
                  Table4.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table4.reserved ? seatReserved : {}}
                id="4"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>4</h1>
              </div>
              <div
                className={
                  Table5.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table5.reserved ? seatReserved : {}}
                id="5"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>5</h1>
              </div>
              <div
                className={
                  Table6.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table6.reserved ? seatReserved : {}}
                id="6"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>6</h1>
              </div>
              <div
                className={
                  Table7.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table7.reserved ? seatReserved : {}}
                id="7"
                onClick={tableButton}
              >
                <h1 className={styles.selectTableText}>7</h1>
              </div>
              <div
                className={
                  Table8.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table8.reserved ? seatReserved : {}}
                id="8"
                onClick={tableButton}
              >
                <h1 className={cls(styles.selectTableText, styles.rotateZ)}>
                  8
                </h1>
              </div>
              <div
                className={
                  Table9.selected
                    ? cls(styles.selectTable, styles.tableSelected)
                    : styles.selectTable
                }
                style={Table9.reserved ? seatReserved : {}}
                id="9"
                onClick={tableButton}
              >
                <h1 className={cls(styles.selectTableText, styles.rotateZ)}>
                  9
                </h1>
              </div>
            </div>
            <div className={styles.historyc}>
              <div className={styles.seatText}>
                <div className={styles.taken}></div>
                <h3>Taken</h3>
              </div>
              <div className={styles.seatText}>
                <div className={styles.available}></div>
                <h3>Available</h3>
              </div>
              <div className={styles.seatText}>
                <div className={styles.selected}></div>
                <h3>Selected</h3>
              </div>
            </div>
          </div>
        )}
        <div className={styles.bookingForm}>
          <div className={styles.bookingInputForm}>
            <div className={styles.displayFlex}>
              <h3 className={styles.text}>Reservation date</h3>
              <div className={styles.dateReservation}>
                <select
                  className={styles.monthBooking}
                  name="month"
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((month, i) => {
                    return (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    );
                  })}
                </select>
                <select
                  className={styles.dayBooking}
                  name="day"
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  {days.map((day, i) => {
                    return (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    );
                  })}
                </select>
                <select
                  className={styles.yearBooking}
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((year, i) => {
                    return (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.bookingInputForm}>
                <h3>Number of seats</h3>
                <input
                  type="text"
                  maxLength="2"
                  className={styles.bookingInput}
                  value={seatsNumber}
                  onChange={(e) => setSeatsNumber(e.target.value)}
                />
              </div>
              <div className={styles.bookingInputForm}>
                <h3>Number of tables</h3>
                <input
                  type="text"
                  maxLength="2"
                  style={{
                    pointerEvents: "none",
                  }}
                  readOnly
                  value={tablesNumber}
                  className={styles.bookingInput}
                />
              </div>
              <div className={styles.bookingInputForm}>
                <h3>
                  {tablesToSelect > 1 ? "Selected tables" : "Selected table"}
                </h3>
                <input
                  type="text"
                  maxLength="2"
                  style={{
                    pointerEvents: "none",
                  }}
                  readOnly
                  value={Bookings}
                  className={styles.bookingInput}
                />
              </div>
              <motion.button
                className={styles.bookingOrder}
                onClick={sendReservation}
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                {/* <Loading /> */}
                ORDER
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <Navbar showNav={false} showOpen={true} />
    </div>
  );
};

export default Booking;
