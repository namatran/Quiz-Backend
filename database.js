const Database = require("better-sqlite3");
const db = new Database("database.db"); // Define database filename

db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        answers TEXT NOT NULL,
        answer TEXT NOT NULL
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        answer TEXT,
        choice BOOLEAN,
        question_id INTEGER,
        FOREIGN KEY (question_id) REFERENCES questions(id)
    )
`);

module.exports = db;