import Express from "express";
import DotEnv from "dotenv";
import Cors from "cors";

const app = Express();
const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
