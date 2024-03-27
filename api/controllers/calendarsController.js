import Calendar from "../models/Calendar.js";
import TokenService from "../utils/tokenService.js";

export default class calendarsController {
  static async getAllUserCalendars(req, res) {
    try {
      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarTable = new Calendar();
      const rows = await calendarTable.getAllUserCalendars(userId);

      res.status(200).json({
        calendarsArray: rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  static async getCalendar(req, res) {
    try {
      const { calendarId } = req.params;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      const calendar = await calendarsTable.read(calendarId);

      res.status(200).json({
        msg: "Success",
        calendar: calendar,
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async createUserCalendar(req, res) {
    try {
      const { name, description } = req.body;
      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarTable = new Calendar();
      const calendarId = await calendarTable.create(name, description);

      await calendarTable.saveUserCalendar(userId, calendarId, "admin");
      res.status(200).json({
        msg: "Success",
        calendarId: calendarId,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  static async deleteCalendar(req, res) {
    try {
      const { calendarId } = req.params;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      await calendarsTable.delete(calendarId);

      res.status(200).json({ msg: "Success" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  static async addUserToCalendar(req, res) {
    try {
      const { calendarId } = req.params;

      const { guestId, role } = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      await calendarsTable.saveUserCalendar(guestId, calendarId, role);

      res.status(200).json({ msg: "Success" });
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteUserFromCalendar(req, res) {
    try {
      const { calendarId } = req.params;
      const { guestId } = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();

      if (
        guestId !== userId &&
        !(await calendarsTable.checkPermission(calendarId, userId))
      ) {
        res.status(403).send("Permission denied");
        return;
      }

      await calendarsTable.deleteUserCalendar(guestId, calendarId);

      res.status(200).json({ msg: "Success" });
    } catch (err) {
      console.error(err);
    }
  }

  static async updateCalendar(req, res) {
    try {
      const { calendarId } = req.params;
      const { newName, newDescription } = req.body;

      const token = req.cookies.token;
      const { userId } = await TokenService.getData(token);

      const calendarsTable = new Calendar();

      if (!(await calendarsTable.checkPermission(calendarId, userId))) {
        res.status(403).send("Permission denied");
        return;
      }

      if (newName) await calendarsTable.update(calendarId, "name", newName);

      if (newDescription)
        await calendarsTable.update(calendarId, "description", newDescription);

      res.status(200).json({ msg: "Success" });
    } catch (err) {
      console.error(err);
    }
  }
}
