import { open } from "sqlite";
import sqlite3 from "sqlite3";


export async function initDatabase() {
    return await open({
        driver: sqlite3.Database,
        filename: "database.db"
    });
};