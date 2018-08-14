import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import config from './config';
import { MongoDataContext } from '../data/mongodb.client';

export default function (db) {
    var app: express.Express = express();
    var mongo: MongoDataContext = new MongoDataContext(app);

    // Models
    for (let model of config.globFiles(config.models)) {
        require(path.resolve(model));
    }

    // view engine setup
    app.set("views", path.join(__dirname, "../../src/views"));
    app.set("view engine", "jade");

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "../../src/public")));

    // Routes
    for (let route of config.globFiles(config.routes)) {
        console.log(`#Initializing controller on route: ${route}`);
        require(path.resolve(route)).default(app, mongo);
    }

    // catch 404 and forward to error handler
    app.use((req: express.Request, res: express.Response, next: Function): void => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        let err: Error = new Error("Not Found");
        next(err);
    });

    // production error handler
    app.use((err: any, req: express.Request, res: express.Response, next): void => {
        res.status(err.status || 500).render("error", {
            message: err.message,
            error: {}
        });
    });

    // enable cors on the requests
    app.use((req: express.Request, res: express.Response, next: Function): void => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    if (app.get("env") === "development") {
        app.use((err: Error, req: express.Request, res: express.Response, next): void => {
            res.status(500).render("error", {
                message: err.message,
                error: err
            });
        });
    }

    return app;
}