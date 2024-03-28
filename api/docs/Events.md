# Events Controller Documentation

## Description
This document outlines the functionality and usage of the Events Controller in a web application. The Events Controller manages operations related to calendar events, including retrieval, creation, deletion, updates, sharing, and confirmation.

## Class: eventsController

### Methods

#### 1. getAllCalendarEvents
- **Description:** Retrieves all events associated with a specific calendar.
- **Route:** GET /events
- **Query Parameters:** 
  - calendarId: ID of the calendar to retrieve events from
- **Response:**
  - Status Code: 200
  - Body:
    ```json
    {
      "msg": "Success",
      "eventsArray": [Array of event objects]
    }
    ```
- **Error Response:**
  - Status Code: 403
  - Body: "Permission denied"

#### 2. createEvent
- **Description:** Creates a new event and associates it with a specified calendar.
- **Route:** POST /events
- **Request Body:**
  ```json
  {
    "calendarId": "Calendar ID",
    "name": "Event Name",
    "content": "Event Content",
    "start": "Event Start Time",
    "end": "Event End Time",
    "type": "Event Type",
    "color": "Event Color (optional)"
  }
  ```
- **Response:**
    - Status Code: 200
    - Body:
      ```json
      {
        "msg": "Success",
        "eventId": "Newly created event ID"
      }
      ```
- **Error Response:**
    - Status Code: 403
    - Body: "Permission denied"

#### 3. updateEvent
- **Description:** Updates details of a specific event.
- **Route:** PUT /events/:eventId
- **Request Body:**
  ```json
  {
    "calendarId": "Calendar ID",
    "newName": "New Event Name (optional)",
    "newContent": "New Event Content (optional)",
    "newStart": "New Event Start Time (optional)",
    "newEnd": "New Event End Time (optional)",
    "newType": "New Event Type (optional)",
    "newColor": "New Event Color (optional)"
  }
  ```
- **Response:**
    - Status Code: 200
    - Body:
      ```json
      {
        "msg": "Success"
      }
      ```
- **Error Response:**
    - Status Code: 403
    - Body: "Permission denied"

#### 4. getEvent
- **Description:** Retrieves details of a specific event.
- **Route:** GET /events/:eventId
- **Request Body:**
  ```json
  {
    "calendarId": "Calendar ID"
  }
  ```
- **Response:**
    - Status Code: 200
    - Body:
      ```json
      {
        "msg": "Success",
        "event": { Event Object }
      }
      ```
- **Error Response:**
    - Status Code: 403
    - Body: "Permission denied"

#### 5. deleteEvent
- **Description:** Deletes a specific event.
- **Route:** DELETE /events/:eventId/:calendarId
- **Response:**
    - Status Code: 200
    - Body:
      ```json
      {
        "msg": "Success"
      }
      ```
- **Error Response:**
    - Status Code: 403
    - Body: "Permission denied"

#### 6. shareEvent
- **Description:** Shares an event invitation via email.
- **Route:** POST /events/share
- **Request Body:**
  ```json
  {
    "eventId": "Event ID",
    "email": "Email address of the recipient"
  }
  ```
- **Response:**
    - Status Code: 200
    - Body: Empty
- **Error Response:**
    - Body: "User doesn't exist!" (if the provided email doesn't correspond to an existing user)

#### 7. confirmEvent
- **Description:** Confirms an event invitation.
- **Route:** POST /events/confirm/:token
- **Request Body:**
  ```json
  {
    "calendarId": "Calendar ID"
  }
  ```
- **Response:**
    - Status Code: 200
    - Body: Empty
- **Error Response:**
    - Body: "The confirm token is invalid."

#### 8. kickUser
- **Description:** Removes a user from an event.
- **Route:** DELETE /events/:eventId/kick/:guestId/:calendarId
- **Response:**
    - Status Code: 200
    - Body: Empty
- **Error Response:**
    - Status Code: 403
    - Body: "Permission denied"
