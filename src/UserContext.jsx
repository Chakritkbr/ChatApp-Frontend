import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/auth/profile`).then((response) => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
