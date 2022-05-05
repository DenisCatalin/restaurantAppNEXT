import {
  addReservation,
  modifyReservation,
  checkReservation,
  addToBookingHistory,
} from "../../lib/db/hasura";

export default async function BookTables(req, res) {
  if (req.method === "POST") {
    try {
      const token = req ? req.cookies?.token : null;
      const tables = req ? JSON.parse(req.headers.body).tables : null;
      const issuer = req ? JSON.parse(req.headers.body).issuer : null;
      const seats = req ? JSON.parse(req.headers.body).seats : null;
      const date = req ? JSON.parse(req.headers.body).date : null;
      const currentDate = req ? JSON.parse(req.headers.body).currentDate : null;

      const check = await checkReservation(token, date);

      if (check) {
        const exist = check?.data?.booking?.length;
        const value = check?.data?.booking[0]?.bookingTables;
        if (exist === 0) {
          const defaultValue = "0|0|0|0|0|0|0|0|0";
          const array2 = defaultValue.split("|");
          tables.forEach((i) => {
            array2[i - 1] = 1;
          });
          const addBooking = await addReservation(
            token,
            array2.toString().replaceAll(",", "|"),
            date,
            currentDate
          );

          const addBookingForUser = await addToBookingHistory(
            token,
            issuer,
            seats,
            currentDate,
            date,
            tables.toString()
          );

          res.send({ message: "Complete", addBooking, addBookingForUser });
        } else {
          const defaultValue = value;
          const array2 = defaultValue.split("|");
          tables.forEach((i) => {
            array2[i - 1] = 1;
          });
          const modifyBooking = await modifyReservation(
            token,
            date,
            array2.toString().replaceAll(",", "|")
          );

          const addBookingForUser = await addToBookingHistory(
            token,
            issuer,
            seats,
            currentDate,
            date,
            tables
          );

          res.send({ message: "Complete", modifyBooking, addBookingForUser });
        }
      } else {
        res.status(500).send({ message: "Incomplete", check: check });
      }
    } catch (error) {
      console.error("Something went wrong booking the tables", error);
      res
        .status(500)
        .send({ message: "Incomplete", error: `Eroare: ${error}` });
    }
  } else {
    res.send({ message: "Incomplete", error: `Eroare: ${error}` });
  }
}
