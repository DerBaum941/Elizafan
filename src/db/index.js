import fs from 'fs';
import sqlite from 'better-sqlite3';
import c from '../logman.cjs';

export const db = sqlite('.sqlite/main.db');

const tables_script = fs.readFileSync('./src/db/tables.sql','utf-8');

export function init() {
    db.exec(tables_script);
    c.inf("Database initialized!");
}