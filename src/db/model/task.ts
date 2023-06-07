import { Model, Optional, CreationOptional } from 'sequelize';

type TaskAttributes = {
    id: number,
    title: string,
    duetime: Date,
    creator: number,
};

type TaskCreationAttribute = Optional<TaskAttributes, 'id' | 'duetime'>;

class Task extends Model <TaskAttributes, TaskCreationAttribute> {
    declare id: number;
    declare title: string;
    declare duetime: Date;
    declare creator: number;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Task;