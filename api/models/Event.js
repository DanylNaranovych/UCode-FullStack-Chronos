import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class Event extends Model {
  constructor() {
    super("events");
  }

  async create(name, content, start, end, type, color = "fff") {
    const query = `INSERT INTO events(name, content, start, end, type, color) VALUES(?, ?, ?, ?, ?, ?);`;
    const res = await dbService.makeRequest(query, [
      name,
      content,
      start,
      end,
      type,
      color,
    ]);

    return res[0].insertId;
  }

    async saveCalendarEvent(eventId, calendarId, role = "admin") {
        const query = `INSERT INTO calendarevents(eventId, calendarId, role) VALUES(?, ?, ?);`;
        const res = await dbService.makeRequest(query, [eventId, calendarId, role]);

        return res[0].insertId;
    }

    async read(id) {
        const data = await super.read(id);
        return data[0][0];
    }

    async checkPermission(calendarId, eventId) {
        const query = `SELECT role FROM calendarevents WHERE calendarId = ? AND eventId = ?; `;
        const rows = await dbService.makeRequest(query, [calendarId, eventId]);

    return rows.length > 0 && rows[0].role === "admin";
  }

  async getAllCalendarEvents(calendarId) {
    const query = `SELECT * FROM events 
                            INNER JOIN calendarEvents ON events.id = calendarevents.eventId
                            WHERE calendarevents.calendarId = ?`;
    const rows = await dbService.makeRequest(query, [calendarId]);
    return rows[0];
  }

    async removeEventFromCalendar(calendarId, eventId) {
        const query = `DELETE FROM calendarevents WHERE calendarId = ? AND eventId = ?; `;
        await dbService.makeRequest(query, [calendarId, eventId]);
    }
}
