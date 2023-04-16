const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7777;
const router = require('./routes/index')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router)

app.listen(port, _ => console.log("This app listening on port:", port));