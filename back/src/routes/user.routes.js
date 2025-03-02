import express from "express";
import { UserController } from "../controllers/user.controller.js";

const initUserRoutes = (app)=>{
    const router = express.Router();
    router.get("/read",UserController.read)
    router.post("/signup",UserController.signUp)
    router.post("/signin",UserController.signIn)
    app.use("/users",router)
    
}
export default initUserRoutes;