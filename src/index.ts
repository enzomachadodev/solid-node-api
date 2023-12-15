import * as express from "express";
import { Request, Response } from "express";
import Hello from "./hello";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send(new Hello().sayHello());
});

app.listen(3000, () => console.log("Server is running on port: 3000"));
