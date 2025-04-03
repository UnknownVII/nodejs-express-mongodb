import pkg from "mongoose";
const { connect, connection, set } = pkg;
import { config } from "dotenv";

export default () => {
  config();
  const uri = process.env.DB_URI || "";
  const dbName = process.env.DB_NAME || "";
  const userName = process.env.DB_USER || "";
  const password = process.env.DB_PASSWORD || "";

  set("strictQuery", true);
  connectToDb(uri, dbName, userName, password);

  connection.on("connected", () => {
    console.log(
      `[\x1b[36mDatabase\x1b[0m] Mongoose connected to DB Cluster [ \x1b[2m${dbName}\x1b[0m ]`
    );
  });

  connection.on("error", (error) => {
    console.error(
      `[\x1b[41m\x1b[30mError\x1b[0m   ] ON_DETECT ${error.message}`
    );
    setTimeout(() => {
      console.log(
        `[\x1b[36mDatabase\x1b[0m] Retrying connection [ \x1b[2m${dbName}\x1b[0m ]`
      );
      connectToDb(uri, dbName, userName, password);
    }, 5000);
  });

  connection.on("disconnected", () => {
    console.log(`[\x1b[43m\x1b[31mWarning\x1b[0m ] Mongoose Disconnected`);
  });
  process.on("SIGINT", () => {
    connection.close(() => {
      console.log(
        `[\x1b[43m\x1b[31mWarning\x1b[0m ] Mongoose connection closed on Application Timeout`
      );
      process.exit(0);
    });
  });
};

function connectToDb(uri, dbName, userName, password) {
  connect(uri, {
    user: userName,
    pass: password,
    appName: dbName,
    retryWrites: true,
    writeConcern: "majority",
  })
    .then(() => {
      console.log(
        `[\x1b[36mDatabase\x1b[0m] Connection established with MongoDB Successfully`
      );
    })
    .catch((error) =>
      console.error(
        `[\x1b[41m\x1b[30mError\x1b[0m   ] ON_INIT ${error.message}`
      )
    );
}
