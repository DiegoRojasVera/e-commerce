import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import AppNavigation from './src/navigation/AppNavigation';
import AuthScreen from "./src/Screens/Auth"
import AuthContext from './src/context/AuthContext';
import { setTokenApi, getTokenApi, removeTokenApi } from './src/api/token';

export default function App() {

  //para ver si esta logueado el usuario
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {

        setAuth({
          token,
          idUser: jwtDecode(token).id
        });
      } else {
        setAuth(null);
      }
    })()
  }, []);

  const login = (user) => {
    console.log("Login Api");
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? (
          <AppNavigation />
        ) : (
          <AuthScreen />
        )}
      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});