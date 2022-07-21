import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "https://jibberjabber.cloud/keycloak",
    realm: "Jibber-Jabber",
    clientId: "Javier-Javier-Front",
});
window['kc'] = keycloak;
export default keycloak;