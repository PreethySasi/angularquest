import { Express } from "express";
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MongoClient, MongoError, Db } from "mongodb";

export class MongoDataContext {

    constructor(private readonly _app: Express) { }

    private _db: Db;
    private readonly _dbSubject = new ReplaySubject<Db>();

    public get client$() {
        if (this._db === undefined) {
            MongoClient.connect('mongodb://localhost:27017/angular-quest', { useNewUrlParser: true, keepAlive: true }, (err: MongoError, client: MongoClient) => {
                if (err) { throw err; }
                this._db = client.db('angular-quest');
                this._dbSubject.next(this._db);
            });
        }
        return this._dbSubject.asObservable();
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