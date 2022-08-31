const express = require('express');
const server = express();
const port = 3000;

server.use(express.json());
server.get('/', (req, res) => {
  return res.send({ hello: `world` })
})

server.listen(port, () => {
  console.log('Server is listening on port 3000');
})