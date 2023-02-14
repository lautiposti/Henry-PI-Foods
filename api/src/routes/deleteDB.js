const {Router} = require('express');
const {Recipe} = require('../db');

const router = Router();



router.get('/', async (req, res) => {
    try {
        const {id} = req.params;
        // let recipesDB = await Recipe.findAll({
        //     where: {
        //         id: !id
        //     }
        // });

        let recipesDB = await Recipe.findAll();
        recipesDB();
        return res.status(200).send('Se elimino correctamente');
    } catch (error) {
        res.status(404).send(error)
    }
    
})