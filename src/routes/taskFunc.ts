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
        // }, {
        //     include: [{
        //         model: User,
        //         as: 'user'
        //     }]
        });
        // await newTask.setCreator(creator);
        // const dbTask = await Task.findOne({
        //     where: {
        //         title: title,
        //         creator: creator
        //     }
        // });
        // const user = await User.findOne({
        //     where: {
        //         id: creator
        //     }
        // });
        // const taskWtihUser = newTask as Task & { user: User };
        const user = await newTask.getUser();
        const descriptionStr : any = user.name + " added task " + title;
        // const dbTaskId : any = newTask.id;
        const newLog = await Log.create({
            description: descriptionStr,
            // userId: creator,
            // taskId: newTask.id
        });
        await newLog.setUser(creator);
        await newLog.setTask(newTask.id);
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
            // userId: userId,
            // taskId: dbTaskId
        });
        await newLog.setUser(userId);
        await newLog.setTask(dbTaskId);
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
        const { taskId, newTitle, userId } = req.body;
        const dbTask = await Task.findOne({
            where: {
                id: taskId
            }
        })
        await Task.update({
            title: newTitle
        }, {
            where: {
                id: taskId
            }
        });
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const descriptionStr : any = user?.name + " change task title from " + dbTask?.title + " to " + newTitle;
        const newLog = await Log.create({
            description: descriptionStr,
            // userId: userId,
            // taskId: taskId
        });
        await newLog.setUser(userId);
        await newLog.setTask(taskId);
        console.log("Edited task title", descriptionStr);
        res.status(200).send("Edited task title");
    } catch (e) {
        console.log("editTaskTitle err", e);
        res.send("editTaskTitle err");
    }
}

const editTaskDueTime = async (req : Request, res : Response) => {
    try {
        const { taskId, newDueTime, userId } = req.body;
        const dbTask = await Task.findOne({
            where: {
                id: taskId
            }
        });
        await Task.update({
            duetime: newDueTime
        }, {
            where: {
                id: taskId
            }
        });
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const descriptionStr : any = user?.name + " change task " + dbTask?.title + " duetime from " + dbTask?.duetime + " to " + newDueTime;
        const newLog = await Log.create({
            description: descriptionStr,
            // userId: userId,
            // taskId: taskId
        });
        await newLog.setUser(userId);
        await newLog.setTask(taskId);
        console.log("Edited task due time", descriptionStr);
        res.status(200).send("Edited task due time");
    } catch (e) {
        console.log("editTaskDueTime err", e);
        res.send("editTaskDueTime err")
    }
}

const getTaskByCreator = async (req : Request, res : Response) => {
    try {
        const creator : any = req.query.creator;
        const taskCreated = await Task.findAll({
            where: {
                creator: creator
            }
        });
        // console.log("getTaskByCreator", taskCreated);
        res.status(200).send(taskCreated);
    } catch (e) {
        console.log("getTaskByCreator err", e);
        res.send("getTaskByCreator err");
    }
}

const getTaskSortByCreator = async (req : Request, res : Response) => {
    try {
        const sortedTasks = await Task.findAll({
            order: [
                ['creator', 'DESC']
            ]
        });
        console.log("getTaskSortByCreator");
        res.status(200).send(sortedTasks)
    } catch (e) {
        console.log("getTaskSortByCreator err", e);
        res.send("getTaskSortByCreator err");
    }
}

const getTaskSortByCreatedAt = async (req : Request, res : Response) => {
    try {
        const sortedTasks = await Task.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        console.log("getTaskSortByCreatedAt");
        res.status(200).send(sortedTasks)
    } catch (e) {
        console.log("getTaskSortByCreatedAt err", e);
        res.send("getTaskSortByCreatedAt err");
    }
}

export {
    addNewTask,
    removeTask,
    getAllTask,
    getTaskByCreator,
    editTaskTitle,
    editTaskDueTime,
    getTaskSortByCreator,
    getTaskSortByCreatedAt
};