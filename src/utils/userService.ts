import keycloak from "../main/Keycloak";
import {KeycloakError, KeycloakPromise} from "keycloak-js";

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 */
/*const initKeycloak = (): Promise<boolean> => {
    return _kc.login().then(() => true)
};*/

const doLogin = keycloak.login;

const doLogout = keycloak.logout;

const getToken = () => keycloak.token;

const isLoggedIn = () => !!keycloak.token;

const updateToken = (successCallback: any) =>
    keycloak.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => keycloak.tokenParsed?.preferred_username;

const hasRole = (roles: any[]) => roles.some((role) => keycloak.hasRealmRole(role));

const UserService = {
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
};

export default UserService;