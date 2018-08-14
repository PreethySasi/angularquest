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
}

