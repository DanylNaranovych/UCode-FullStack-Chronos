import $api from "../http";

export default class EventService {
  static async getEventCalendar(calendarId) {
    return $api.get(`/events?calendarId=${calendarId}`);
  }

  static async createEvent(calendarId, name, content, start, end, type, color) {
    const eventData = { calendarId, name, content, start, end, type, color };
    return $api.post("/events", eventData);
  }
}
