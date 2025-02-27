const express = require('express');
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require('dotenv').config();
const path = require("path");
const fs = require("fs");
const http = require("http");
const appConfig = require("./config/appConfig");
const logger = require("./src/libs/loggerLib");
const routeLoggerMiddleware = require("./src/middlewares/routeLogger.js");
const globalErrorMiddleware = require("./src/middlewares/appErrorHandler");
const cors = require('cors')

//middlewares
app.use(cors())

app.use(express.json())
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));

const modelsPath = "./src/models";
const controllersPath = "./src/controllers";
const libsPath = "./src/libs";
const middlewaresPath = "./src/middlewares";
const routesPath = "./src/routes";


app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf(".js")) require(modelsPath + "/" + file);
});
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf(".js")) {
    let route = require(routesPath + "/" + file);
    route.setRouter(app);
  }
});
// end bootstrap route


// calling global 404 handler after route

app.use(globalErrorMiddleware.globalNotFoundHandler);

// end global 404 handler

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// start listening to http server
console.log(appConfig);
server.listen(appConfig.port);
server.on("error", onError);
server.on("listening", onListening);

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    logger.error(error.code + " not equal listen", "serverOnErrorHandler", 10);
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(
        error.code + ":elavated privileges required",
        "serverOnErrorHandler",
        10
      );
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(
        error.code + ":port is already in use.",
        "serverOnErrorHandler",
        10
      );
      process.exit(1);
      break;
    default:
      logger.error(
        error.code + ":some unknown error occured",
        "serverOnErrorHandler",
        10
      );
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  "Listening on " + bind;
  logger.info(
    `server listening on port: ${addr.port}`,
    `serverOnListeningHandler`,
    10
  );
  let db = mongoose.connect(appConfig.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

/**
 * database connection settings
 */
mongoose.connection.on("error", function (err) {
  console.log("database connection error");
  console.log(err);
  logger.error(err, "mongoose connection on error handler", 10);
  //process.exit(1)
}); // end mongoose connection error

mongoose.connection.on("open", function (err) {
  if (err) {
    console.log("database error");
    console.log(err);
    logger.error(err, "mongoose connection open handler", 10);
  } else {
    console.log("database connection open success");
    logger.info(
      "database connection open",
      "database connection open handler",
      10
    );
  }
  //process.exit(1)
}); // enr mongoose connection open handler



module.exports = server;