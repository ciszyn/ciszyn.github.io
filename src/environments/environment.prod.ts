export const environment = {
  firebase: {
    apiKey: 'undefined',
    authDomain: 'pong-b7547.firebaseapp.com',
    databaseURL:
      'https://pong-b7547-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'pong-b7547',
    storageBucket: 'pong-b7547.appspot.com',
    messagingSenderId: 'undefined',
    appId: 'undefined',
  },
  strava: {
    issuer: 'https://www.strava.com/oauth/token',
    redirectUri: window.location.origin + "/strava-login",
    clientId: 'undefined',
    dummyClientSecret: 'undefined',
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
  production: true,
};
