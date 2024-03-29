//Defends room, returns true if room is clear
function roomTowerDefence(roomName) {
    //find enemys in room
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);      
    if (hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        //for all towers in room attack the closesd
        towers.forEach(tower => {
            hostiles = _.sortBy(hostiles, s => tower.pos.getRangeTo(s))
            tower.attack(hostiles[0])}
        );
        return false;
    }
    else return true;
}
exports.roomTowerDefence = roomTowerDefence;
