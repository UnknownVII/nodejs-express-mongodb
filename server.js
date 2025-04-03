import express, { json, urlencoded } from "express";
const app = express();
import { config } from "dotenv";
import cors from "cors";
import verify from "./app/verify-token.js";
import connectDB from "./app/config/db.config.js";
import logEndpoints from "./utils/print-endpoints.js";
import isRunningLocally from "./utils/check-local-server.js";

//API CACHE
// const apicache = require('apicache');
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));

const port = process.env.PORT || 8080;

//Import Routes
import objectsRoute from "./src/routes/objects.js";

config();

async function isRunningAt() {
  await isRunningLocally();
  console.log(
    `[\x1b[35mSERVER\x1b[0m  ] ${
      global.isLocal
        ? `Server is running locally: \x1b[32m\x1b[4m${process.env.LOCAL_URL}\x1b[0m`
        : `Server is running at your cloud service: \x1b[32m\x1b[4m${process.env.CLOUD_URL}\x1b[0m`
    }`
  );
}
app.listen(port, async () => {
  console.log(
    `[\x1b[35mPORT\x1b[0m    ] Server is Listening to [ \x1b[33m${port}\x1b[0m ]`
  );
  logEndpoints(app);
  isRunningAt();
});

//Connect to DB
connectDB();

//Middlewares
app.use(cors());

//content-type - application/json
app.use(json());

//Content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// simple route
app.get("/", verify, (req, res) => {
  res.json({ message: "HELLO WORLDOOO" });
});

//Route Middleware
app.use("/test", objectsRoute);
