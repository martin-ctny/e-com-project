import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const profile = () => {
  const Router = useRouter();
  const { user } = useContext(UserContext);

  const handleUpdate = () => {
    Router.push("/user/update");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Bonjour</h1>
      <p>Votre email : {user?.email}</p>
      <p>Votre adress : {user?.Adresse}</p>
      <p>Votre Code Postal : {user?.CodePostal}</p>
      <p>Votre numéro de téléphone : {user?.PhoneNumber}</p>
      <p>Votre ville : {user?.Ville}</p>
      <button onClick={handleUpdate}>modifier</button>
    </div>
  );
};

export default profile;
