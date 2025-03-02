import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./signup.css";

const SignUp = () => {
  //const { firstName, lastName, birthday, address, postCode, city, phoneNumber, danceLevel, email, password, role } = req.body;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "user";

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      firstname,
      lastname,
      email,
      password,
      role,
    };
    data = JSON.stringify(data);
    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Response succeeded!");
          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          toast.success("Inscription validée");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      });
  };
  return (
    <div className="main">
      <h2>Formulaire d&apos;inscription</h2>
      <form className="formGroup" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="firstName">
            Nom
          </label>
          <input
            id="firstName"
            aria-label="Entrez votre nom"
            className="inputField"
            type="text"
            name="firstname"
            placeholder="Entrez votre nom"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="lastName">
            Prénom
          </label>
          <input
            id="lastName"
            aria-label="Entrez votre Prénom"
            className="inputField"
            type="text"
            name="lastname"
            placeholder="Entrez votre prénom"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            aria-label="Entrez votre adresse email"
            className="inputField"
            type="email"
            name="email"
            placeholder="Entrez votre adresse email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            aria-label="Entrez votre mot de passe"
            className="inputField"
            type="password"
            name="password"
            placeholder="Entrez un mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required="required"
          />
        </div>
        <div>
          <input
            className="submitButton"
            type="submit"
            aria-label="S'inscrire"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;