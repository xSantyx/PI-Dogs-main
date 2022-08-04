const {Router} = require ("express");
const router = Router();
const {Dog, Temp} = require ('../db');
const axios = require ('axios');

const getApiInfo = async () => {
    try {
        const apiInfo = await axios.get (`https://api.thedogapi.com/v1/breeds`);

        const dogMaps = await apiInfo.data.map((e) =>{
            return {
                name: e.name,
                id: e.id,
                weightmin: e.weight.metric.split(" - ")[0],
                weightmax: e.weight.metric.split(" - ")[1],
                heightmin: e.height.metric.split(" - ")[0],
                heightmax: e.height.metric.split(" - ")[1],
                life_span: e.life_span,
                image: e.image.url,
                temperament: e.temperament,
                breed: e.breed_group
            }
        })
        return dogMaps;
        
    } catch (error) {
        console.log('Error getApiInfo', error);
        return error;
    }
    
}

const getDbInfo = async () => {
    try {
        const dbInfo = await Dog.findAll ({
            include: {
                model: Temp
            }
        })
        return dbInfo;
        
    } catch (error) {
        console.log('Error getDbInfo', error);
        return error;
    }
}

router.get("/", async (req,res,next) => {
    try {
        let allDogsApi = await getApiInfo();
        let allDogsDb = await getDbInfo();
        let allDogs = allDogsApi.concat(allDogsDb)
        let name = req.query.name;
        if (name) {
            let dogName = allDogs.filter ((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            if (dogName.length>0) 
            res.status(200).send (dogName)
            else 
            res.status(404).send ('Dog not found') 
        }
        res.status(200).send (allDogs)
        
    } catch (error) {
        console.log('Error getAllDogs', error);
        return error;
    }
})
router.get("/:id", async (req,res,next) => {
    try {
        let id = req.params.id
        let allDogsApi = await getApiInfo();
        let allDogsDb = await getDbInfo();
        let allDogs = allDogsApi.concat(allDogsDb)
        let dogId = allDogs.filter((e) => e.id == id)
        if(dogId.length>0) 
        res.status(200).send (dogId)
        else 
        res.status(404).send ('Id not found')
    } catch (error) {
        console.log('Error getDogId', error);
        return error;
    }
})
// router.get("/", async (req,res,next) => {
//         let allDogsApi = await getApiInfo();
//         let allDogsDb = await getDbInfo();
//         let allBreeds = allDogsApi.concat(allDogsDb)
//         let breed = req.query.breed;
//         if (breed) {
//             let dogBreed = allBreeds.filter ((e) => e.breed.toLowerCase().includes(breed.toLowerCase()))
//             if (dogBreed.length>0) 
//         res.status(200).send (dogBreed)
//         else
//         res.status(404).send ('Breed not found')
   
// }})

router.post ("/", async(req,res,next) => {    
        let {name, weightmin, weightmax, heightmin, heightmax, life_span, image, breed, temperament, createInDb} = req.body;
        let postDog = await Dog.create({name, temperament, weightmin, weightmax, heightmin, heightmax, life_span, breed, image, createInDb})
        temperament = temperament.split(",")
        temperament.forEach(async e => {
            let tempDog = await Temp.findOrCreate({
                where: {name: e.trim()}
            })
            
        });
            res.send('Dog created succesfully')   
})

module.exports = router;