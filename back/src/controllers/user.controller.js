import { UserDB } from "../database/user.database.js"
import isEmail from "validator/lib/isEmail.js"
import { hashPass, compareHash } from "../utils/crypto.utils.js";
import { jwtSign } from "../middleware/jwt.middleware.js";


const read = async(req, res)=>{
    const response = await UserDB.read();
    const result = response.result
    return res.status(200).json({
        message: "Succes",
        users:result

    })
}

// Fonction pour créer un utilisateur
const signUp = async (req, res) => {
    // Extraction des données de la requête
    const { firstname,lastname, email, password, role} = req.body;

    // Vérification de l'existence de l'email dans la base de données
    const result = await UserDB.emailExist(email);

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide !` });
    }

    // Validation du mot de passe
    if (!password || password.length <= 4) {
        return res
            .status(403)
            .json({ message: `Le mot de passe doit contenir au moins 5 caractères` });
    }

    // Hachage du mot de passe
    const hashResult = await hashPass(password);
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }
    const hashedPassword = hashResult.hashed;

    // Vérification de l'existence de l'email dans la base de données
    if (result.result >= 1) {
        return res
            .status(403)
            .json({
                message: `Email déjà existant`
            });
    } else {
        // Création de l'utilisateur dans la base de données
        const response = await UserDB.signUp(firstname, lastname, email, hashedPassword, role);
        const responseError = response.error;
        console.log(response);
        if (responseError) {
            return res.status(500).json({ message: responseError });
        }

        const userId = response.result.insertId;
        return res.status(200).json({ message: "Utilisateur créé", user: userId });
    }
};
const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide` });
    }

    
    // Récupération des informations de l'utilisateur depuis la base de données
    const response = await UserDB.signIn(email);
    const responseErr = response.error;
    if (responseErr) {
        return res.status(500).json({ message: responseErr });
    }

    const result = response.result;
    const user = result[0];

    // Vérification de l'existence de l'utilisateur
    if (!user) {
        return res.status(401).json({ message: `Échec de l'authentification` });
    }

    const userId = user.id;
    const role = user.role;
    const dbPassword = user.password;
// Comparaison des mots de passe hachés
    const passAreSame = await compareHash(password, dbPassword);
    if (!passAreSame) {
        return res.status(401).json({ message: `Échec de l'authentification` });
    }

    // Génération du jeton JWT
    const token = jwtSign(userId);
    return res
        .status(200)
        .json({ message: `Connexion réussie`, user: { userId, email, token, role } });
};


export const UserController ={read,signUp,signIn}