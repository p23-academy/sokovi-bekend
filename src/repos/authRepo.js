const {sql} = require("../db");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {getUserByEmail} = require("./usersRepo");

const JWT_SECRET = "p23-akademija"

const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  let users = []
  try {
    users = await sql`
    insert into users
      (email, password, role)
    values
      (${ email }, ${ hashedPassword }, 'user')
    returning *
  `
  } catch (error) {
    console.log(error)
    const errorResponse = {
      code: "generic-error"
    }
    switch (error.code) {
      case '23505':
        errorResponse.code = "auth/user-exists"
        break
      case '22001':
        errorResponse.code = "auth/email-too-long"
        break
    }
    throw errorResponse
  }
  const user = users[0]
  delete user.password
  const token = jwt.sign({id: user.id}, JWT_SECRET)
  return {
    user,
    token
  }
}

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email)
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw {
      code: "auth/invalid-password",
    }
  }
  delete user.password
  const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET)
  return {
    user,
    token
  }
}

const verifyToken = async (token) => {
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw {
      code: "auth/invalid-token",
    }
  }
  const email = decodedToken.email
  const user = await getUserByEmail(email)
  return {
    user,
    token
  }
}

module.exports = {registerUser, loginUser, verifyToken}