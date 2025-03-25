import { createContext, useState, useEffect } from 'react';
import { API } from '@/api/api';
import propTypes from 'prop-types';
import cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUserDetails = async () => {
    setLoading(true);
    try {
      const response = await API.currentUserDetails();
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      window.location.href = '/login';
      cookies.remove('Authorization');
      console.error(error);
    }
  };

  useEffect(() => {
    if (cookies.get('Authorization')) {
      fetchCurrentUserDetails();
    } else {
      setLoading(false);
      window.location.href = '/login';
      cookies.remove('Authorization');
    }
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: propTypes.node.isRequired,
};
