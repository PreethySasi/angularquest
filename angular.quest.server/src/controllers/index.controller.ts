import { MongoDataContext } from '../data/mongodb.client';
import { Express, Request, Response, Router } from 'express';

export default class IndexRoute {
	constructor(private app: Express, private mongo: MongoDataContext) {
        let controller = new IndexController(mongo);
        let router: Router = Router();
        router.get('/', controller.read.bind(controller));        
        app.use('/', router);
	}
}

export class IndexController {

    constructor(protected mongo: MongoDataContext){ }

    public read(req: Request, res: Response, next: Function): void {
        res.render('index', { title: 'Express' });
    }

    public get(req: Request, res: Response): void {
        res.json({msg : 'Hello!'});
    }
}