import { Express, NextFunction, Request, Response } from "express";
import { User } from "../entites/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import tokenAuthorization from "../middlewares/token_authorization";
import { createUserSchema, loginUserSchema } from "../helper/validation/user";

export default (app: Express) => {
  const NAMESPACE = "/user";
  const userRepository = AppDataSource.getRepository(User);

  app.post(
    NAMESPACE + "/create",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, name, password } = createUserSchema.parse(req.body);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const result = await userRepository.save({
          email,
          name,
          password: hash,
        });

        res.status(200).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.get(
    NAMESPACE,
    tokenAuthorization,
    async (req: any, res: Response, next: NextFunction) => {
      try {
        const users = await userRepository.findOne({
          where: {
            id: req.currentUser.id,
          },
        });
        res.status(200).send(users);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.post(
    NAMESPACE + "/signin",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = loginUserSchema.parse(req.body);

        const users = await userRepository.findOne({
          where: {
            email: email,
          },
        });

        const correct = bcrypt.compareSync(password, users.password);

        if (!correct) {
          return res.status(401).send("Email ou senha não conferem");
        }

        const payload = { id: users.id, email: users.email };

        res.status(200).send({
          token: jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: 1800,
          }),
          name: users.name,
          email: users.email,
        });
      } catch (error: any) {
        next(error);
      }
    }
  );
};
