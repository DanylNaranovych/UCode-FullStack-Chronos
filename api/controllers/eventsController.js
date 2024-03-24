import Event from "../models/Event.js";
import TokenService from "../utils/tokenService.js";
import Calendar from "../models/Calendar.js";

export default class eventsController {
  static async getAllCalendarEvents(req, res) {
    try {
      const { calendarId } = req.query;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const eventsTable = new Event();

      const calendarsTable = new Calendar();
      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      const rows = await eventsTable.getAllCalendarEvents(calendarId);

      res.status(200).json({
        msg: "Success",
        eventsArray: rows[0],
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async createEvent(req, res) {
    try {
      const { calendarId, name, content, start, end, type, color } = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();
      const eventsTable = new Event();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      const eventId = await eventsTable.create(
        name,
        content,
        start,
        end,
        type,
        color ? color : "#fff"
      );

      await eventsTable.saveCalendarEvent(eventId, calendarId);

      res.status(200).json({
        msg: "Success",
        eventId: eventId,
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async updateEvent(req, res) {
    try {
      const { eventId } = req.params;
      const {
        calendarId,
        newName,
        newContent,
        newStart,
        newEnd,
        newType,
        newColor,
      } = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();
      const eventsTable = new Event();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      if (newName) await eventsTable.update(eventId, "name", newName);

      if (newContent) await eventsTable.update(eventId, "content", newContent);

      if (newStart) await eventsTable.update(eventId, "start", newStart);

      if (newEnd) await eventsTable.update(eventId, "end", newEnd);

      if (newType) await eventsTable.update(eventId, "type", newType);

      if (newColor) await eventsTable.update(eventId, "color", newColor);

      res.status(200).json({ msg: "Success" });
    } catch (err) {
      console.error(err);
    }
  }

  static async getEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { calendarId } = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();
      const eventsTable = new Event();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      const event = await eventsTable.read(eventId);

      res.status(200).json({
        msg: "Success",
        event: event,
      });
    } catch (err) {
      console.error(err);
    }
  }

    static async deleteEvent(req, res) {
        try {
            const {eventId} = req.params;
            const {calendarId} = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();
      const eventsTable = new Event();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      await eventsTable.delete(eventId);
      res.status(200).json({ msg: "Success" });
    } catch (err) {
      console.error(err);
    }
  }
}
