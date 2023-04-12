import { OrderContext } from "@/context/OrderContext";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

const Header = () => {
  const { user } = useContext(UserContext);
  const { order } = useContext(OrderContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/home";
  };

  return (
    <div className="header">
      <h1>Header</h1>
      <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/category">Categories</Link>
        </li>
      </ul>
      <ul>
        {user ? (
          <>
            <Link href="/user/profile">profile</Link>
            <li onClick={handleLogout}>Logout</li>
            <Link href="/order">panier {order?.ammount} €</Link>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
            <li>
              <Link href="/order">panier 0 €</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
