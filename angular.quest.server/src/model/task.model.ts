// ----------------------------------------------------------
//
// Default model for the Task data type
//
// ----------------------------------------------------------
export class Task {

    constructor(args?: Partial<Task>) { if (args) { Object.apply(this, args); } }
    
    public projectCode: string;

    public code: string;
    
    public name: string;
    
    public description: string;
    
    public author: string;
    
    public enabled: boolean;
    
    public creationDate: Date;
}