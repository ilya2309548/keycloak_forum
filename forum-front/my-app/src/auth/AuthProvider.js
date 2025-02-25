import { useState, useEffect, createContext } from "react";
import keycloak from "../api/keycloak";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: localStorage.getItem("keycloak-token"), // Инициализация из localStorage
  });

  useEffect(() => {
    if (!auth.token) {
      keycloak
        .init({
          onLoad: "login-required",
          pkceMethod: "S256",  // Использование PKCE
          redirectUri: "http://localhost:3000", // Колбэк URL
        })
        .then((authenticated) => {
          if (authenticated) {
            const token = keycloak.token;
            localStorage.setItem("keycloak-token", token); // Сохраняем токен в localStorage
            setAuth({
              isAuthenticated: true,
              token,
            });

            // Настройка обновления токена
            setInterval(() => {
              keycloak
                .updateToken(30)
                .then((refreshed) => {
                  if (refreshed) {
                    const newToken = keycloak.token;
                    localStorage.setItem("keycloak-token", newToken); // Обновляем токен в localStorage
                    setAuth((prev) => ({ ...prev, token: newToken }));
                  }
                })
                .catch(() => keycloak.logout());
            }, 60000); // Обновляем токен каждые 60 секунд
          }
        })
        .catch(() => {
          keycloak.logout();
        });
    }
  }, [auth.token]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
