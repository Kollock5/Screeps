//test
const { runCreeps } = require("./runCreeps");
const { creepSpawnMS } = require("./creepSpawnMS");
const { creepSpawnHU } = require("./creepSpawnHU");
const { checkSpawnLvl } = require("./checkSpawnLvl");
const { roomTowerRepair } = require("./roomTowerRepair");
const { roomTowerDefence } = require("./roomTowerDefence");
const { creepSpawnAttack } = require("./creepSpawnAttack");

module.exports.loop = function () {
    //clearing old memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for (let spawnName in Game.spawns){
        let spawn = Game.spawns[spawnName];
        //towers first look for enemys if there are non it repairs things...
        if (roomTowerDefence(spawn.room.name)){
            roomTowerRepair(spawn.room.name);
        }
        creepSpawnHU(spawn);
        //  if (checkSpawnLvl(spawn) < 4){
             //Startup script
        //    creepSpawnHU(spawn);
         //}
         //else{
             //advanced mienr script
           //  creepSpawnMS(spawn);
//         }
        creepSpawnAttack(spawn);
    }

    //get all screeps and execute there role code
    runCreeps();    
}

