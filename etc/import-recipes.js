const { fireDb } = require('../plugins/firebase')
const recipesModule = require('./recipes')
// console.info(recipes)
const result = []
const redirects = []
for (let i = 0; i < recipesModule.recipes.length; i++) {
// for (let i = 0; i < 1; i++) {
  const element = recipesModule.recipes[i]
  const recipe = {
    id: element.title_for_url,
    title: element.title,
    description: element.description,
    keywords: element.keywords,
    active: true,
    primary_image: element.featured_image_name,
    secondary_image: 'default.jpg',
    created_at: element.created_at,
    updated_at: element.updated_at,
    category_name: 'General',
    prep_time_seo: 'PT20M',
    cook_time_seo: 'PT30M',
    total_time_seo: 'PT50M',
    prep_time: '20 minutes',
    cook_time: '30 minutes',
    total_time: '50 minutes',
    cuisine: 'American',
    yield: '5 servings',
    ingredients: element.ingredients.split('\n').map(elem => elem.trim()),
    steps: element.steps.split('.').map(elem => elem.trim())
  }
  result.push(recipe)

  const redirect = { from: '/recipe/' + element.id + '/' + element.title_for_url, to: '/recipes/' + element.title_for_url }
  redirects.push(redirect)
}
console.info(result)
// console.info(JSON.stringify(redirects, null, 2))

result.forEach((element) => {
  fireDb.collection('recipes').doc(element.id).set(element)
    .then((res) => {
      console.log('Document ' + element.id + ' successfully written!')
      // process.exit(0)
    }).catch((error) => {
      console.error('Error writing document: ', error)
      // process.exit(0)
    })
})
