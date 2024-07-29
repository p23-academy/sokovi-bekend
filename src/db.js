// db.js
const postgres = require('postgres')

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
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email varchar(100) NOT NULL UNIQUE,
      password varchar(450) NOT NULL,
      role varchar(20) NOT NULL
    )
   `
}

module.exports = {sql, initializePostgres}