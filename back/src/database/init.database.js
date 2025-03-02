import mysql from "mysql2";

const pool = mysql.createPool({
    connectionLimit:10000,
    host:"localhost",
    user:"root",
    password:"",
    database:"snack",
    
})

const query = (sql, values =[])=>{
    return new Promise((resolve,reject)=>{
        pool.query(sql,values,(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default query;