import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost:80/keycloak",
    realm: "Jibber-Jabber",
    clientId: "Javier-Javier-Front",
});
window['kc'] = keycloak;
export default keycloak;