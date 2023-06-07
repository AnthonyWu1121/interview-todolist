import express, { Router } from "express";
import { addNewUser, removeUser } from "./userFunc";
import { addNewTask, editTaskTitle, getAllTask, removeTask } from "./taskFunc";
import { getAllLogs } from "./logFunc";

const router : Router = express.Router();

router.post("/user/addnew", addNewUser);
router.delete("/user/remove", removeUser);

router.post("/task/addnew", addNewTask);
router.delete("/task/remove", removeTask);
router.get("/task/all", getAllTask);
router.put("/task/editTitle", editTaskTitle);

router.get("/log/all", getAllLogs);

export default router;