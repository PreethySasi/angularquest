import { OperationResult } from './../model/operationresult.model';
import { MongoDataContext } from '../data/mongodb.client';
import { Express, Request, Response } from 'express';
import { BaseController, RouteConfig, Verbs } from '../config/base.controller';
import { Project } from './../model/project.model';
import * as moment from 'moment';

export default class ProjectRoute {
    constructor(private app: Express, private mongo: MongoDataContext) {
        let controller = new ProjectController(app, mongo);
        controller.initialize();
        app.use(controller.myRoutePath, controller.router);
    }
}

export class ProjectController extends BaseController {

    public myRoutePath: string = '/project';
    public controllerID: string = 'project';
    public collectionID: string = 'projects';

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
    /// Execute a post for search the current data record
    /// <summary>
    @RouteConfig({ path: '/like', verb: Verbs.POST })
    public searchLike(req: Request, res: Response): void {

        let regex = new RegExp(req.body.text);
        let query = { $or: [{ description: regex }, { name: regex }, { author: regex }, { author: regex }] };

        this.mongo.client$.subscribe((db) => {
            db.collection(this.collectionID).find(query).toArray((err, dbres) => {
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
            res.send({ msg: `Ping Elastic: ${this.controllerID} request!`, result: args });
        });
    }

    /// <summary>
    /// Execute a patch to modify the current data record
    /// <summary>
    @RouteConfig({ path: '/:id', verb: Verbs.PATCH })
    public patch(req: Request, res: Response): void {
        this.mongo.client$.subscribe((db) => {
            // db.collection(this.collectionID).find({ code: req.params.id }).toArray((err, dbres) => {
            //     let record = dbres[0];
            //     Object.assign(record, req.body);

            //     db.collection(this.collectionID).updateOne({ code: req.params.id }, { $set: record }, { upsert: false }, (err, dbres) => {
            //         var opr = OperationResult.FromMongoError(err);
            //         opr.tag = dbres;
            //         res.send(opr);
            //     });
            // });
            delete req.body._id;
            db.collection(this.collectionID).updateOne({ code: req.params.id }, { $set: req.body }, { upsert: false }, (err, dbres) => {
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
                opr.data = dbres && dbres.length > 0 ? dbres[0] : null;
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

    /// <summary>
    /// Execute a post to create the initial records on the database
    /// <summary>
    @RouteConfig({ path: '/setup', verb: Verbs.POST })
    public createInitialRecords(req: Request, res: Response): void {

        let records = new Array<Project>();
        records.push({ code: this.NewSimpleGuid(), name: 'First Project', description: 'Just a simple first project record', author: 'John', enabled: true, creationDate: moment().add(-1, 'days').toDate() });
        records.push({ code: this.NewSimpleGuid(), name: 'Another Project', description: 'Just another project record', author: 'Mark', enabled: true, creationDate: moment().add(-3, 'days').toDate() });
        records.push({ code: this.NewSimpleGuid(), name: 'Sample Project', description: 'Just a sample project record', author: 'Zed', enabled: true, creationDate: moment().add(-5, 'days').toDate() });
        records.push({ code: this.NewSimpleGuid(), name: 'Normal Project', description: 'Just a normal project record', author: 'Mike', enabled: true, creationDate: moment().add(-2, 'days').toDate() });
        records.push({ code: this.NewSimpleGuid(), name: 'Additional Project', description: 'Just an additional project record', author: 'John', enabled: true, creationDate: moment().add(-1, 'days').toDate() });

        this.mongo.client$.subscribe((db) => {
            db.collection(this.collectionID).insertMany(records, (err, dbres) => {
                var opr = OperationResult.FromMongoError(err);
                opr.data = dbres;
                res.send(opr);
            });
        });
    }
}


