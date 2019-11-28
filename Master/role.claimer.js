var roleClaimer = {
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
            claim = creep.claimController(creep.room.controller);
            if (claim == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            }
            x = Game.flags.Flag1.room.createConstructionSite(Game.flags.Flag1.pos.x,Game.flags.Flag1.pos.y, STRUCTURE_SPAWN, 'Spawn2');

            if (x == 0){
                console.log("New Spawn is ready for action!");
                Game.spawns[creep.memory.source].memory.claimState = '2';
            }
        }
    }
};

module.exports = roleClaimer;