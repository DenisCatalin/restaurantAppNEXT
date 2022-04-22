import { checkReservation } from "../../lib/db/hasura";

export default async function BookTables(req, res) {
  if (req.method === "GET") {
    try {
      const token = req ? req.cookies?.token : null;
      const date = req ? JSON.parse(req.headers.body).date : null;

      const check = await checkReservation(token, date);

      res.send({ message: "Complete", check });
    } catch (error) {
      console.error("Something went wrong booking the tables", error);
      res.status(500).send({ message: "Incomplete" });
    }
  } else {
    res.send({ message: "Incomplete" });
  }
}
