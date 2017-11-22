import create from "../controllers/register";
import signIn from "../controllers/signIn";
import auth from "../controllers/jwtAuth";
import checkAdmin from "../controllers/checkAdmin";
import event from "../controllers/events";


const appApi = (app) => {
    app.get("/api/v1", (req, res) => res.status(200).send({
        message: "Welcome to the Owanbe Event Manager App!",
    }));
    // login and signIn
    app.post("/api/v1/user/signup", create);
    app.post("/api/v1/user/signin", signIn);
    app.post("/api/v1/events/", event.create);
    
   
};

export default appApi;