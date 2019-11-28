for (var name in Game.creeps){
    var creep = Game.creeps[name];
    var sources = creep.room.find(FIND_SOURCES);
    var target = Game.getObjectById('ac8580e62a271caab299f661');
    console.log(Game.getObjectById('ac8580e62a271caab299f661').pos.x + creep.pos.x && Game.getObjectById('ac8580e62a271caab299f661').pos.y + creep.pos.y);
    if (Game.getObjectById('ac8580e62a271caab299f661').pos.x == creep.pos.x && Game.getObjectById('ac8580e62a271caab299f661').pos.y == creep.pos.y){
        console.log(creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES)));
    }
    else{
        creep.moveTo(Game.getObjectById('ac8580e62a271caab299f661'), {visualizePathStyle: {stroke: '#ffaa00'}});
        console.log('uhh');
    }
}