import { changeNewProfilePicQuery } from "../../lib/db/hasura";

export default async function changeDisplayName(req, res) {
  if (req.method === "POST") {
    try {
      const token = req ? req.cookies?.token : null;
      const displayName = req ? JSON.parse(req.headers.body).displayName : null;
      const profilePic = req ? JSON.parse(req.headers.body).profilePic : null;
      const email = req ? JSON.parse(req.headers.body).email : null;
      const newProfilePic = req
        ? JSON.parse(req.headers.body).newProfilePic
        : null;
      const changes = await changeNewProfilePicQuery(
        token,
        newProfilePic,
        displayName,
        profilePic,
        email
      );

      res.send({ done: true, changes });
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
