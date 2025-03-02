import query from "./init.database.js";

const read = async()=>{
    const sql = "SELECT id , firstname, lastname, email FROM user ORDER BY lastname ASC"
    let error = null;
    let result = null;
    try {
        result = await query(sql)
    } catch (e) {
        error = e.message
    }finally{
        return {
            error,result
        }
    }
        
    
}
// Fonction pour vérifier l'existence d'un email dans la base de données
const emailExist = async (email) => {
    const sql = ` SELECT COUNT(*) as count from user where email= ?`;
    let result = await query(sql, [email]);

    result = result[0].count;

    return { result };
};

// Fonction pour créer un nouvel utilisateur dans la base de données
const signUp = async (firstname, lastname, email, hashedPassword, role) => {
    const sql = `
   INSERT INTO user (firstname, lastname, email, password, role) 
   VALUES ( ?, ?, ?, ? )`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour créer un nouvel utilisateur
        result = await query(sql, [firstname, lastname,  email, hashedPassword, role]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};
const signIn = async (email) => {
    const sql = `
    SELECT id, email, password, role
    FROM user
    WHERE email = ?`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'authentification
        result = await query(sql, [email]);
    }
    catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    }
    finally {
        // Retour d'un objet contenant l
    return { error, result };
    }
};
export const UserDB = {read, signUp, emailExist,signIn}