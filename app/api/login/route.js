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
    // Check if the email exists in the database
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],  // Use parameterized queries to avoid SQL injection
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            reject(new Response("Database error", { status: 500 }));
            return;
          }
      
          if (results.length === 0) {
            // No user found with this email
            resolve(new Response("No accounts found with this email", { status: 404 }));
          } else {
            // If user found, compare the password
            const user = results[0]; // Since email is unique, there should be one or none
            console.log("User found:", user); 
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.error("Error comparing passwords:", err);
                reject(new Response("Error comparing passwords", { status: 500 }));
                return;
              }
      
              if (isMatch) {
                // Password matches
                resolve(new Response("Login successful", { status: 200 }));
              } else {
                // Incorrect password
                resolve(new Response("Incorrect password", { status: 401 }));
              }
            });
          }
        }
      );      
  });
}
