var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.gotPower && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.gotPower = false;
	    }
	    if(!creep.memory.gotPower && creep.store.getFreeCapacity() == 0) {
	        creep.memory.gotPower = true;
        }
	    if(creep.memory.gotPower) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        	if(targets.length) {
        		if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(targets[0]);
        		}
        	} 
        	else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }  
    	    }    
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > creep.store.getFreeCapacity(RESOURCE_ENERGY)
                        || structure.structureType == STRUCTURE_STORAGE &&
                        structure.store[RESOURCE_ENERGY] > creep.store.getFreeCapacity(RESOURCE_ENERGY))
                }
            });
            targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) ==  ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0]);
            }
        }
	}
};

module.exports = roleWorker;