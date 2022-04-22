import {
  addReservation,
  modifyReservation,
  checkReservation,
} from "../../lib/db/hasura";

export default async function BookTables(req, res) {
  if (req.method === "POST") {
    try {
      const token = req ? req.cookies?.token : null;
      const tables = req ? JSON.parse(req.headers.body).tables : null;
      const issuer = req ? JSON.parse(req.headers.body).issuer : null;
      //   const seats = req ? JSON.parse(req.headers.body).seats : null;
      const date = req ? JSON.parse(req.headers.body).date : null;
      const currentDate = req ? JSON.parse(req.headers.body).currentDate : null;

      const check = await checkReservation(token, date);
      const exist = check?.data?.booking?.length;
      const value = check?.data?.booking[0]?.bookingTables;

      let defaultValue = value;
      const array2 = defaultValue.split("|");
      tables.forEach((i) => {
        array2[i - 1] = 1;
      });

      if (exist === 0) {
        const addBooking = await addReservation(
          token,
          array2.toString().replaceAll(",", "|"),
          issuer,
          date,
          currentDate
        );

        res.send({ message: "Complete", addBooking });
      } else {
        const addBooking = await modifyReservation(
          token,
          date,
          array2.toString().replaceAll(",", "|")
        );

        res.send({ message: "Complete", addBooking });
      }
    } catch (error) {
      console.error("Something went wrong booking the tables", error);
      res.status(500).send({ message: "Incomplete" });
    }
  } else {
    res.send({ message: "Incomplete" });
  }
}
