import { Request, Response, NextFunction } from "express";
import Task from '../db/model/task';
import Log from "../db/model/log";
import User from "../db/model/user";

const addNewTask = async (req : Request, res : Response) => {
    try {
        const { title, creator } = req.body;
        const newTask = await Task.create({
            title: title,
            creator: creator
        });
        const dbTask = await Task.findOne({
            where: {
                title: title,
                creator: creator
            }
        });
        const user = await User.findOne({
            where: {
                id: creator
            }
        });
        const descriptionStr : any = user?.name + " added task " + title;
        const dbTaskId : any = dbTask?.id;
        const newLog = await Log.create({
            description: descriptionStr,
            taskId: dbTaskId
        });
        console.log("new task added", newLog.description);
        res.status(200).send("new task added");
    } catch (e) {
        console.log("addNewTask err", e);
        res.send("addNewTask err");
    }
};

const removeTask = async (req : Request, res : Response) => {
    try {
        const { taskId, userId } = req.body;
        const dbTask = await Task.findOne({
            where: {
                id: taskId
            }
        });
        await Task.destroy({
            where: {
                id: taskId
            }
        });
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const descriptionStr : any = user?.name + " removed task " + dbTask?.title;
        const dbTaskId : any = dbTask?.id;
        const newLog = await Log.create({
            description: descriptionStr,
            taskId: dbTaskId
        });
        console.log("task removed", newLog.description);
        res.status(200).send("task removed");
    } catch (e) {
        console.log("removeTask err", e);
        res.send("removeTask err");
    }
};

const getAllTask = async (req : Request, res : Response) => {
    try {
        const allTask = await Task.findAll();
        console.log("getAllTask");
        res.status(200).send(allTask);
    } catch (e) {
        console.log("getAllTask err", e);
        res.send("getAllTask err");
    }
}

const editTaskTitle = async (req : Request, res : Response) => {
    try {
        const { id, newTitle } = req.body;
        await Task.update({
            title: newTitle
        }, {
            where: {
                id: id
            }
        })
        console.log("editTaskTitle", newTitle);
        res.status(200).send("editTaskTitle");
    } catch (e) {
        console.log("editTaskTitle err", e);
        res.send("editTaskTitle err");
    }
}

export {
    addNewTask,
    removeTask,
    getAllTask,
    editTaskTitle
};