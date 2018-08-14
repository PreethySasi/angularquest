import "reflect-metadata";

import { Express, Request, Response, Router } from 'express';
import { MongoDataContext } from "../data/mongodb.client";

export class Verbs { public static GET = 0; public static POST = 1; public static PATCH = 2; public static PUT = 3; public static DELETE = 4; }

export function RouteConfig(args: RouteData): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let controller = target as BaseController;
        controller.myRoutes.push({ route: args, method: target[propertyKey] });
    };
}

export abstract class BaseController {

    constructor(public readonly app: Express, public readonly mongo: MongoDataContext) { }

    public abstract myRoutePath: string;

    private _router: Router;
    public get router(): Router { if (this._router == null) { this._router = Router(); } return this._router; }

    private _myRoutes: Array<RouteDefinition>;
    public get myRoutes(): Array<RouteDefinition> { if (this._myRoutes == null) { this._myRoutes = new Array<RouteDefinition>(); } return this._myRoutes; }

    public initialize(): void {
        for (var i = 0; i < this.myRoutes.length; i++) {
            var item = this.myRoutes[i];
            switch (item.route.verb) {
                case Verbs.GET: this.router.get(item.route.path, item.method.bind(this)); break;
                case Verbs.POST: this.router.post(item.route.path, item.method.bind(this)); break;
                case Verbs.PATCH: this.router.patch(item.route.path, item.method.bind(this)); break;
                case Verbs.PUT: this.router.put(item.route.path, item.method.bind(this)); break;
                case Verbs.DELETE: this.router.delete(item.route.path, item.method.bind(this)); break;
                default: break;
            }
        }
    }

    public NewGuid(): string { return this.NewSimpleGuid() + '-' + this.NewSimpleGuid() + '-' + this.NewSimpleGuid() + this.NewSimpleGuid(); }
    public NewSimpleGuid(): string { return this.s4() + this.s4(); }
    private s4(): string { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
}

export class RouteData {
    constructor(args?: Partial<RouteData>) { Object.assign(this, args); }
    public path: string;
    public verb: number;
}

export class RouteDefinition {
    public route: RouteData;
    public method: (req: Request, res: Response) => void;
}
