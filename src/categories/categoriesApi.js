const {createCategory, getAllCategories} = require("./categoriesRepo");

module.exports = function (app) {
  app.post('/api/v1/categories', async (req, res) => {
    try {
      const {name} = req.body
      const response = await createCategory(name)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })

  app.get('/api/v1/categories', async (req, res) => {
    try {
      const response = await getAllCategories()
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })
}