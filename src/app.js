const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const {initializePostgres} = require("./db");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('disi bekend')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.post('/init', async (req, res) => {
  try {
    await initializePostgres()
    return res.status(200).json({})
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
});

require('./api/authApi')(app)