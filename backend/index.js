const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const userRoutes = require('./routers/userRoutes.js');

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})