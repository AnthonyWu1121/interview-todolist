import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, Model, Optional, CreationOptional } from 'sequelize';
import User from './user';
import Task from './task';
import Comment from './comment';

type LogAttributes = {
    id: number,
    description: string,
    // userId: number,
    // taskId: number,
    // commentId: number
};

type LogCreationAttribute = Optional<LogAttributes, 'id'>;

class Log extends Model <LogAttributes, LogCreationAttribute> {
    declare id: number;
    declare description: string;
    declare userId: number;
    declare taskId: number;
    declare commentId: number;
    declare getUser: BelongsToGetAssociationMixin<User>;
    declare getTask: BelongsToGetAssociationMixin<Task>;
    declare getComment: BelongsToGetAssociationMixin<Comment>;
    declare setUser: BelongsToSetAssociationMixin<User, number>;
    declare setTask: BelongsToSetAssociationMixin<Task, number>;
    declare setComment: BelongsToSetAssociationMixin<Comment, number>;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Log;