import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const appContextValue = useMemo(() => ({
    currentUser, setCurrentUser, currentUserData, setCurrentUserData,
  }), [currentUser, currentUserData]);

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
};

AppContextProvider.defaultProps = {
  children: '',
};

export default AppContextProvider;
