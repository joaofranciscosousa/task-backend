import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Req extends Request {
  currentUser: {
    id: number;
    email: string;
    name: string;
  };
}

async function tokenAuthorization(req: Req, res: Response, next: NextFunction) {
  const token = req?.headers?.authorization ?? null;

  // verify has token
  if (!token) {
    return res.status(401).send("Não autorizado");
    // return returnServerError({
    //   res,
    //   error: { message: 'Acesso negado!' },
    //   status: 401,
    // });
  }

  try {
    // string | jwt.JwtPayload
    const validToken: any = jwt.verify(token, process.env.AUTH_SECRET);

    req.currentUser = validToken;

    next();
  } catch (err) {
    console.log("errrr", err);
    return res.status(401).send("Não autorizado");
  }
}

export default tokenAuthorization;
