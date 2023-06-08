import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './routes/swagger';
import dotenv from 'dotenv';
dotenv.config();
import db from './db/database';

// db.sequelize.sync({force: true}).then(() => {
//     console.log("db sync");
// });
db.sequelize.sync().then(() => {
    console.log("db sync");
});

const app : Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

// app.get('/', (_, res : Response) => {
//     res.send('The server is working!');
//     console.log("default send");
// });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.listen(port, () => {
    console.log(`server is listening on ${port} !!!`);
});