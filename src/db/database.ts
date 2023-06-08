import dotenv from "dotenv";
dotenv.config();
import { DataTypes, Sequelize } from 'sequelize';
import User from "./model/user";
import Task from "./model/task";
import Log from "./model/log";
import Comment from "./model/comment";
import Mention from "./model/mention";

const DIALECT : any = process.env.DIALECT;
var DBURL : any = process.env.DBURL;
// if (process.env.NODE_ENV === "production") {
//     DBURL = process.env.PRDBURL;
// }

const sequelize = new Sequelize(DBURL, {
    dialect: DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000
    }
});
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'users',
        sequelize
    }
);
Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }, 
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        duetime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        creator: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'tasks',
        sequelize
    }
);
Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'logs',
        sequelize
    }
);
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        numOfMentions: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "comments",
        sequelize
    }
);
Mention.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mentioned: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numInComment: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "mentions",
        sequelize
    }
)

const db : any = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;