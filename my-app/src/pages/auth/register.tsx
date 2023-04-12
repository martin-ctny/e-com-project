import { UserRegister } from "@/types/user/user.type";
import React, { useState } from "react";
import AuthService from "@/services/auth.service";
interface RegisterProps {
  email: string;
  password: string;
  Adresse: string;
  PhoneNumber: string;
  Ville: string;
  CodePostal: string;
}

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Ville, setVille] = useState("");
  const [CodePostal, setCodePostal] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    AuthService.register(
      email,
      password,
      Adresse,
      PhoneNumber,
      Ville,
      CodePostal
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>email</h2>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <h2>password</h2>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <h2>Adresse</h2>
      <input
        type="text"
        value={Adresse}
        onChange={(event) => setAdresse(event.target.value)}
      />
      <h2>telephone</h2>
      <input
        type="text"
        value={PhoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <h2>Ville</h2>
      <input
        type="text"
        value={Ville}
        onChange={(event) => setVille(event.target.value)}
      />
      <h2>Code Postal</h2>
      <input
        type="text"
        value={CodePostal}
        onChange={(event) => setCodePostal(event.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
