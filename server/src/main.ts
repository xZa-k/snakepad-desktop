import express from "express";
import "./database.ts";
import { getUserByUsername, updateUser } from "./database.ts";
const app = express();
const port = 3000;

app.get("/api", (req: any, res: any) => {
  res.send("Hello World!");
});


app.get("/api/huh", (req: any, res: any) => {
  res.send("Hello wurldsss!");
});


app.get("/api/getUserByName/:username", (req: express.Request, res: express.Response) => {
  try {
    let user = getUserByUsername(req.params.username);
    res.send(user);
  } catch (e) {
    res.send("Username not found");
  }
});

app.post("/api/updateUserByName/:username", express.json(), (req: express.Request, res: express.Response) => {
  updateUser(req.params.username, req.body);
  console.log("updating user");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
