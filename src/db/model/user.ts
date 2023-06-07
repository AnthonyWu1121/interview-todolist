import { CreationOptional, Model, Optional } from 'sequelize';

type UserAttributes = {
    id: number,
    name: string
};

type UserCreationAttribute = Optional<UserAttributes, 'id'>;

class User extends Model <UserAttributes, UserCreationAttribute> {
    declare id: number;
    declare name: string;

    declare createdAt: CreationOptional<Date>;
    declare updatadAt: CreationOptional<Date>;
}

export default User;