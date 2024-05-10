import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountData = await account.get();
      setUser(accountData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      const accountData = await account.get();
      console.log(accountData);
      setUser(accountData);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLogout = async () => {
    try {
      const result = await account.deleteSession("current");
      console.log("Logout Successful");
      setUser(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-40 aspect-square border-[0.6rem] border-t-[0.6rem] border-t-[#fe6d73] animate-[spin_1.5s_linear_infinite] rounded-full"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
