import { Database } from "bun:sqlite";

export type Recipe = {
    id: number;
    nom: string;
}

const db = new Database("data.db", { create: true });

db.run(`
    CREATE TABLE IF NOT EXISTS recipe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL
    )
`);

// Prisma, Drizzle, TypeORM - PostgreSQL
const { count } = db.query("SELECT COUNT(*) as count FROM recipe").get() as {
    count: number;
};

if (count === 0) {
    db.run("INSERT INTO recipe (nom) VALUES (?)", ["Poutine"]);
    db.run("INSERT INTO recipe (nom) VALUES (?)", ["Tourtière"]);
    db.run("INSERT INTO recipe (nom) VALUES (?)", ["Tarte au sucre"]);
}

export default db;