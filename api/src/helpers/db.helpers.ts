import sqlite3 from "sqlite3";

export const getDb = () => new sqlite3.Database('./db.sqlite', (err) => {
    if (err) throw err;
});