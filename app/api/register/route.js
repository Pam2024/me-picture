import bcrypt from 'bcrypt';
// Load environment variables
require('dotenv').config();

const mysql = require('mysql2');

// Set up MySQL connection pool using environment variables
const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
db.getConnection((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database!');
  }
});

// Export the database pool
module.exports = db;

export async function POST(request) {
  const { email, password } = await request.json();

  return new Promise((resolve, reject) => {
    // Check if the email already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          reject(new Response("Database error", { status: 500 }));
          return;
        }

        if (results.length > 0) {
          // Email already exists
          resolve(new Response("Email already exists", { status: 400 }));
        } else {
          // Hash the password before storing it
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              reject(new Response("Error hashing password", { status: 500 }));
              return;
            }

            // Insert new user with hashed password
            db.query(
              "INSERT INTO users (email, password) VALUES (?, ?)",
              [email, hashedPassword],
              (err) => {
                if (err) {
                  reject(new Response("Database error", { status: 500 }));
                  return;
                }
                resolve(new Response("User registered successfully", { status: 200 }));
              }
            );
          });
        }
      }
    );
  });
}
