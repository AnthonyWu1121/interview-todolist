import { CreationOptional, Model, Optional } from 'sequelize';

type CommentAttributes = {
    id: number,
    userId: number,
    taskId: number,
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

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Comment;