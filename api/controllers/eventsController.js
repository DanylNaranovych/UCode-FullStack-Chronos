import Event from "../models/Event.js";
import TokenService from "../utils/tokenService.js";
import Calendar from "../models/Calendar.js";
import nodemailer from "nodemailer";
import config from "../config.json" assert { type: "json" };
import User from "../models/User.js";

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

      const events = await eventsTable.getAllCalendarEvents(calendarId);

      res.status(200).json({
        msg: "Success",
        eventsArray: events,
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
      const { eventId, calendarId } = req.params;

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

  static async shareEvent(req, res) {
    try {
      const { eventId, email } = req.body;
      const userTable = new User();

      if (!(await userTable.checkExists("email", email))) {
        res.send("User don't exists!");
        return;
      }

      const token = await TokenService.generate({ eventId });

      const transporter = nodemailer.createTransport(config.nodemailer);
      const url = `http://127.0.0.1:3000/api/events/share/${token}`;
      await transporter.sendMail({
        from: "raddzor.101@gmail.com",
        to: email,
        subject: "Invitation on event",
        html: `<a href="${url}">Please click on this text to accept invitation on event.</a>`,
      });

      res.status(200).send();
    } catch (err) {
      console.error(err);
    }
  }

  static async confirmEvent(req, res) {
    try {
      const { token } = req.params;
      const { calendarId } = req.body;

      const data = await TokenService.getData(token);
      if (!data || !data.eventId) {
        res.send("The confirm token is invalid.");
        return;
      }
      const { eventId } = data;

      const eventsTable = new Event();

      await eventsTable.saveCalendarEvent(eventId, calendarId, "guest");

      res.status(200).send();
    } catch (err) {
      console.error(err);
    }
  }

  static async kickUser(req, res) {
    try {
      const { eventId } = req.params;
      const { guestId, calendarId } = req.params;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();
      const eventsTable = new Event();

      if (
        !(await calendarsTable.checkPermission(calendarId, userId)) ||
        !(await eventsTable.checkPermission(calendarId, eventId)) ||
        userId === guestId
      ) {
        res.status(403).send("Permission denied");
        return;
      }

      await eventsTable.removeEventFromCalendar(calendarId, eventId);

      res.status(200).send();
    } catch (err) {
      console.error(err);
    }
  }
}
