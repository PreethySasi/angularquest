import { Express } from "express";
import { Observable, Subject } from 'rxjs';
import { MongoClient, MongoError, Db } from "mongodb";

export class MongoDataContext {

    private _app: Express;
    constructor(app: Express) { this._app = app; }

    public get client$(): Observable<Db> {
        let clientSubject = new Subject<Db>();
        MongoClient.connect('mongodb://localhost:27017/angular-quest', (err: MongoError, client: MongoClient) => {
            if (err) { throw err; }
            clientSubject.next(client.db('angular-quest'));
        });
        return clientSubject.asObservable();
    }

    public get stats$(): Observable<any> {
        let sub = new Subject<any>();
        this.client$.subscribe((db) => {
            db.stats((err, res) => {
                if (err) { throw err; }
                sub.next(res);
            });
        });
        return sub.asObservable();
    }
}