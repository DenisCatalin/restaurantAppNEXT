import { checkOrdersQuery } from "../../lib/db/hasura";

export default async function BookTables(req, res) {
  if (req.method === "GET") {
    try {
      const token = req ? req.cookies?.token : null;
      const issuer = req ? JSON.parse(req.headers.body).userId : null;

      const checkOrderForUser = await checkOrdersQuery(token, issuer);

      res.send({ message: "Complete", checkOrderForUser });
    } catch (error) {
      console.error("Something went wrong adding the order", error);
      res.status(500).send({ message: "Incomplete" });
    }
  } else {
    res.send({ message: "Incomplete" });
  }
}
