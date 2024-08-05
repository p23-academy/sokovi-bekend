const {registerUser, loginUser, verifyToken} = require("./authRepo");

module.exports = function (app) {
  app.post('/api/v1/register', async (req, res) => {
    try {
      const {email, password} = req.body
      const response = await registerUser(email, password)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })

  app.post('/api/v1/login', async (req, res) => {
    try {
      const {email, password} = req.body
      const response = await loginUser(email, password)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })

  app.post('/api/v1/verify', async (req, res) => {
    try {
      const {token} = req.body
      const response = await verifyToken(token)
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  })
}