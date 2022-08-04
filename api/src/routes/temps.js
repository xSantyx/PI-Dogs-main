const {Router} = require ("express");
const router = Router();
const {Temp} = require ('../db');


router.get("/", async (req,res,next) => {
    try {
        let allTemps = await Temp.findAll()
        res.status(200).send(allTemps) 
    } catch (error) {
        console.log('Error getTemps', error);
        return error;
    }
})

module.exports = router;