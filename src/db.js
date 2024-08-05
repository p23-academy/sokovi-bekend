// db.js
const postgres = require('postgres')
const bcrypt = require('bcryptjs')

const sql = postgres({
  host: 'localhost',            // Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: 'sokovi',            // Name of database to connect to
  username: 'postgres',            // Username of database user
  password: 'postgres',            // Password of database user
})

const initializePostgres = async () => {
  await sql`
    DROP TABLE IF EXISTS users
  `
  await sql`
    DROP TABLE IF EXISTS categories
  `
  await sql`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email varchar(100) NOT NULL UNIQUE,
      password varchar(450) NOT NULL,
      role varchar(20) NOT NULL
    )
   `
  const hashedPassword = await bcrypt.hash("123456", 10)
  await sql`
    insert into users
      (email, password, role)
    values
      ('admin@p23.io', ${ hashedPassword }, 'admin')
    returning *
  `
  await sql`
    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      name varchar(100) NOT NULL UNIQUE
    )
   `
}

module.exports = {sql, initializePostgres}