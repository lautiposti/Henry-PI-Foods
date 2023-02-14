const {Router} = require('express');
const axios = require ('axios');
const {API_KEY, Diet} = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, {headers:{'accept-encoding': 'gzip, deflate, compress'}});
    const apiInfo = apiUrl.data.results;

    let allDiets = [];
    apiInfo.forEach((r) => {
      r.diets.forEach((d) => allDiets.push(d));
    });
    const filteredDietsValues = [];
    const filteredDiets = [];
    allDiets.forEach((d) => {
      if (!filteredDietsValues.includes(d)) {
        filteredDietsValues.push(d);
        filteredDiets.push({ name: d });
      }
    });
    filteredDiets.forEach(async (d) => {
      await Diet.findOrCreate({
        where: { name: d.name },
      });
    });
    const dbDiets = await Diet.findAll();

    return res.status(200).json(dbDiets);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }

})

module.exports = router;