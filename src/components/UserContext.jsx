import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api/api';

export const UserContext = createContext(null);

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
    const response = await api.get('/login/user/profile/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario logueado', error);
    return null;
  }
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
