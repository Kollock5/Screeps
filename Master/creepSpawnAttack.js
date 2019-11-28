const { creepSpawnGetParts } = require("./creepSpawnGetParts");
function creepSpawnAttack(spawn) {
    let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    // var harvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvester');
    var melee = _.filter(creepsInRoom, (creep) => creep.memory.role == 'melee');
    var spawner = _.filter(creepsInRoom, (creep) => creep.memory.role == 'spawner');

    if (spawn.memory.attack != undefined && spawner.length < 1) {
      var newName = 'melee' + Game.time;
      var creepPower = creepSpawnGetParts([MOVE, CARRY], [MOVE, CARRY], spawn.room.name, false, 1200);
      console.log('Spawning new spawner: ' + creepPower);
      spawn.spawnCreep(creepPower, newName, { memory: { role: 'spawner' } });
    }
    if (spawn.memory.attack != undefined && melee.length < 0) {
        var newName = 'melee' + Game.time;
        var creepPower = creepSpawnGetParts([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], [MOVE, ATTACK], spawn.room.name, false, 2200);
        console.log('Spawning new melee: ' + creepPower);
        spawn.spawnCreep(creepPower, newName, { memory: { role: 'melee', target: spawn.memory.attack } });
    }
}
exports.creepSpawnAttack = creepSpawnAttack;
