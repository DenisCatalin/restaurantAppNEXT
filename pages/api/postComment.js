import { postComments } from "../../lib/db/hasura";

export default async function postCommentToPhoto(req, res) {
  if (req.method === "POST") {
    try {
      const token = req ? req.cookies?.token : null;
      const id = req ? JSON.parse(req.headers.body).photoId : null;
      const displayName = req ? JSON.parse(req.headers.body).displayName : null;
      const profilePic = req ? JSON.parse(req.headers.body).profilePic : null;
      const comment = req ? JSON.parse(req.headers.body).comment : null;
      const photoComments = await postComments(
        token,
        comment,
        displayName,
        profilePic,
        id
      );

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
