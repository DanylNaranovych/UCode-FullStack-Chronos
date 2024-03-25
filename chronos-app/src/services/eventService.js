import $api from "../http";

export default class EventService {
  static async createEvent(calendarId, name, content, start, end, type, color) {
    const eventData = { calendarId, name, content, start, end, type, color };
    return $api.post("/events", eventData);
  }

  static async deleteEvent(calendarId, eventId) {
    console.log(calendarId);
    console.log(eventId);
    return $api.delete(`/events/${eventId}/${calendarId}`);
  }

  static async getEventCalendar(calendarId) {
    return $api.get(`/events?calendarId=${calendarId}`);
  }
}
