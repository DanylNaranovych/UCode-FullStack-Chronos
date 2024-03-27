import $api from "../http";

export default class EventService {
  static async createEvent(calendarId, name, content, start, end, type, color) {
    const eventData = { calendarId, name, content, start, end, type, color };
    return $api.post("/events", eventData);
  }

  static async deleteEvent(calendarId, eventId) {
    return $api.delete(`/events/${eventId}/${calendarId}`);
  }

  static async getEventCalendar(calendarId) {
    return $api.get(`/events?calendarId=${calendarId}`);
  }

  static async shareEvent(eventId, email) {
    const eventData = { eventId, email };
    return $api.post("/events/share", eventData);
  }

  static async confirmEvent(calendarId, token) {
    const eventData = { calendarId };
    return $api.post(`/events/share/${token}`, eventData);
  }
}
