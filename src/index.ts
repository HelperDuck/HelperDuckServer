import Express, {Application, Request, Response} from "express";
// import DotEnv from "dotenv";
// import Cors from "cors";

const app:Application = Express();
const port = process.env.PORT || 3002;

app.get("/", (req:Request, res:Response) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
