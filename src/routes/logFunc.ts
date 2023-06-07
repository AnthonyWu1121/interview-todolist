import { Request, Response, NextFunction } from "express";
import Log from "../db/model/log";

const getAllLogs = async (req : Request, res : Response) => {
    try {
        const allLog = await Log.findAll();
        console.log("getAllLogs");
        res.status(200).send(allLog);
    } catch (e) {
        console.log("getAllLogs err", e);
        res.send("getAllLogs err");
    }
};

export {
    getAllLogs
};