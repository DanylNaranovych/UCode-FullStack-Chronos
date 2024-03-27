import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class Calendar extends Model {
  constructor() {
    super("calendars");
  }

  async create(name, description) {
    const query = `INSERT INTO calendars(name, description) VALUES(?, ?);`;
    const res = await dbService.makeRequest(query, [name, description]);

    return res[0].insertId;
  }

  async saveUserCalendar(userId, calendarId, role) {
    const query = `INSERT INTO usercalendars(userId, calendarId, role) VALUES(?, ?, ?);`;
    const res = await dbService.makeRequest(query, [userId, calendarId, role]);

    return res[0].insertId;
  }

  async deleteUserCalendar(userId, calendarId) {
    const query = `DELETE FROM usercalendars WHERE userId = ? AND  calendarId = ? ; `;
    await dbService.makeRequest(query, [userId, calendarId]);
  }

  async read(id) {
    const data = await super.read(id);
    return data[0][0];
  }

  async checkPermission(calendarId, userId) {
    const query = `SELECT role FROM usercalendars WHERE userId = ? AND calendarId = ?; `;
    const rows = await dbService.makeRequest(query, [userId, calendarId]);
    if (!rows[0][0]) return false;
    return rows[0][0].role;
  }

  async getAllUserCalendars(userId) {
    const query = `SELECT * FROM calendars 
                            INNER JOIN userCalendars ON calendars.id = userCalendars.calendarId
                            WHERE usercalendars.userId = ?`;
    return await dbService.makeRequest(query, [userId]);
  }
}
