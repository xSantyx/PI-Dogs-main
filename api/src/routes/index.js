const { Router } = require('express');
const dogs = require ("./dogs")
const temps = require ("./temps")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogs)
router.use("/temps", temps)
// router.use("/breed", dogs)


module.exports = router;
