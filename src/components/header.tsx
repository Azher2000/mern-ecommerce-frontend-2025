import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <FaUser />
        </button>
        <dialog open={isOpen}>
          <div>
            {/* {user.role === "admin" && (
              <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>
            )} */}

            {(user.role === "admin" || user.role === "user") && (
              <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>
            )}

            <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
            <button onClick={logoutHandler}>
              <FaSignOutAlt />
            </button>
          </div>
        </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
