import users from "../controllers/users";
import auth from "../middlewares/jwtAuth";
import checkAdmin from "../middlewares/checkAdmin";
import event from "../controllers/events";
import centerController from "../controllers/centers";


const appApi = (app) => {
    app.get("/api/v1", (req, res) => res.status(200).send({
        message: "Welcome to the Owanbe Event Manager App!",
    }));
    // login and signIn
    app.post("/api/v1/user/signup", users.create);
    app.post("/api/v1/user/signin", users.signIn);

    // Events Endpoints
    app.post("/api/v1/events/", auth, event.create);
    app.put("/api/v1/events/:eventId", auth, event.update);
    app.get("/api/v1/events/:eventId", auth, event.view);
    app.delete("/api/v1/events/:eventId", auth, event.destroy);

    // Centers Endpoints
    app.post("/api/v1/centers/", auth, checkAdmin,centerController.create);
    app.put("/api/v1/centers/:centerId", auth, checkAdmin,centerController.update);
    app.get("/api/v1/centers/:centerId", auth, centerController.view);
    app.get("/api/v1/centers/", centerController.list);
};

export default appApi;