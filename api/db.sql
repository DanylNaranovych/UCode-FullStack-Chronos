CREATE DATABASE IF NOT EXISTS chronos;
CREATE USER IF NOT EXISTS 'dharin'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON chronos.* TO 'dharin'@'localhost';

USE chronos;

CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            login VARCHAR(30) NOT NULL UNIQUE,
                            password VARCHAR(255) NOT NULL,
                            full_name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL UNIQUE,
                            picture VARCHAR(255) NOT NULL DEFAULT '/avatars/default_avatar.png'
);

CREATE TABLE IF NOT EXISTS calendars (
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL,
                            description VARCHAR(255) NULL,
                            createdAt TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS events (
                                      id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                      name VARCHAR(255) NOT NULL,
                                      content TEXT NOT NULL,
                                      start TIMESTAMP(0) NOT NULL,
                                      end TIMESTAMP(0) NOT NULL,
                                      color VARCHAR(255) NULL DEFAULT '#fff',
                                      type ENUM('arrangement', 'reminder', 'task') NOT NULL,
                                      createdAt TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)
);

CREATE TABLE IF NOT EXISTS userCalendars (
                            userId INTEGER NOT NULL,
                            calendarId INTEGER NOT NULL,
                            role ENUM('admin', 'moder', 'guest') NOT NULL,
                            createdAt TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

                            PRIMARY KEY (calendarId, userId),
                            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                            FOREIGN KEY (calendarId) REFERENCES calendars(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS calendarEvents (
                            calendarId INTEGER NOT NULL,
                            eventId INTEGER NOT NULL,
                            role ENUM('admin', 'guest') NOT NULL,

                            PRIMARY KEY (calendarId, eventId),
                            FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
                            FOREIGN KEY (calendarId) REFERENCES calendars(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE calendarevents ADD role ENUM('admin', 'guest') NOT NULL;
