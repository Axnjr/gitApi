const express = require("express");
const { router } = require("./api/gitApi")
const path = require("path");
const PORT = process.env.PORT || 16108;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/data/dede/:userName/:repoName" , router );
app.listen(PORT, () => {console.log("done", __dirname)});