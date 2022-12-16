import {writeFile} from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: 'pong-b7547.firebaseapp.com',
    databaseURL:
      'https://pong-b7547-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'pong-b7547',
    storageBucket: 'pong-b7547.appspot.com',
    messagingSenderId: '${process.env.FIREBASE_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
  },
  strava: {
    issuer: 'https://www.strava.com/oauth/token',
    redirectUri: window.location.origin + "/strava-login",
    clientId: '${process.env.STRAVA_CLIENT_ID}',
    dummyClientSecret: '${process.env.STRAVA_API_KEY}',
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
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
