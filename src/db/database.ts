import dotenv from "dotenv";
dotenv.config();
import { DataTypes, Sequelize } from 'sequelize';
import User from "./model/user";
import Task from "./model/task";
import Log from "./model/log";

const DIALECT : any = process.env.DIALECT;
var DBURL : any = process.env.DBURL;
if (process.env.NODE_ENV === "production") {
    DBURL = process.env.PRDBURL;
}

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

const db : any = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;