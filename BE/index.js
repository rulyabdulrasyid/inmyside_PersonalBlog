require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
