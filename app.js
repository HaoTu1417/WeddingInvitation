// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRoutes from "./server/routes/main.js";
import cors from "cors";
import * as path from "path";
// set up dependencies
const app = express();
const __dirname = path.resolve();
const uri =
  "mongodb+srv://admin:admin@cluster0.csaqeww.mongodb.net/?retryWrites=true&w=majority";
// set up port
const port = 5035;

console.log("__dirname", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors({ maxAge: 84600 }));
// set up mongoose
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

// set up route
app.use("/api/", mainRoutes);
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to Project with Nodejs Express and MongoDB",
//   });
// });
app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});
app.get("/list", (req, res) => {
  res.sendFile("public/list.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
