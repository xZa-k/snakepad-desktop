import { DB, SqliteError } from "https://deno.land/x/sqlite@v3.7.2/mod.ts";
import "../../common/@types/types.d.ts";

const db = new DB("users.db");

// Delete table
// db.execute(`
//     DROP TABLE IF EXISTS user
// `);

// Create user table
db.execute(`
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        note_data TEXT
    )
`);




export function createUser(username: string, noteData: NoteData) {
    db.query(`
    INSERT INTO user (username, note_data) VALUES (?, ?)
    `, [username, JSON.stringify(noteData)]);
}

export function getUserByUsername(usernameParam: string): User {
    const [id, username, noteData] = db.prepareQuery<[number, string, string]>(`
    SELECT id, username, note_data FROM user WHERE username LIKE ?
    `).first([usernameParam]) ?? [undefined, undefined, undefined];
    
    if (!id || !username || !noteData) {
        throw new Error("No user found");
    }
    // user
    return {
        id,
        username,
        noteData: JSON.parse(noteData)
    }
}

// console.log(getUserByUsername("Z_akk_"));

// createUser("Z_akk_", {
//     id: "19239123",
//     title: "my title",
//     text: "REALLY LONG TEXT!!!"
// });