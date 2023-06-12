const app = require("express");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const PORT = 4000;

app.use(express.json());
app.use / morgan("dev");
app.use(
  express.static(
    path.join(__dirname, "..", "..", "fronEnd", "build", "index.html")
  )
);
app.listen(PORT, () => console.log(`server on port ${PORT}`));
