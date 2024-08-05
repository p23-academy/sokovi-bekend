const {sql} = require("../db");

const createCategory = async (name) => {
  let categories = []
  try {
    categories = await sql`
    insert into categories
      (name)
    values
      (${ name })
    returning *
  `
  } catch (error) {
    console.log(error)
    const errorResponse = {
      code: "generic-error"
    }
    switch (error.code) {
      case '23505':
        errorResponse.code = "categories/category-exists"
        break
      case '22001':
        errorResponse.code = "categories/name-too-long"
        break
    }
    throw errorResponse
  }
  return categories
}

const getAllCategories = async () => {
  return sql`
    SELECT id, name FROM categories;
  `;
}

module.exports = {createCategory, getAllCategories}