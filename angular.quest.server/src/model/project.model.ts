// ----------------------------------------------------------
//
// Default model for the Project data type
//
// ----------------------------------------------------------
export class Project {

    constructor(args?: Partial<Project>) { if (args) { Object.apply(this, args); } }
    
    public code: string;
    
    public name: string;
    
    public description: string;
    
    public author: string;
    
    public enabled: boolean;
    
    public creationDate: Date;
}