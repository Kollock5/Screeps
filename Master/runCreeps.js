//run role scripts on each screep, dosent check for rooms or shit... 
//ony runs code on my screeps(i think not sure if Game.screeps only get my screeps *HONK*)

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleClaimer = require('role.claimer');
var rolePionier = require('role.pionier');
var roleMiner = require('role.miner');
var roleMover = require('role.mover');
var roleWorker = require('role.worker');
var roleMelee = require('attack.melee');
var roleSpawner = require('attack.spawner');


function runCreeps() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if (creep.memory.role == 'pionier') {
            rolePionier.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
        if (creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if (creep.memory.role == 'melee') {
            roleMelee.run(creep);
        }
        if (creep.memory.role == 'spawner') {
            roleSpawner.run(creep);
        }
    }
}
exports.runCreeps = runCreeps;
