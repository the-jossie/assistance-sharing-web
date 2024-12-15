// import * as React from 'react';
import { useStorage } from "@/hooks";
import { Role } from "@/types";
import { createContext, useContext } from "react";

interface IAuth {
  auth: { token: string; role: Role };
  saveAuth: ({ token, role }: { token: string; role: Role }) => boolean;
  clearAuth: () => boolean;
}

export const AuthContext = createContext<IAuth | null>(null);

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("'useAuthContext' must be a child of 'AuthProvider'");
  }

  return auth;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAuth, saveAuth, clearAuth } = useStorage();

  const auth = getAuth();

  return (
    <AuthContext.Provider value={{ auth, saveAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// import PropTypes from 'prop-types';
// import { createContext, ReactNode, useEffect, useState } from 'react';
// import { APP_NAME } from '../config/app';

// import { useSessionStorage } from '../hooks';

// type IUSERCONTEXT = {
//   user: any;
//   setUser: Function;
//   userAccountIsSynced: boolean;
//   setUserAccountIsSynced: Function;
// } | null;

// const UserContext = createContext<IUSERCONTEXT>(null);

// interface IProps {
//   children: ReactNode;
// }

// const UserProvider = ({ children }: IProps) => {
//   const [store] = useSessionStorage(APP_NAME, '');
//   let { userData, token } = store;
//   const [user, setUser] = useState(userData || {});
//   const [userAccountIsSynced, setUserAccountIsSynced] = useState(Boolean(token));

//   useEffect(() => {
//     setUserAccountIsSynced(Boolean(store.token));
//   }, [store]);

//   return (
//     <UserContext.Provider value={{ user, setUser, userAccountIsSynced, setUserAccountIsSynced }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };

// UserProvider.propTypes = {
//   children: PropTypes.node,
// };
