# Angular Quest Foundation Workshop
This is a sample project to be used during the demonstration of the fundamentals of Angular6 workshop highlighting basic standards and best practices on the usage along with TypeScript, RxJs, Node, Express.js and MongoDB

## Gearing up for the execution
> Visual Studio Code `https://code.visualstudio.com/`   
> Commander `http://cmder.net/`   
> MongoDB Community Server `https://www.mongodb.com/download-center?jmp=nav#community`      
> Postman `https://www.getpostman.com/`   

## Getting Started
**01.** Install MongoDB Community server  
**02.** Open MongoDB Compass and create the database "**angular-quest**"    
**03.** Open the database and create the collection "**projects**"    

## Starting the API
**04.** Open the **Cmder** and navigate to the folder "`../angular.quest.server/`"      
**05.** Run the command "`npm install`"   
**06.** Run the command "`npm run build`"   
**07.** Run the command "`npm run debug`"   
**08.** Open `Postman` and execute a POST request to the url: "`http://localhost:3000/project/all`"   
**09.** You still have no data on the database but sould get a response from API similar to this:
```javascript
{
    "success": true,
    "message": null,
    "data": [],
    "tag": null,
    "dataLength": 0,
    "recordId": null,
    "executionTime": 0
}
```

## Starting the Angular App
**10.** Open another tab on **Cmder** and navigate to the folder "`../angular.quest.app/`"      
**11.** Run the command "`npm install`"   
**12.** Run the command "`ng build`"   
**13.** Run the command "`ng serve`"  
**14.** Open the browser and navigate to the URL "`http://localhost:4200/`"     
**15.** You should now see the home page of the app, navigate to the menu "Projects"    
**16.** In this page you should see the button "`Insert Initial Records`", click on it!   
**17.** You should see by now the project table list populated.   
**18.** Click in any record and edit some data on the form      
**19.** Create and Delete records to check if the actions are fully working     
**20.** Open VSCode, explore the project and have fun. :smile:

## Contributing  
Contributions are welcome, just get in touch with me and we can sort it out.    
  
## Authors    
At this moment, only one warrior on this quest:  
    
 - **Wagner Alves** - Solutions Architect - Dublin/Ireland  
 - keyrox@gmail.com | https://www.linkedin.com/in/keyrox | https://github.com/keyrox    
