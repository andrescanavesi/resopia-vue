// use: firebase deploy --only functions

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { Nuxt } = require("nuxt-start");
const express = require("express");

admin.initializeApp();

const expressServer = express();

const config = {
  dev: process.env.NODE_ENV !== "production",
  debug: true,
  buildDir: "dist/client",
};

const nuxt = new Nuxt(config);

expressServer.use(nuxt.render);

const redirects = require('../server/redirects');

const server = functions.https.onRequest((request, response, next) => {
  try{
    console.info("request original url: ", request.originalUrl);
    console.info("node env",process.env.NODE_ENV);

    const redirect = redirects.find(r => r.from === request.originalUrl)
    if (redirect) {
      console.log(`redirect 301: ${redirect.from} => ${redirect.to}`)
      response.writeHead(301, { Location: redirect.to })
      response.end()
    }else{
      return expressServer(request, response)
    }
  }catch(e){
    console.error('error processing request');
    console.error(e);
    return next();
  }



});

const nuxtjs = {
  server,
};

module.exports =  { nuxtjs };

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase! Env: "+process.env.NODE_ENV);
// });

