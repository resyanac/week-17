// import helmetApp from "./helmet";
// import morganApp from "./morgan";
import { Express } from "express";
import xRequestId from "./xRequestId";
import corsMiddleware from "./cors"
import authenticationMiddleware from "./authentication-middleware";

const middleWares = (app: Express)=> {
    // helmetApp(app);
    // morganApp(app);
    // corsMiddleware(app);
    // app.use(xRequestId)
    authenticationMiddleware(app)
    
}

export default middleWares