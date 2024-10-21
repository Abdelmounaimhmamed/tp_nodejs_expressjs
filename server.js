const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/route');
const dotenv = require("dotenv");
dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json())


app.use('/api/items', itemRoutes);


app.listen(PORT, () => {
  console.log(`Server is running  on port : ${PORT}`);
});
