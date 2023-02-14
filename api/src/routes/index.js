const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes.js');
const diets = require ('./diet');
const recipe = require('./recipe')
const { TimeoutError } = require('sequelize');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/diets', diets);
router.use('/recipe', recipe);



module.exports = router;
