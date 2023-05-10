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

// API path for getting a user
app.get("/api/getUserByName/:username", (req: express.Request, res: express.Response) => {
  // Tries to get user or returns an error
  try {
    let user = getUserByUsername(req.params.username);
    res.send(user);
  } catch (e) {
    res.send("Username not found");
  }
});

// API path for updating user
app.post("/api/updateUserByName/:username", express.json(), (req: express.Request, res: express.Response) => {
  updateUser(req.params.username, req.body);
  console.log("updating user");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
