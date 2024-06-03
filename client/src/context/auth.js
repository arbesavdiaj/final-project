/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import Api from "../api/authApi";
import LakeApi from "../api/lakeApi";
const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [authDep, setAuthDep] = useState(false);
  const [publicLakes, setPublicLakes] = useState([]);

  useEffect(() => {
    checkAuthUser();
  }, [authDep]);

  const [user, setUser] = useState([]);

  const checkAuthUser = async () => {
    const result = await Api.authUser();
    if (result.data.status === 200) {
      setUser(result.data.user[0]);
    } else if (result.data.status === 401) {
      const lakes = await LakeApi.getAllPublicLakes();
      setPublicLakes(lakes);
    }
  };

  const loginApi = async (email, pass) => {
    try {
      const result = await Api.login(email, pass);
      if (result.status === 200) {
        setUser(result.user[0]);
      }
    } catch (error) {
      return error;
    }
  };

  const logoutApi = async (email, pass) => {
    try {
      const result = await Api.logout(email, pass);
      if (result.status === 200) {
        setUser([]);
      }
    } catch (error) {
      return error;
    }
  };

  const values = {
    loginApi,
    logoutApi,
    setUser,
    user,
    setAuthDep,
    publicLakes,
  };
  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
export { AuthProvider, useAuthContext };
