import { checkBookingHistory } from "../../lib/db/hasura";

export default async function checkReservations(req, res) {
  if (req.method === "GET") {
    try {
      const token = req ? req.cookies?.token : null;
      const issuer = req ? JSON.parse(req.headers.body).issuer : null;

      const checkBookingForUser = await checkBookingHistory(token, issuer);

      res.send({ message: "Complete", checkBookingForUser });
    } catch (error) {
      console.error("Something went wrong booking the tables", error);
      res.status(500).send({ message: "Incomplete" });
    }
  } else {
    res.send({ message: "Incomplete" });
  }
}
