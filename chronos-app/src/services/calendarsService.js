import $api from "../http";

export default class CalendarsService {
  static async getAllUserCalendars() {
    return $api.get("calendars/");
  }

  static async createUserCalendar(name, description) {
    return $api.post("calendars/", { name, description });
  }

  static async getCalendarById(calendarId) {
    return $api.get(`calendars/${calendarId}`);
  }

  static async deleteCalendarById(calendarId) {
    return $api.delete(`calendars/${calendarId}`);
  }

  static async updateCalendarById(calendarId, newName, newDescription) {
    return $api.patch(`calendars/${calendarId}`, { newName, newDescription });
  }

  static async addUserToCalendar(calendarId, guestId, role) {
    return $api.post(`calendars/${calendarId}/add`, { guestId, role });
  }

  static async deleteUserFromCalendar(calendarId, guestId) {
    return $api.delete(`calendars/${calendarId}/add`, { guestId });
  }

  static async;
}
