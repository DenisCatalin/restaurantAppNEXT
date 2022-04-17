import { modifyLikeQuery } from "../../lib/db/hasura";

export default async function getLikes(req, res) {
  if (req.method === "POST") {
    try {
      const token = req ? req.cookies?.token : null;
      const id = req ? JSON.parse(req.headers.body).photoId : null;
      const displayName = req ? JSON.parse(req.headers.body).displayName : null;
      const like = req ? JSON.parse(req.headers.body).like : null;
      const modifiedLike = await modifyLikeQuery(token, id, displayName, like);

      res.send({ done: true, modifiedLike });
    } catch (error) {
      console.error("Something went wrong getting the likes for photo", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
