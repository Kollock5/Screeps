/*
Checks if the Spawn level has changed

Plan: implement auto constrution of buildings

Known Issues: containers must be placed befor level 4 or bad things will happen

1 lvl := place roads to sources
2 lvl :=  
3 lvl := places containers to mining sites
4 lvl := add containers to the mining spot arrays
5 lvl :=
6 lvl :=
7 lvl :=
8 lvl :=

*/



function checkSpawnLvl(spawn) {

    console.log("dafug");
    var oldLvl = spawn.memory.level;
    var currentLvl = spawn.room.controller.level;
    //checks if level stayed the same if yes exit with current lvl
    if (currentLvl == oldLvl) return currentLvl;
    else{
      //checks if lvl var was set in memory if not set it to 0
      if (oldLvl == undefined) {
        spawn.memory.level = 0;
      }
      //add 1 to the stored lvl 
      spawn.memory.level = oldLvl + 1;
      //runs code for the new lvl
      switch (oldLvl + 1) {
          case 1: //build roads to sources
              var sources = spawn.room.find(FIND_SOURCES);
              for(var j = 0; j < sources.length;j++){
                var path = spawn.room.findPath(spawn.pos, sources[j].pos, {ignoreCreeps: true});
                for (var i = 0; i < (path.length - 2);i ++){
                  spawn.room.createConstructionSite(path[i].x, path[i].y ,STRUCTURE_ROAD);
                }
              }  
            break;
          case 2:

            break;
          case 3: // places containers to sources 
              var sources = spawn.room.find(FIND_SOURCES);
              for(var j = 0; j < sources.length;j++){
                var path = spawn.room.findPath(spawn.pos, sources[j].pos, {ignoreCreeps: true});
                spawn.room.createConstructionSite(path[path.length - 1].x, path[path.length - 1].y ,STRUCTURE_CONTAINER);

              }  
            break;
          case 4: // add all containers to posible mining sites(will spawn a miner for every mining site)
            spawn.memory.miningSites = new Array();
            var containers = spawn.room.find(FIND_STRUCTURES, {
              filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER)}
            });
            for(var i = 0; i < containers.length; i++){
              console.log(containers[i]);
              spawn.memory.miningSites.push([containers[i].pos.x,containers[i].pos.y]);
            }
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;

        }
    }
    return spawn.memory.level;
}
exports.checkSpawnLvl = checkSpawnLvl;
