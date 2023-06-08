import { Model, Optional, CreationOptional } from 'sequelize';

type LogAttributes = {
    id: number,
    description: string,
    userId: number,
    taskId: number,
    commentId: number
};

type LogCreationAttribute = Optional<LogAttributes, 'id' | 'commentId'>;

class Log extends Model <LogAttributes, LogCreationAttribute> {
    declare id: number;
    declare description: string;
    declare userId: number;
    declare taskId: number;
    declare commentId: number;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Log;