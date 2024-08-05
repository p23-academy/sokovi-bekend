const {sql} = require("../db");

const getUserByEmail = async (email) => {
  const users = await sql`
    select * from users where email = ${email}
  `
  if (!users.length) {
    throw {
      code: "users/no-user",
    }
  }
  return users[0]
}

module.exports = {getUserByEmail}