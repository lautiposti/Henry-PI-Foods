const {Router} = require('express');
const axios = require ('axios');
const {API_KEY, Recipe, Diet} = require('../db');

const router = Router();

const getApiInfo = async () => { // aca traemos toda la informacion y vamos creando los objetos 

    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, {headers:{'accept-encoding': 'gzip, deflate, compress'}});
        const {results} = apiUrl.data;
    
        
        if (results.length > 0) {

            let response = await results.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image, 
                    id: result.id, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    summary:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                };   
            });

        return response;
    };

    }catch (error) {
        console.error(error);
        return ([])
    };
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            },
        }
    });
};

const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}


router.get('/', async (req, res) => {
    const {name} = req.query;
    const totalInfo = await getAllInfo();

    if (name) {
        let searchName = totalInfo.filter(element => element.name.toLowerCase().includes(name.toLowerCase()));
        if (searchName.length) {
            return res.status(200).send(searchName);
        } else {
            return res.status(400).send('No se encontro una receta con ese nombre');
        }
    } else {
        return res.status(200).send(totalInfo);
    };
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        if (id.includes('-')) {
            Recipe.findByPk(id, { include: Diet }).then((recipe) => {
                return res.json(recipe);
              });
            }
        } catch (error) {
            res.status(400).json(error);
        };

        try {
            const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`, {headers:{'accept-encoding': 'gzip, deflate, compress'}});
            const result = idApi.data;
            receta = {
                name: result.title,
                vegetarian: result.vegetarian,
                vegan: result.vegan,
                glutenFree: result.glutenFree,
                dairyFree: result.dairyFree, 
                image: result.image, 
                idApi: result.id, 
                score: result.spoonacularScore,
                healthScore: result.healthScore,
                types: result.dishTypes?.map(element => element),  
                diets: result.diets?.map(element => element), 
                summary:result.summary, 
                steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }
            return res.send(receta);
        } catch (error) {
            res.status(404).json('No se encontró la receta');
        };

});





module.exports = router;