import { secrets } from "src/secrets/secrets";

export const environment = {
  firebase: {
    apiKey: secrets.firebaseApiKey,
    authDomain: 'pong-b7547.firebaseapp.com',
    databaseURL:
      'https://pong-b7547-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'pong-b7547',
    storageBucket: 'pong-b7547.appspot.com',
    messagingSenderId: secrets.firebaseMessagingSenderId,
    appId: secrets.firebaseAppId,
  },
  strava: {
    issuer: 'https://www.strava.com/oauth/token',
    redirectUri: window.location.origin + "/strava-login",
    clientId: secrets.stravaClientId,
    dummyClientSecret: secrets.stravaDummyClientSecret,
    responseType: 'code',
    scope: 'activity:read_all',
    showDebugInformation: true,
    useSilentRefresh: true,
    loginUrl: 'https://www.strava.com/oauth/authorize',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
    oidc: false,
    requestAccessToken: true,
  },
  production: false,
};
