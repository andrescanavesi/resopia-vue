# resopia-vue

> Resopia Vue

# Creation

`npx create-nuxt-app resopia-vue`

create-nuxt-app v2.15.0
✨  Generating Nuxt.js project in resopia-vue
? Project name resopia-vue
? Project description Resopia Vue
? Author name Andres Canavesi
? Choose programming language JavaScript
? Choose the package manager Npm
? Choose UI framework Bootstrap Vue
? Choose custom server framework Express
? Choose Nuxt.js modules Axios, Progressive Web App (PWA) Support
? Choose linting tools ESLint
? Choose test framework Jest
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)

- Go to Firebase console and create a new project.
- Register a new app
- Add Firestore
  - Add DB in test mode
- Create web app to get the api key.
- Install Firebase in our app
`npm install --save firebase`
- Init Firebase project
`firebase init`
Follow the steps. Have in mind our public directory is `dist` and not the default `public`
- Build our project por productions environments
`npm run build`
- Deploy
`firebase deploy`
Open thebrowser in the generated url: https://recipes21.web.app

Since it's a PWA we can install it locally like any other app to use it offline

# Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
