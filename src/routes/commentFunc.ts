import { Request, Response, NextFunction } from "express";
import Comment from "../db/model/comment";
import User from "../db/model/user";
import Mention from "../db/model/mention";
import Log from "../db/model/log";
import Task from "../db/model/task";

const addNewComment = async (req : Request, res : Response) => {
    try {
        const { userId, taskId, content } = req.body;
        var numOfMentions : number = 0;
        var startIdx : number = 0;
        var idx : number = content.indexOf('@', startIdx);
        var indices : number [] = [];
        while (idx > -1) {
            indices.push(idx);
            numOfMentions++;
            startIdx = idx + 1;
            idx = content.indexOf('@', startIdx);
        }
        const newComment = await Comment.create({
            // userId: userId,
            // taskId: taskId,
            content: content,
            numOfMentions: numOfMentions
        // }, {
        //     include: [{
        //         model: User,
        //         as: 'user'
        //     }, {
        //         model: Task,
        //         as: 'task'
        //     }]
        });
        await newComment.setUser(userId);
        await newComment.setTask(taskId);
        // const dbComment = await Comment.findOne({
        //     where: {
        //         userId: userId,
        //         content: content,
        //         numOfMentions: numOfMentions
        //     }
        // })
        // const dbTask = await Task.findOne({
        //     where: {
        //         id: taskId
        //     }
        // })
        // const dbUser = await User.findOne({
        //     where: {
        //         id: userId
        //     }
        // })
        // const commentWithUserTask = newComment as Comment & { user: User, task: Task };
        const user = await newComment.getUser();
        const task = await newComment.getTask();
        const descriptionStr : string = user.name + " added a comment " + content + " in " + task.title;
        const newLog = await Log.create({
            description: descriptionStr,
            // userId: userId,
            // taskId: taskId,
            // commentId: newComment.id
        });
        await newLog.setUser(userId);
        await newLog.setTask(taskId);
        await newLog.setComment(newComment.id);
        
        console.log("number of mentions", numOfMentions);
        
        if (numOfMentions > 0) {
            var numInComment = 0;
            
            for (var i of indices) {
                var nameString : string = content.slice(i + 1, content.indexOf(' ', i));
                const dbMentioned = await User.findOne({
                    where: {
                        name: nameString
                    }
                });
                if (dbMentioned === null) {
                    numOfMentions--;
                    continue;
                }
                const mentioned : any = dbMentioned?.id;
                const newMention = await Mention.create({
                    // commentId: newComment.id,
                    mentioned: mentioned,
                    numInComment: numInComment
                });
                newMention.setComment(newComment.id);
                console.log("New mention added", newComment.id, mentioned);
                numInComment++;
            }
        }
        await Comment.update({
            numOfMentions: numOfMentions
        }, {
            where: {
                id: newComment.id
            }
        })

        console.log("New comment added", descriptionStr);
        res.status(200).send("New comment added");
    } catch (e) {
        console.log("addNewComment err", e);
        res.send("addNewComment err");
    }
}

export {
    addNewComment
}