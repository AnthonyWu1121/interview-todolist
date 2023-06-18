import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, CreationOptional, Model, Optional } from 'sequelize';
import Task from './task';
import User from './user';

type CommentAttributes = {
    id: number,
    // userId: number,
    // taskId: number,
    content: string,
    numOfMentions: number
};

type CommentCreationAttribute = Optional<CommentAttributes, 'id'>;

class Comment extends Model <CommentAttributes, CommentCreationAttribute> {
    declare id: number;
    declare userId: number;
    declare taskId: number;
    declare content: string;
    declare numOfMentions: number;
    declare getUser: BelongsToGetAssociationMixin<User>;
    declare getTask: BelongsToGetAssociationMixin<Task>;
    declare setUser: BelongsToSetAssociationMixin<User, number>;
    declare setTask: BelongsToSetAssociationMixin<Task, number>;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Comment;