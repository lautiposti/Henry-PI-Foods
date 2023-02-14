const {Router} = require('express');
const axios = require ('axios');
const {Recipe, Diet, Op} = require ('../db')

const router = Router(); // inicializamos router

// Creacion de recetas ---> name, image, summary, healthScore, steps, diet
router.post('/', async(req, res) => {
    try {

    const {
        name,
        image,
        summary,
        healthScore,
        steps,
        diets
    } = req.body

    
    if(!name) {
        return res.status(404).send('Debes ingresar un name para la receta');
    };

    if(!summary) {
        return res.status(404).send('Debes ingresar un summary para la receta');
    };

    let createRecipe = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps
    });

    let dietDB = await Diet.findAll({
        where: {name: diets}
    })


    createRecipe.addDiet(dietDB);
    return res.status(200).send('Creado correctamente');


} catch (error) {
    console.log(error);
    return res.status(404).send(error);
}

});

module.exports = router;