import Database from 'better-sqlite3';
import { readFile } from "node:fs/promises"

// This is not part of the main app. It's a one-off function which can be run to convert the LA City json data
// into a SQLite db. This database is deployed alongside the main app and is used for adddress data.
// To run, simply execute the file from node, eg: node .\buildAddressDatabase.js

console.log("Creating database");
const db = new Database("addresses.db");

console.log("Reading address file");
const rawData = await readFile("C:\\Temp\\addresses.json", "utf-8");

console.log("Parsing address file");
const rawJson = JSON.parse(rawData);

const unfilteredAddressArrays = rawJson.data;
const filteredColumns = unfilteredAddressArrays.map(innerArray => innerArray.slice(11, 21));

console.log("Creating addresses table if not exists");
// Create a table
db.prepare(`
    CREATE TABLE IF NOT EXISTS addresses (
        HSE_NBR TEXT,
        HSE_FRAC_NBR TEXT,
        HSE_DIR_CD TEXT,
        STR_NM TEXT,
        STR_SFX_CD TEXT,
        STR_SFX_DIR_CD TEXT,
        UNIT_RANGE TEXT,
        ZIP_CD TEXT NOT NULL,
        LAT TEXT, 
        LON TEXT
    )
`).run();

console.log("Creating addressesAutocomplete view if not exists");
db.prepare(`
    CREATE VIEW IF NOT EXISTS addressesAutocomplete AS 
        SELECT
        * ,
        COALESCE(HSE_NBR || ' ','') ||
        COALESCE(HSE_FRAC_NBR || ' ','') ||
        COALESCE(HSE_DIR_CD || ' ','') ||
        COALESCE(STR_NM || ' ','') ||
        COALESCE(STR_SFX_CD || ' ','') ||
        COALESCE(STR_SFX_DIR_CD || ' ','') ||
        COALESCE(UNIT_RANGE || ' ','') ||
        ZIP_CD AS FullAddress
        FROM addresses
`).run()

console.log("Clearing existing addresses");
db.prepare('DELETE FROM addresses').run();

console.log("Inserting addresses");
const insert = db.prepare(`
    INSERT INTO addresses 
    (HSE_NBR, HSE_FRAC_NBR, HSE_DIR_CD, STR_NM, STR_SFX_CD, STR_SFX_DIR_CD, UNIT_RANGE, ZIP_CD, LAT, LON) 
    VALUES (
    ?,?,?,?,?,?,?,?,?,?
    )`);

const insertMany = db.transaction((addresses) => {
    for (const address of addresses) {
        insert.run(...address)
    }
})

insertMany(filteredColumns)
