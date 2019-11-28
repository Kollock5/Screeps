var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var melee = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'melee');
        if (melee.length > 0){
            creep.memory.room = "W12S35";
            if (creep.room.name != creep.memory.room) {
                // find exit to target room
                var exit = creep.room.findExitTo(creep.memory.room);
                // move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else if (creep.attack(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }   
        }
        else{
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
};

module.exports = roleClaimer;