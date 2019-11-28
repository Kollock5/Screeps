var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
            else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                targets = _.sortBy(targets, s => creep.pos.getRangeTo(s))
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
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleHarvester;