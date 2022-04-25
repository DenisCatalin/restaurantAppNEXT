import { addOrdersQuery } from "../../lib/db/hasura";

export default async function BookTables(req, res) {
  if (req.method === "POST") {
    try {
      const token = req ? req.cookies?.token : null;
      const cart = req ? JSON.parse(req.headers.body).cart : null;
      const issuer = req ? JSON.parse(req.headers.body).userId : null;
      const paymentId = req ? JSON.parse(req.headers.body).paymentId : null;
      const currentDate = req ? JSON.parse(req.headers.body).currentDate : null;
      const email = req ? JSON.parse(req.headers.body).email : null;
      const price = req ? JSON.parse(req.headers.body).price : null;

      const addOrderForUser = await addOrdersQuery(
        token,
        cart,
        issuer,
        paymentId,
        currentDate,
        email,
        price
      );

      res.send({ message: "Complete", addOrderForUser });
    } catch (error) {
      console.error("Something went wrong adding the order", error);
      res.status(500).send({ message: "Incomplete" });
    }
  } else {
    res.send({ message: "Incomplete" });
  }
}
