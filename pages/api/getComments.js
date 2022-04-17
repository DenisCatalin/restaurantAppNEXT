import { getCommentsQuery } from "../../lib/db/hasura";

export default async function getComments(req, res) {
  if (req.method === "GET") {
    try {
      const token = req ? req.cookies?.token : null;
      const id = req ? JSON.parse(req.headers.body).photoId : null;
      const photoComments = await getCommentsQuery(token, id);

      res.send({ done: true, photoComments });
    } catch (error) {
      console.error(
        "Something went wrong getting the comments for photo",
        error
      );
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
