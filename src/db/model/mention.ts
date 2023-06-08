import { CreationOptional, Model, Optional } from 'sequelize';

type MentionAttributes = {
    id: number,
    commentId: number,
    mentioned: number,
    numInComment: number
};

type MentionCreationAttribute = Optional<MentionAttributes, 'id'>;

class Mention extends Model <MentionAttributes, MentionCreationAttribute> {
    declare id: number;
    declare commentId: number;
    declare mentioned: number;
    declare numInComment: number;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Mention;