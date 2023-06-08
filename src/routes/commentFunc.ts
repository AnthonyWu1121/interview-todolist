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
            startIdx += idx;
            idx = content.indexOf('@', startIdx);
        }
        const newComment = await Comment.create({
            userId: userId,
            taskId: taskId,
            content: content,
            numOfMentions: numOfMentions
        });
        const dbComment = await Comment.findOne({
            where: {
                userId: userId,
                content: content,
                numOfMentions: numOfMentions
            }
        })
        const dbTask = await Task.findOne({
            where: {
                id: taskId
            }
        })
        const dbUser = await User.findOne({
            where: {
                id: userId
            }
        })
        const commentId : any = dbComment?.id;
        const descriptionStr : string = dbUser?.name + " added a comment " + content + " in " + dbTask?.title;
        const newLog = await Log.create({
            description: descriptionStr,
            userId: userId,
            taskId: taskId,
            commentId: commentId
        })
        
        if (numOfMentions > 0) {
            var numInComment = 0;
            
            for (let i of indices) {
                var nameString : string = content.slice(i, content.indexOf(' ', i));
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
                    commentId: commentId,
                    mentioned: mentioned,
                    numInComment: numInComment
                })
                console.log("New mention added", commentId, mentioned);
                numInComment++;
            }
            await Comment.update({
                numOfMentions: numOfMentions
            }, {
                where: {
                    id: commentId
                }
            })
        }

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