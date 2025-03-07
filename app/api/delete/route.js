import { NextResponse } from "next/server";
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

export async function DELETE(req) {
  try {
    const { imageId } = await req.json();

    if (!imageId) {
      return NextResponse.json({ message: "Image ID is required." }, { status: 400 });
    }

    const connection = await mysql2.createConnection(dbConfig);
    await connection.execute("DELETE FROM images WHERE id = ?", [imageId]);
    await connection.end();

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database error", error }, { status: 500 });
  }
}
