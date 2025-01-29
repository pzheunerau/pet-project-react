import { createContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  // const [user, setUser] = useState(null);

  // const signin = (newUser, callback) => {
  const signIn = (callback) => {
    // setUser(newUser);
    localStorage.setItem('isLogined', true);
    callback();
  }

  const signOut = (callback) => {
    // setUser(null);
    localStorage.removeItem('isLogined');
    callback();
  }

  // const value = {user, signin, signout}
  const value = {signIn, signOut}

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}