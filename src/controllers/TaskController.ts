import { Express, NextFunction, Request, Response } from "express";
import { Task } from "../entites/Task";
import { AppDataSource } from "../data-source";
import tokenAuthorization from "../middlewares/token_authorization";
import { IsNull, LessThanOrEqual, Not } from "typeorm";
import { createTaskSchema } from "../helper/validation/task";
import zodErrorHandler from "../middlewares/ZodErrors";
import errorHandler from "../middlewares/errorHandler";

interface Req extends Request {
  currentUser: {
    id: number;
    email: string;
    name: string;
  };
}

export default (app: Express) => {
  const NAMESPACE = "/task";
  const taskRepository = AppDataSource.getRepository(Task);

  app.get(
    NAMESPACE,
    tokenAuthorization,
    async (req: Req, res: Response, next: NextFunction) => {
      try {
        const { date, showDoneTasks } = req.query;

        let filterDate: any = new Date();
        if (date) {
          const teste: any = date;
          filterDate = new Date(teste);
        }

        console.log("filterDate", filterDate);

        let filterObject = {
          user: req.currentUser.id,
          estimateAt: LessThanOrEqual(filterDate),
        };

        if (showDoneTasks) {
          filterObject["doneAt"] =
            showDoneTasks == "true" ? undefined : IsNull();
        }

        const tasks = await taskRepository.find({
          where: filterObject,
          order: {
            estimateAt: "DESC",
          },
        });

        res.status(200).send(tasks);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.post(
    NAMESPACE,
    tokenAuthorization,
    async (req: Req, res: Response, next: NextFunction) => {
      try {
        const { description, estimateAt } = createTaskSchema.parse(req.body);

        const result = await taskRepository.save({
          description,
          user: req.currentUser.id,
          estimateAt,
        });
        res.status(200).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.put(
    NAMESPACE + "/:id", //Update task to done
    tokenAuthorization,
    async (req: Req, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        // const { description } = createTaskSchema.parse(req.body);

        const task = await taskRepository.findOne({
          where: {
            id: Number(id),
          },
        });

        task.doneAt = task.doneAt ? null : new Date();

        const result = await taskRepository.save(task);
        res.status(200).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.delete(
    NAMESPACE + "/:id",
    tokenAuthorization,
    async (req: Req, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        const task = await taskRepository.delete(id);

        // const tasks = await taskRepository.delete({
        //   // where: {
        //   id: Number(id),
        //   user: req.currentUser.id,

        //   // },
        // });

        console.log("taskkk", task);

        res.status(200).send("Deletado com sucesso");
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.use(zodErrorHandler);
  app.use(errorHandler);
};
