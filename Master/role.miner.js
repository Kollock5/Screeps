var roleMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.memory.target;
        if (target[0] == creep.pos.x && target[1] == creep.pos.y){
            creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
        }
        else{
            creep.moveTo(target[0], target[1]);
        }
	}
};

module.exports = roleMiner;


