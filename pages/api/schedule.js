import { getScheduleQueryHasura } from "../../lib/db/hasura";

export default async function getSchedule(req, res) {
  if (req.method === "GET") {
    try {
      const token = req ? req.cookies?.token : null;
      const day = req ? req.cookies?.scheduleDay : null;
      const getScheduleQuery = await getScheduleQueryHasura(token, day);
      console.log(+day);

      res.send({ done: true, getScheduleQuery });
    } catch (error) {
      console.error("Something went wrong getting the schedule", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
