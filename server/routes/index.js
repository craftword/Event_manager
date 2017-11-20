import create from "../controllers/register";
import signIn from "../controllers/signIn";


const appApi = (app) => {
    app.get("/api/v1", (req, res) => res.status(200).send({
        message: "Welcome to the Owanbe Event Manager App!",
    }));
    // login and signIn
    app.post("/api/v1/user/signup", create);
    app.post("/api/v1/user/signin", signIn);
    
   
};

export default appApi;