// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCc0aU_ScSQSl7ZxwCF89M26YkaYVB4L9k",
    authDomain: "codes-chat.firebaseapp.com",
    projectId: "codes-chat",
    storageBucket: "codes-chat.appspot.com",
    messagingSenderId: "1162155182",
    appId: "1:1162155182:web:f9c2dddd49f9a13df2093f",
    measurementId: "G-R5Y36BL0SQ"
  },
  COMETCHAT_CONSTANTS: {
    APP_ID: "2500818b54956bd1", // Replace with your App ID
    REGION: "in", // Replace with your App Region ("eu" or "us")
    AUTH_KEY: "d6becc608c596a53e990b81657e0196678feec9b" // Replace with your Auth Key
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
