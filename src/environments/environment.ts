// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAqWzYO8jv6kVZrJ_GyjhWBiqf7HKWsGM0",
    authDomain: "building-fees.firebaseapp.com",
    databaseURL: "https://building-fees.firebaseio.com",
    projectId: "building-fees",
    storageBucket: "building-fees.appspot.com",
    messagingSenderId: "618723828121"
  }
};
