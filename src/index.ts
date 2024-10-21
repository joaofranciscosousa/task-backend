import { AppDataSource } from "./data-source";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import controllers from "./controllers/TaskController";
import morganBody from "morgan-body";
import TaskController from "./controllers/TaskController";
import UserController from "./controllers/UserController";
// import zodErrorHandler from "./middlewares/ZodErrors";
// import errorHandler from "./middlewares/errorHandler";

const app = express();

morganBody(app, { immediateReqLog: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

TaskController(app);
UserController(app);

// app.use(zodErrorHandler);
// app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    throw err;
  });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
