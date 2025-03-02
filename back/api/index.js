import express from "express";
import initRoutes from "../src/routes/init.routes.js";
import initMiddleware from "../src/middleware/init.middleware.js";
import cors from "cors"

const PORT = 3000;
const app = express();
app.use(
    cors({
      origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:5173"];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      optionsSuccessStatus: 200,
      credentials: true,
    })
);
initMiddleware(app)
app.use(express.json());
initRoutes(app);

app.listen(PORT,()=>{
    console.log("Le serveur ecoute sur le port: ", PORT)
})
