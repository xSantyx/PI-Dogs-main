//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Temp } = require('./src/db.js');
const {getApiInfo} = require ('./src/routes/dogs.js')
const axios = require ('axios');

let tempsDogsDb = async () => {
  try {
    
    const allDogsApi = await axios.get (`https://api.thedogapi.com/v1/breeds`);
    let tempsMap = allDogsApi.data.map((e) => e.temperament )
    let tempsList = [];
    for (let i = 0; i < tempsMap.length; i++) {
      if (tempsMap[i])
      {tempsList.push(tempsMap[i].split(','))
     }
      else continue
    }
    
    tempsList = tempsList.flat(Infinity)
    tempsList.forEach(e => {
      Temp.findOrCreate({
        where: {name:e.trim()} 
      })
    })
    console.log('All Temps where succefully added to data base')
    
  } catch (error) {
    console.log('Error TempsIndex', error);
        return error;
  }
  }

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    tempsDogsDb();
  });
});
