const {sql} = require("./db");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "p23-akademija"

const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const users = await sql`
    insert into users
      (email, password, role)
    values
      (${ email }, ${ hashedPassword }, 'user')
    returning id, email, role
  `
  const user = users[0]
  const token = jwt.sign({id: user.id}, JWT_SECRET)
  return {
    user,
    token
  }
}

module.exports = {registerUser}