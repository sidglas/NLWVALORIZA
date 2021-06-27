import {Request, Response, NextFunction} from "express"
import { verify } from  "jsonwebtoken"

interface IPayload {
  sub: string;
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
  
  const authToken  = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end()
  }
  const [_, token] = authToken.split(" ")
  
  
  try {
    const { sub } = verify (token, "2c400209672b10fc2b6d992a8b323965") as IPayload;
    request.user_id = sub;

    return next()
  } catch (err) {
    return response.status(401).end()
  }
  
  
  /*
  return  verify (token, "2c400209672b10fc2b6d992a8b323965")
    ? next() 
    : response.status(401).end()
  */
  
}
