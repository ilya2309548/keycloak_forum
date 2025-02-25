import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080", // URL вашего Keycloak-сервера
  realm: "forum",               // Ваш realm
  clientId: "forum-client",     // Ваш client ID
  redirectUri: "http://localhost:3000", // URL, куда будет перенаправлен пользователь после успешной авторизации
});

export default keycloak;
