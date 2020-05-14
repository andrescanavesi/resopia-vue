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

// const redirects = [
//   { from: '/recipe/76/fluffy-vanilla-cake', to: '/recipes/fluffy-vanilla-cake' },
//   { from: '/recipe/73/sweet-scones-without-eggs', to: '/recipes/sweet-scones-without-eggs' },
//   { from: '/recipe/74/simple-cookies', to: '/recipes/simple-cookies' },
//   { from: '/recipe/72/the-best-new-york-pizza-recipe', to: '/recipes/the-best-new-york-pizza-recipe' },
//   { from: '/recipe/22/parmesan-cheese-scones', to: '/recipes/parmesan-cheese-scones' }
// ];

const redirects = [
  {
    "from": "/recipe/14/noknead-artisan-style-bread",
    "to": "/recipes/noknead-artisan-style-bread"
  },
  {
    "from": "/recipe/13/dutch-oven-whole-wheat-bread",
    "to": "/recipes/dutch-oven-whole-wheat-bread"
  },
  {
    "from": "/recipe/8/easy-chewy-flourless-peanut-butter-cookies",
    "to": "/recipes/easy-chewy-flourless-peanut-butter-cookies"
  },
  {
    "from": "/recipe/9/ultimate-double-chocolate-cookies",
    "to": "/recipes/ultimate-double-chocolate-cookies"
  },
  {
    "from": "/recipe/12/pumpkin-magic-cake-with-maple-cinnamon-whipped-cream",
    "to": "/recipes/pumpkin-magic-cake-with-maple-cinnamon-whipped-cream"
  },
  {
    "from": "/recipe/15/amish-white-bread",
    "to": "/recipes/amish-white-bread"
  },
  {
    "from": "/recipe/16/cardamom-and-espresso-chocolate-chip-cookies",
    "to": "/recipes/cardamom-and-espresso-chocolate-chip-cookies"
  },
  {
    "from": "/recipe/18/creamy-rice-pudding",
    "to": "/recipes/creamy-rice-pudding"
  },
  {
    "from": "/recipe/19/super-rounded-bread",
    "to": "/recipes/super-rounded-bread"
  },
  {
    "from": "/recipe/20/burger-bread",
    "to": "/recipes/burger-bread"
  },
  {
    "from": "/recipe/21/peanut-butter-cookies",
    "to": "/recipes/peanut-butter-cookies"
  },
  {
    "from": "/recipe/22/parmesan-cheese-scones",
    "to": "/recipes/parmesan-cheese-scones"
  },
  {
    "from": "/recipe/23/garlic-and-oregano-bread-suitable-for-celiacs",
    "to": "/recipes/garlic-and-oregano-bread-suitable-for-celiacs"
  },
  {
    "from": "/recipe/17/pizza-dough-easy-to-cook",
    "to": "/recipes/pizza-dough-easy-to-cook"
  },
  {
    "from": "/recipe/24/oatmeal-and-orange-bread-with-sweetener",
    "to": "/recipes/oatmeal-and-orange-bread-with-sweetener"
  },
  {
    "from": "/recipe/25/pita-bread-arabic-bread",
    "to": "/recipes/pita-bread-arabic-bread"
  },
  {
    "from": "/recipe/26/cornstarch-cookies-maizena",
    "to": "/recipes/cornstarch-cookies-maizena"
  },
  {
    "from": "/recipe/27/chococookies",
    "to": "/recipes/chococookies"
  },
  {
    "from": "/recipe/28/spinach-ricotta-pie",
    "to": "/recipes/spinach-ricotta-pie"
  },
  {
    "from": "/recipe/29/french-lemon-yogurt-cake",
    "to": "/recipes/french-lemon-yogurt-cake"
  },
  {
    "from": "/recipe/30/cheese-crackers",
    "to": "/recipes/cheese-crackers"
  },
  {
    "from": "/recipe/32/focaccia-bread",
    "to": "/recipes/focaccia-bread"
  },
  {
    "from": "/recipe/31/chocolate-chip-cookies",
    "to": "/recipes/chocolate-chip-cookies"
  },
  {
    "from": "/recipe/33/mexican-cornbread",
    "to": "/recipes/mexican-cornbread"
  },
  {
    "from": "/recipe/34/creme-brulee",
    "to": "/recipes/creme-brulee"
  },
  {
    "from": "/recipe/35/big-chocolate-chip-cookies",
    "to": "/recipes/big-chocolate-chip-cookies"
  },
  {
    "from": "/recipe/36/chocolate-butter-cake",
    "to": "/recipes/chocolate-butter-cake"
  },
  {
    "from": "/recipe/37/banana-pudding",
    "to": "/recipes/banana-pudding"
  },
  {
    "from": "/recipe/38/peanut-butter-frosting",
    "to": "/recipes/peanut-butter-frosting"
  },
  {
    "from": "/recipe/39/vegan-brownie",
    "to": "/recipes/vegan-brownie"
  },
  {
    "from": "/recipe/75/glutenfree-chickpea-flour-cookies",
    "to": "/recipes/glutenfree-chickpea-flour-cookies"
  },
  {
    "from": "/recipe/72/the-best-new-york-pizza-recipe",
    "to": "/recipes/the-best-new-york-pizza-recipe"
  },
  {
    "from": "/recipe/74/simple-cookies",
    "to": "/recipes/simple-cookies"
  },
  {
    "from": "/recipe/73/sweet-scones-without-eggs",
    "to": "/recipes/sweet-scones-without-eggs"
  },
  {
    "from": "/recipe/76/fluffy-vanilla-cake",
    "to": "/recipes/fluffy-vanilla-cake"
  }
]

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

