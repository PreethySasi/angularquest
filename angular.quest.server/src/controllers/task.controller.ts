import { OperationResult } from './../model/operationresult.model';
import { MongoDataContext } from '../data/mongodb.client';
import { Express, Request, Response } from 'express';
import { BaseController, RouteConfig, Verbs } from '../config/base.controller';

export default class TaskRoute {
    constructor(private app: Express, private mongo: MongoDataContext) {
        let controller = new TaskController(app, mongo);
        controller.initialize();
        app.use(controller.myRoutePath, controller.router);
    }
}

export class TaskController extends BaseController {

    public myRoutePath: string = '/task';
    public controllerID: string = 'task';
    public collectionID: string = 'tasks';

    /// <summary>
    /// Execute a post for search the current data record
    /// <summary>
    @RouteConfig({ path: '/all', verb: Verbs.POST })
    public search(req: Request, res: Response): void {
        this.mongo.client$.subscribe((db) => {
            db.collection(this.collectionID).find(req.body).toArray((err, dbres) => {
                var opr = OperationResult.FromMongoError(err);
                opr.data = dbres;
                res.send(opr);
            });
        });
    }

    /// <summary>
    /// Execute a post for ping the current data source
    /// <summary>
    @RouteConfig({ path: '/ping', verb: Verbs.POST })
    public ping(req: Request, res: Response): void {
        this.mongo.stats$.subscribe((args: any) => {
            res.send({ msg: `Ping Mongo: ${this.controllerID} request!`, result: args });
        });
    }

    /// <summary>
    /// Execute a post for multiple operations with the current data record
    /// <summary>
    @RouteConfig({ path: '/', verb: Verbs.POST })
    public post(req: Request, res: Response): void {
        res.send({ msg: `Post: ${this.controllerID} request!`, params: req.params });
    }

    /// <summary>
    /// Execute a patch to modify the current data record
    /// <summary>
    @RouteConfig({ path: '/:id', verb: Verbs.PATCH })
    public patch(req: Request, res: Response): void {
        this.mongo.client$.subscribe((db) => {
            db.collection(this.collectionID).update({ code: req.params.id }, req.body, (err, dbres) => {
                var opr = OperationResult.FromMongoError(err);
                opr.tag = dbres;
                res.send(opr);
            });
        });
    }

    /// <summary>
    /// Execute a get to retrieve by id the current data record
    /// <summary>
    @RouteConfig({ path: '/:id', verb: Verbs.GET })
    public get(req: Request, res: Response): void {
        this.mongo.client$.subscribe((db) => {
            db.collection(this.collectionID).find({ code: req.params.id }).toArray((err, dbres) => {
                var opr = OperationResult.FromMongoError(err);
                opr.data = dbres;
                opr.dataLength = dbres.length;
                res.send(opr);
            });
        });
    }

    /// <summary>
    /// Execute a put to include a new data record
    /// <summary>
    @RouteConfig({ path: '/new', verb: Verbs.PUT })
    public put(req: Request, res: Response): void {
        this.mongo.client$.subscribe((db) => {
            if (req.body) { req.body["code"] = this.NewSimpleGuid(); }
            db.collection(this.collectionID).insertOne(req.body, (err, dbres) => {
                var opr = OperationResult.FromMongoError(err);
                opr.tag = dbres;
                res.send(opr);
            });
        });
    }

    /// <summary>
    /// Execute a delete to remove the current data record
    /// <summary>
    @RouteConfig({ path: '/:id', verb: Verbs.DELETE })
    public delete(req: Request, res: Response): void {        
        this.mongo.client$.subscribe((db) => {
            db.collection(this.collectionID).deleteOne({ code: req.params.id }, (err, dbres) => {
                var opr = OperationResult.FromMongoError(err);
                opr.dataLength = dbres.deletedCount;
                opr.tag = dbres;
                res.send(opr);
            });
        });
    }
}


