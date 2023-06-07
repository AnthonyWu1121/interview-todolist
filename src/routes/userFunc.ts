import { Request, Response, NextFunction } from "express";
import User from '../db/model/user';

const addNewUser = async (req : Request, res : Response) => {
    try {
        const { name } = req.body;
        const newUser = await User.create({
            name: name
        });
        console.log("new user added", newUser.name);
        res.status(200).send("new user added");
    } catch (e) {
        console.log("add new user err", e);
        res.send("add new user err");
    }
};

const removeUser = async (req : Request, res : Response) => {
    try {
        const { name } = req.body;
        await User.destroy({
            where: {
                name: name
            }
        });
        console.log("user removed");
        res.status(200).send("user removed");
    } catch (e) {
        console.log("user remove err", e);
        res.send("user remove err");
    }
};

export {
    addNewUser,
    removeUser
};