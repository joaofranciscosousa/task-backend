import returnServerError from "./returnServerError";

const errorHandler = (error, req, res, next) => {
  returnServerError({
    res,
    error,
    status: error.status,
    extraData: error.extraData,
  });
};

export default errorHandler;
