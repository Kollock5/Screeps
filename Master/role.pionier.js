var rolePionier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // if in target room
        if (creep.room.name != creep.memory.target) {
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            if(creep.memory.gotPower && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.gotPower = false;
            }
            if(!creep.memory.gotPower && creep.store.getFreeCapacity() == 0) {
                creep.memory.gotPower = true;
            }
    
            if(creep.memory.gotPower) {
                
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });

                if(targets.length > 0) {
                    delete Game.spawns[creep.memory.source].memory.claimState;
                    delete Game.spawns[creep.memory.source].memory.claimRoom;

                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    } 
                    else {
                        var storages = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                            }
                        });
                        if(creep.transfer(storages[0], RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE){
                            creep.moveTo(storages[0]);
                        }
                        else{
                            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }   
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};
module.exports = rolePionier;