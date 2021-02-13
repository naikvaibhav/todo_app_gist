import { createContext, useContext } from 'react';

export const AuthContext = createContext()  
export const useAuth = () => useContext(AuthContext)


// import { createContext, useContext } from 'react';

// export const AuthContext = createContext();

// const useAuth = () => {
//   return useContext(AuthContext);
// }

// export default useAuth