import express from "express"


const initMiddleware = (app)=>{
    app.use(express.json())

}
export default initMiddleware