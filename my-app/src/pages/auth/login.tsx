import AuthService from "@/services/auth.service";
import TokenService from "@/services/token.service";
import UserService from "@/services/user.service";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await AuthService.login(email, password);

      setSuccess(true);
      const userId: any = await TokenService.getUserFromLocalStorage();
      const user = await UserService.getOneUser(userId.sub);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
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
      <h2>mail</h2>
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
      <button type="submit">Login</button>
      {success && <p>Vous vous êtes connecté avec succes</p>}
    </form>
  );
};

export default Login;
