import { UserContext } from "@/context/UserContext";
import UserService from "@/services/user.service";
import { useContext, useState } from "react";

const UpdateUser = () => {
  const { user, setUser } = useContext(UserContext);

  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [ville, setVille] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setNewEmail(value);
    } else if (name === "address") {
      setNewAddress(value);
    } else if (name === "city") {
      setVille(value);
    } else if (name === "postalCode") {
      setNewPostalCode(value);
    } else if (name === "phoneNumber") {
      setNewPhoneNumber(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = {
      ...user,
      email: newEmail,
      Adresse: newAddress,
      Ville: ville,
      CodePostal: newPostalCode,
      PhoneNumber: newPhoneNumber,
    };
    try {
      const data = await UserService.updateUserInfo(user?.id, updatedUser);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newEmail}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={newAddress}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={ville}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={newPostalCode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={newPhoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};
export default UpdateUser;
