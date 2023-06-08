import express, { Router } from "express";
import { addNewUser, removeUser } from "./userFunc";
import { addNewTask, editTaskDueTime, editTaskTitle, getAllTask, getTaskByCreator, getTaskSortByCreatedAt, getTaskSortByCreator, removeTask } from "./taskFunc";
import { getAllLogs } from "./logFunc";
import { addNewComment } from "./commentFunc";

const router : Router = express.Router();

router.post("/user/addnew", addNewUser);
router.delete("/user/remove", removeUser);

router.post("/task/addnew", addNewTask);
router.delete("/task/remove", removeTask);
router.get("/task/all", getAllTask);
router.get("/task/byCreator", getTaskByCreator);
router.get("/task/sortbyCreator", getTaskSortByCreator);
router.get("/task/sortbyCreatedAt", getTaskSortByCreatedAt);
router.put("/task/editTitle", editTaskTitle);
router.put("/task/editDueTime", editTaskDueTime);

router.post("/comment/addnew", addNewComment);

router.get("/log/all", getAllLogs);

export default router;