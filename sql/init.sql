DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE UNIQUE INDEX users_email_uindex ON users (email);
CREATE INDEX IF NOT EXISTS users_name ON users (name);

