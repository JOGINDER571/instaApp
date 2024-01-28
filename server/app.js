import express from "express";
import dotENV from "dotenv";
import startServer from "./server.js";
import router from "./routes/rootRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["https://insta-frontend-pi.vercel.app"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

//  Importing dotENV file
dotENV.config({
  path: "./config/config.env",
});

app.get("/", (req, res) => {
  res.send("home page");
});
app.use("/user", router);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

export default app;

startServer();
