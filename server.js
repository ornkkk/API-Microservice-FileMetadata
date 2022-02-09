require("dotenv").config();
var express = require("express");
var cors = require("cors");

const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(bodyParser());
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const fileSize = req.file && req.file.size;
  console.log(typeof fileSize); //should return 'number'
  res.json(
    typeof fileSize == "undefined"
      ? { error: "sorry, but there is a file error" }
      : {
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size + " bytes",
        }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
