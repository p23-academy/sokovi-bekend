const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('disi bekend')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})