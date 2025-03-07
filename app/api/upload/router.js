import mysql from 'mysql2';
import { NextResponse } from 'next/server';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request) {
  const { walletId, url, title, visibility } = await request.json();

  const connection = await mysql.createConnection(dbConfig);

  try {
    // Insert the image into the database with the visibility option
    await connection.execute(
      "INSERT INTO images (wallet_id, url, title, visibility) VALUES (?, ?, ?, ?)",
      [walletId, url, title, visibility]
    );

    await connection.end();
    return NextResponse.json({ message: "Image uploaded successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database error", error }, { status: 500 });
  }
}
