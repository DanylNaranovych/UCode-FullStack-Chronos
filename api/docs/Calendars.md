# Calendars Controller Documentation

## Description
This document outlines the functionality and usage of the Calendars Controller in a web application. The Calendars Controller manages operations related to user calendars, including retrieval, creation, deletion, and updates.

## Class: calendarsController

### Methods

#### 1. getAllUserCalendars
- **Description:** Retrieves all calendars associated with the authenticated user.
- **Route:** GET /calendars
- **Response:**
  - Status Code: 200
  - Body:
    ```json
    {
      "calendarsArray": [Array of calendar objects]
    }
    ```

#### 2. getCalendar
- **Description:** Retrieves a specific calendar based on the provided calendar ID.
- **Route:** GET /calendars/:calendarId
- **Response:**
  - Status Code: 200
  - Body:
    ```json
    {
      "msg": "Success",
      "calendar": { Calendar Object }
    }
    ```
- **Error Response:**
  - Status Code: 403
  - Body: "Permission denied"

#### 3. createUserCalendar
- **Description:** Creates a new calendar for the authenticated user.
- **Route:** POST /calendars
- **Request Body:**
  ```json
  {
    "name": "Calendar Name",
    "description": "Calendar Description"
  }
  ```
- **Response:**
    - Status Code: 200
    - Body:
      ```json
      {
        "msg": "Success",
        "calendarId": "Newly created calendar ID"
      }
      ```

#### 4. deleteCalendar
- **Description:** Deletes a specific calendar based on the provided calendar ID.
- **Route:** DELETE /calendars/:calendarId
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

#### 5. addUserToCalendar
- **Description:** Adds a user as a guest to a specific calendar.
- **Route:** POST /calendars/:calendarId/addUser
- **Request Body:**
  ```json
  {
    "guestId": "Guest User ID",
    "role": "Role of the guest (e.g., 'admin', 'viewer')"
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

#### 6. deleteUserFromCalendar
- **Description:** Removes a user from a specific calendar.
- **Route:** DELETE /calendars/:calendarId/deleteUser
- **Request Body:**
  ```json
  {
    "guestId": "Guest User ID to be removed"
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

#### 7. updateCalendar
- **Description:** Updates the name or description of a specific calendar.
- **Route:** PUT /calendars/:calendarId
- **Request Body:**
  ```json
  {
    "newName": "New Calendar Name (optional)",
    "newDescription": "New Calendar Description (optional)"
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
