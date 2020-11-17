const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.set("port", 3000);

app.listen(app.get("port"), () => {
  console.log(`[OK] Server is running on localhost:${app.get("port")}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use("/api/repositories", require("./controller/repositories"));

app.use("/", express.static(path.join(__dirname, "../dist")));
