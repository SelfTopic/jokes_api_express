import { Joke } from './../models/joke';
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite"

export class JokeService {

    db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

    constructor (database: Database<sqlite3.Database, sqlite3.Statement>) {
        this.db = database;
        this.setupDatabase();
    }


    private async setupDatabase() {
        if (! this.db) 
            throw new Error("Database is not initialize");

        const sqlString = `
        CREATE TABLE IF NOT EXISTS jokes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT
        );
        `
        await this.db.run(sqlString);
    }

    public async getRundomJoke() {
        if (! this.db) 
            throw new Error("Database is not initialize");

        const result = await this.db.get<Joke>(`SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`)

        if (!result)
            return null;

        const joke: Joke = {
            id: result.id,
            content: result.content
        }

        return joke;

    }
}