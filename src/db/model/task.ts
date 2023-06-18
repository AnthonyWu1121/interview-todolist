import { Model, Optional, CreationOptional, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin } from 'sequelize';
import User from './user';

type TaskAttributes = {
    id: number,
    title: string,
    duetime: Date,
    creator: number,
};

type TaskCreationAttribute = Optional<TaskAttributes, 'id' | 'creator' | 'duetime'>;

class Task extends Model <TaskAttributes, TaskCreationAttribute> {
    declare id: number;
    declare title: string;
    declare duetime: Date;
    declare creator: number;
    declare getCreator: BelongsToGetAssociationMixin<User>;
    declare setCreator: BelongsToSetAssociationMixin<User, number>;
    declare getUser: BelongsToGetAssociationMixin<User>;
    declare setUser: BelongsToSetAssociationMixin<User, number>;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Task;