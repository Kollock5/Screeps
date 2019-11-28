//finds repair sites in room and will try to repair them with eatch tower in room
function roomTowerRepair(roomName) {
    var repairs = Game.rooms[roomName].find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
    });
    if (repairs.length > 0) {
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        towers.forEach(tower => tower.repair(repairs[0]));
    }
}
exports.roomTowerRepair = roomTowerRepair;
