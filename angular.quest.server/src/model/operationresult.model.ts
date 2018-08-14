import { MongoError } from 'mongodb';
// ----------------------------------------------------------
//
// Default OperationResult object for api communication calls
//
// ----------------------------------------------------------
export class OperationResult {
    public constructor(args?: Partial<OperationResult>) { if (args) { Object.apply(this, args); } }
    public success: boolean = false;
    public message: string = null;
    public data: any = null;
    public tag: any = null;
    public dataLength: number = 0;
    public recordId: any = null;
    public executionTime: number = 0;

    public static FromMongoError(err: MongoError): OperationResult {
        let res = new OperationResult();
        res.success = !(err != undefined && err.message != undefined);
        res.message = err != undefined ? err.message : null;
        res.data = err != undefined ? err : null;
        return res;
    }
}