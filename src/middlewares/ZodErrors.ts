import { ZodError } from "zod";
import { NextFunction, Response, Request } from "express";

const zodErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map(
      (err: { path: string | any[]; message: any }) => {
        return {
          attribute: err.path[0],
          message: err.message,
          path: err.path.length > 1 ? err.path : undefined,
        };
      }
    );

    res.status(422).send(formattedErrors);
  } else {
    next(error);
  }
};

export default zodErrorHandler;
