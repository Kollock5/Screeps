var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep) {        
        if(creep.memory.gotPower && creep.store[RESOURCE_ENERGY] == 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
            });
            targets.sort((a,b) => (a.store[RESOURCE_ENERGY] < b.store[RESOURCE_ENERGY]) ? 1 : -1);
            if (targets.length > 0){
                creep.memory.gotPower = false;
                creep.memory.target = targets[0].id;
            }
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
            targets = _.sortBy(targets, s => creep.pos.getRangeTo(s))
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(towers.length > 0){
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var storages = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });    
                if(creep.transfer(storages[0], RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE){
                    creep.moveTo(storages[0]);
                }
            }
        }
        else {
            if(creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }
        }
	}
};

module.exports = roleMover;