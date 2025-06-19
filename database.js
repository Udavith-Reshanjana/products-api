var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQlite database.');

        // Create products table
        db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName TEXT, 
            description TEXT,
            category TEXT,
            brand TEXT,
            expiredDate TEXT,
            manufacturedDate TEXT,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate TEXT
        )`, (err) => {
            if (!err) {
                var insert = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)';
                db.run(insert, [
                    "White Basmathi Rice",
                    "White Basmathi Rice imported from Pakistan. High-quality rice with extra fragrance. Organically grown.",
                    "Rice",
                    "CIC",
                    "2023.05.04",
                    "2022.02.20",
                    324567,
                    1020,
                    200,
                    "2022.02.24"
                ]);
            }
        });

        // Create suppliers table
        db.run(`CREATE TABLE suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplierName TEXT, 
            address TEXT,
            joinedDate TEXT,
            mobileNo TEXT
        )`, (err) => {
            if (!err) {
                var insert = 'INSERT INTO suppliers (supplierName, address, joinedDate, mobileNo) VALUES (?,?,?,?)';
                db.run(insert, ["D.J.Ishara", "345A ,R.A De Mel Road, Colombo 3", "16/3/2022", "0776600933"]);
            }
        });

        // ✅ Create customer table (REQUIRED for your assignment)
        db.run(`CREATE TABLE customer (
            customerId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            creditCard TEXT NOT NULL
        )`, (err) => {
            if (!err) {
                console.log("Customer table created.");
                // Insert test row if needed
                // db.run(`INSERT INTO customer (name, email, creditCard) VALUES (?, ?, ?)`, ["UR Student", "test@example.com", "123456789012"]);
            }
        });
    }
});

module.exports = db;
