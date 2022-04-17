import { getLikesQuery, createLikeQuery } from "../../lib/db/hasura";

export default async function getLikes(req, res) {
  if (req.method === "GET") {
    try {
      const token = req ? req.cookies?.token : null;
      const id = req ? JSON.parse(req.headers.body).photoId : null;
      const displayName = req ? JSON.parse(req.headers.body).displayName : null;
      const photoLikes = await getLikesQuery(token, id, displayName);
      const length = photoLikes.data.likes.length;
      if (length === 0) {
        await createLikeQuery(token, id, displayName);
      }

      res.send({ done: true, photoLikes });
    } catch (error) {
      console.error("Something went wrong getting the likes for photo", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
