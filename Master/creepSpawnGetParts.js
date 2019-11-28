/*
hardparts  := they will allways be in the creep even with forceSpawn on
loopparts  := they will repeat untill the spawn hasent got any power left
roomName   := name of the room that will spawn the creep, checks this room for power
forceSpawn := if enabled it will spawn the screep with the power avalible, else it will wait for the full power of the room
maxPower   := max amound of power it will use to spawn the creep

Known issuse: only got the correct power use of work, move and carry... attack, claim, strong etc are missing.
              will calculate everthing with 50 points except work(100)

Bug/Feture:   Will return an unspawnable array if force spawn is false and avalibe power < maxRoomPower || maxPower
*/

function creepSpawnGetParts(hardParts, loopParts, roomName, forceSpawn, maxPower) {
    //look for forceSpawn and set the power to use to true = available power, false = possible power
    if (forceSpawn) var currentPower = Game.rooms[roomName].energyAvailable;
    else var currentPower = Game.rooms[roomName].energyCapacityAvailable;

    //checks if we have more Power than we want to use if yes limit the use
    if (currentPower > maxPower){
        currentPower = maxPower;
    } 

    var bodyParts = [];
    var i = 0;

    //get all the hardparts and subtract it of the usable power
    while (i < hardParts.length) {
        if (hardParts[i] == WORK) {
            currentPower = currentPower - 50;
        }
        bodyParts.push(hardParts[i]);
        currentPower = currentPower - 50;
        i++;
    }

    //add the loob parts and subtract the coast of the usable power untill the usable power is empty
    i = 0;
    while (currentPower >= 50) {
        if (i < loopParts.length) {
            if (hardParts[i] == WORK) {
                currentPower = currentPower - 50;
                if (currentPower < 50)
                    break;
            }
            currentPower = currentPower - 50;
            bodyParts.push(loopParts[i]);
            i++;
        }
        else {
            i = 0;
        }
    }
    return bodyParts;
}
exports.creepSpawnGetParts = creepSpawnGetParts;
