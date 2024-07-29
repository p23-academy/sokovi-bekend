const {registerUser, loginUser} = require("../repos/authRepo");

module.exports = function (app) {
  app.post('/register', async (req, res) => {
    try {
      const {email, password} = req.body
      const response = await registerUser(email, password)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })

  app.post('/login', async (req, res) => {
    try {
      const {email, password} = req.body
      const response = await loginUser(email, password)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })
}