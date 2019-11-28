/*
Early buildup script befor miner age, works ok... not the most efficent
Works with a harvester that refuels spawner/tower, then builds stuff and then (stores the energy or upgrades the controller)
and with upgrades that farm and upgrade the controller

ToDo:   -Uses a Spawn but is checking for creeps in room... must be fixed
        -it should check how powerfull screeps are and spawn less if they are strong enoth to harvest all energy
        -move the claimer spawn to a seperate script... (!IMPORTANT!)(also do the in the MS spawner)
        -find energy soucre closed to controler and use it for the upgrader...

Known Issues: uses Spawn except of room... could casue problems in later stages with multibe spawns
              (but schmaby its ok becuase it shouldent run after lvl 4 still a drity trick)
*/

const { creepSpawnGetParts } = require("./creepSpawnGetParts");
function creepSpawnHU(spawn) {
    let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    var harvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(creepsInRoom, (creep) => creep.memory.role == 'upgrader');

    //dose all the work... like powering spawns building stuff and filling towers... after that the upgrade
    //must be spawned even if energy is not full so script can recover 
    if (harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        var creepPower = creepSpawnGetParts([MOVE, WORK, CARRY], [MOVE, CARRY, WORK, MOVE, CARRY], spawn.room.name, true, 1300);
        console.log('Spawning new harvester: ' + creepPower);
        spawn.spawnCreep(creepPower, newName, { memory: { role: 'harvester' } });
    }
    //just frams and upgrades the controller
    else if (upgrader.length < 3) {
        var newName = 'Upgrader' + Game.time;
        var creepPower = creepSpawnGetParts([WORK, WORK, MOVE, CARRY], [MOVE, CARRY, WORK, WORK], spawn.room.name, false, 1300);
        console.log('Spawning new upgrader: ' + creepPower);
        spawn.spawnCreep(creepPower, newName, { memory: { role: 'upgrader' } });
    }

    //room claming screeps please move somewhere else... ;)
    else if (spawn.memory.claimRoom != undefined && spawn.memory.claimState == undefined) {
        var newName = 'claimer' + Game.time;
        var creepPower = creepSpawnGetParts([CLAIM, MOVE], [MOVE], spawn.room.name, false, 100);
        console.log('Spawning new claimer: ' + creepPower);
        spawned = spawn.spawnCreep(creepPower, newName, { memory: { role: 'claimer', target: spawn.memory.claimRoom, source: spawnName } });
        if (spawned == 0) {
            spawn.memory.claimState = '1';
        }
    }
    else if (spawn.memory.claimState == '2') {
        var newName = 'pionier' + Game.time;
        var creepPower = creepSpawnGetParts([MOVE, WORK, CARRY], [MOVE, CARRY, WORK, MOVE, CARRY], spawn.room.name, false, 1300);
        console.log('Spawning new pionier: ' + creepPower);
        spawn.spawnCreep(creepPower, newName, { memory: { role: 'pionier', target: spawn.memory.claimRoom, source: spawnName } });
    }
}
exports.creepSpawnHU = creepSpawnHU;
