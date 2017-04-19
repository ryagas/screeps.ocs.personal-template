let mod = {};
module.exports = mod;
mod.run = function(creep) {
    if( creep.room.controller.upgradeBlocked && !creep.data.boosted){ // TODO boosting can happen in multiple passes!
        // TODO don't do this if you're boosted! T_T
        creep.data.creepType='recycler';
        return;
    }
    if( creep.ticksToLive > 1350 && creep.data && !creep.data.boosted ) {
        // find a lab
        var labs = creep.room.find(FIND_MY_STRUCTURES,{filter:(s)=>{
            return s.structureType==STRUCTURE_LAB && s.mineralType==RESOURCE_CATALYZED_GHODIUM_ACID &&
                s.mineralAmount > 30 && s.energy >= 20; // TODO boosting in multiple passes!
        }});
        if (labs.length == 0) lab = creep.room.find(FIND_MY_STRUCTURES,{filter:(s)=>{
            return s.structureType==STRUCTURE_LAB && s.mineralType==RESOURCE_GHODIUM_ACID &&
                s.mineralAmount > 30 && s.energy >= 20; // TODO bossting in multiple passes!
        }});
        if (labs.length == 0) lab = creep.room.find(FIND_MY_STRUCTURES,{filter:(s)=>{
            return s.structureType==STRUCTURE_LAB && s.mineralType==RESOURCE_GHODIUM_HYDRIDE &&
                s.mineralAmount > 30 && s.energy >= 20; // TODO bossing in multiple passes!
        }});
        if (labs.length > 0) {
            let lab = labs[0];
            if( SAY_ASSIGNMENT ) creep.say(String.fromCharCode(9883), SAY_PUBLIC);
            if (creep.pos.getRangeTo(lab) > 1) creep.moveTo(lab);
            else if( lab.boostCreep(creep) == OK ) creep.data.boosted = true;
            return;
        }
    }
    if( !creep.action ) Population.registerAction(creep, Creep.action.upgrading, creep.room.controller);
    if( !creep.data.determinatedSpot ) {
        let args = {
            spots: [{
                pos: creep.room.controller.pos,
                range: 3
            }],
            checkWalkable: true,
            where: null,
            roomName: creep.pos.roomName
        }
        let addSpot = s => args.spots.push({
            pos: s.pos,
            range: 1
        });
        if( creep.room.structures.container.controller ){
            creep.room.structures.container.controller.forEach(addSpot);
        }
        if( creep.room.structures.links.controller ){
            creep.room.structures.links.controller.forEach(addSpot);
        }
        // dont take already taken
        let taken = [];
        let findInvalid = entry => {
            if( entry.roomName == args.roomName && ['miner', 'upgrader'].includes(entry.creepType) && entry.determinatedSpot && entry.ttl > entry.spawningTime)
                taken.push(entry.determinatedSpot)
        };
        _.forEach(Memory.population, findInvalid);
        // dont take miner spots
        let invalid = taken.slice(0);
        let sourcesInRange = creep.room.controller.pos.findInRange(creep.room.sources, 4);
        let addAdjacent = source => source.pos.adjacent.forEach(pos => invalid.push({x:pos.x,y:pos.y}))
        sourcesInRange.forEach(addAdjacent);

        args.where = pos => { return !_.some(invalid,{x:pos.x,y:pos.y}); };
        let spots = Room.fieldsInRange(args);
        if( spots.length == 0 ){
            // no position found. allow pos near sources
            args.where = pos => { return !_.some(taken,{x:pos.x,y:pos.y}); };
            spots = Room.fieldsInRange(args);
        }
        if( spots.length == 0 ){
            // no position found. allow any
            delete args.where;
            spots = Room.fieldsInRange(args);
        }
        if( spots.length > 0 ){
            let spot = creep.pos.findClosestByPath(spots, {filter: pos => {
                return !_.some(
                    creep.room.lookForAt(LOOK_STRUCTURES, pos),
                    {'structureType': STRUCTURE_ROAD }
                );
            }})
            if( !spot ) spot = creep.pos.findClosestByPath(spots) || spots[0];
            if( spot ) {
                creep.data.determinatedSpot = {
                    x: spot.x,
                    y: spot.y
                }
                let spawn = Game.spawns[creep.data.motherSpawn];
                if( spawn ) {
                    let path = spot.findPathTo(spawn, {ignoreCreeps: true});
                    if( path ) creep.data.predictedRenewal = creep.data.spawningTime + path.length; // road assumed
                }
            }
        }
        if( !creep.data.determinatedSpot ) logError('Unable to determine working location for upgrader in room ' + creep.pos.roomName);
        else if( SAY_ASSIGNMENT ) creep.say(String.fromCharCode(9962), SAY_PUBLIC);
    }
    if( creep.data.determinatedSpot ) {
        if(CHATTY) creep.say('upgrading', SAY_PUBLIC);
        let range = this.approach(creep);
        if( range == 0 ){
            let carryThreshold = (creep.data.body&&creep.data.body.work ? creep.data.body.work : (creep.carryCapacity/2));
            if( creep.carry.energy <= carryThreshold ){
                let store = creep.room.structures.links.controller.find(l => l.energy > 0);
                if( !store ) store = creep.room.structures.container.controller.find(l => l.store.energy > 0);
                if( store ) creep.withdraw(store, RESOURCE_ENERGY);
            }
            creep.controllerSign();
            creep.upgradeController(creep.room.controller);
        }
    }
};
