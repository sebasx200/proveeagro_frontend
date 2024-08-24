import React, { createContext, useContext, useEffect, useState } from 'react';
import userApi from '../api/userApi';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedUser = await getLoggedInUser();
      setUser(loggedUser);
    };
    fetchUser();
  }, []);

  const login = async () => {
    const loggedUser = await getLoggedInUser();
    setUser(loggedUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const getLoggedInUser = async () => {
  try {
    const response = await userApi.get('/login/user/profile/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario logueado', error);
    return null;
  }
};
