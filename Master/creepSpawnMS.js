/*
advanced script, it isent perfect but higth efficent
uses miners to farm all the energy into containers, mover will pick it up and fill the spawner/tower and then the storage
spawns higth power workers that builds shit and upgrades the controller

ToDo: -Uses a Spawn but is checking for creeps in room... must be fixed       
      -would be nice to have a way to have the max value of one typ of screep stored in the room so you could change them for each room
      -move the claimer spawn to a seperate script... (!IMPORTANT!)(also do the in the HU spawner)

Known Issues: spawns 2 miners first... not optimal... would be nice to have some backup like a spawner that usese the storge to spawn screeps
              uses Spawn except of room... could casue problems in later stages with multibe spawns
              well it riped my room one time... not sure why
*/


const { creepSpawnGetParts } = require("./creepSpawnGetParts");
function creepSpawnMS(spawn) {
    let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    var mover = _.filter(creepsInRoom, (creep) => creep.memory.role == 'mover');
    var worker = _.filter(creepsInRoom, (creep) => creep.memory.role == 'worker');
    var miners = _.filter(creepsInRoom, (creep) => creep.memory.role == 'miner');

    //spawns a miner for eatch mining site stores the site in screeps memory
    if (spawn.memory.miningSites.length > miners.length){
      var i = 0;
      var j = 0;
      //checks for all mining sites if a miner has the same x and y pos as the site 
      //if it finds one it sets a flag to stop spawning a new one with the x and y pos of the site
      //for all mining sites
      for (i; i < spawn.memory.miningSites.length; i++){
        //resets the flag for next mining site
        var flag = false;
        //for all miners
        for (j; j < miners.length; j++){
          //sets flag if it found one for the spawn
          if (spawn.memory.miningSites[i][0] == miners[j].memory.target[0] && spawn.memory.miningSites[i][1] == miners[j].memory.target[1]) flag = true;
        }      
        //spawns new miner
        if (!flag){
           var newName = 'miner' + Game.time;
           var creepPower = creepSpawnGetParts([WORK,WORK,WORK,WORK,WORK,MOVE], [MOVE], spawn.room.name, true, 650);
           console.log('Spawning new Miner at: '+ i + spawn + spawn.memory.miningSites[i])
           spawned = spawn.spawnCreep(creepPower, newName, { memory: { role: 'miner', target: spawn.memory.miningSites[i]} });
           break;
         }
      }
    }
    //checks for the movers
    else if (mover.length < 2) {
        var newName = 'mover' + Game.time;
        var creepPower = creepSpawnGetParts([MOVE, MOVE, CARRY, CARRY], [MOVE, CARRY], spawn.room.name, true, 1300);
        console.log('Spawning new mover: ' + creepPower);
        spawn.spawnCreep(creepPower, newName, { memory: { role: 'mover', gotPower: true } });
    }  
    //spawns higth power workers
    else if (worker.length < 1) {
      var newName = 'worker' + Game.time;
      var creepPower = creepSpawnGetParts([WORK, WORK, MOVE, CARRY], [MOVE, CARRY, WORK, WORK], spawn.room.name, false, 2000);
      console.log('Spawning new worker: ' + creepPower);
      spawn.spawnCreep(creepPower, newName, { memory: { role: 'worker' } });
    }  

    //room claming screeps please move somewhere else... ;)
    else if (spawn.memory.claimRoom != undefined && spawn.memory.claimState == undefined) {
        var newName = 'claimer' + Game.time;
        var creepPower = creepSpawnGetParts([CLAIM, MOVE], [MOVE], spawn.room.name, false, 100);
        console.log('Spawning new claimer: ' + creepPower);
        spawned = spawn.spawnCreep(creepPower, newName, { memory: { role: 'claimer', target: spawn.memory.claimRoom, source: spawn.name } });
        if (spawned == 0) {
            spawn.memory.claimState = '1';
        }
    }
    else if (spawn.memory.claimState == '2') {
        var newName = 'pionier' + Game.time;
        var creepPower = creepSpawnGetParts([MOVE, WORK, CARRY], [MOVE, CARRY, WORK, MOVE, CARRY], spawn.room.name, false, 1300);
        console.log('Spawning new pionier: ' + creepPower);
        spawn.spawnCreep(creepPower, newName, { memory: { role: 'pionier', target: spawn.memory.claimRoom, source: spawn.name } });
    }
}
exports.creepSpawnMS = creepSpawnMS;
