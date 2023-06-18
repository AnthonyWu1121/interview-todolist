import { CreationOptional, Model, Optional, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin } from 'sequelize';
import Comment from './comment';

type MentionAttributes = {
    id: number,
    // commentId: number,
    mentioned: number,
    numInComment: number
};

type MentionCreationAttribute = Optional<MentionAttributes, 'id'>;

class Mention extends Model <MentionAttributes, MentionCreationAttribute> {
    declare id: number;
    declare commentId: number;
    declare mentioned: number;
    declare numInComment: number;
    declare getComment: BelongsToGetAssociationMixin<Comment>;
    declare setComment: BelongsToSetAssociationMixin<Comment, number>;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default Mention;