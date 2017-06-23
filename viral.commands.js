// useful commands

// Recycle a creep
Creep.action.recycling.assign(Game.creeps['pioneer-Flag2-1']);

// flush road construction traces
_.forEach(Memory.rooms, r => delete r.roadConstructionTrace);

// remove all construction Sites
_.forEach(Game.rooms['W45S87'].constructionSites, s => s.remove());

// spawn something...
Game.spawns['Spawn2'].createCreepBySetup(Creep.setup.pioneer);
// or
Game.rooms['W47N62'].spawnQueueLow.push({parts:[MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY],name:'max',setup:'upgrader'});
// or
Task.forceSpawn(Task.pioneer.creep.pioneer, {targetRoom:'W48S86', allowTargetRoom:true, explicit:'W48S86'}, Game.flags['Flag2'])
// many upgraders!!!
_.times(5, n => Game.rooms['W49N67'].spawnQueueLow.push({parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], name: 'upgrader-550', setup: 'upgrader'}));

// clear spawn queues for a room
// clear low priority queue
Memory.rooms['<roomName>'].spawnQueueLow = [0];
// clear medium priority queue
Memory.rooms['<roomName>'].spawnQueueMedium = [0];
// clear high priority queue
Memory.rooms['<roomName>'].spawnQueueHigh = [0];

// move Creep
Game.creeps['<creepName>'].move(RIGHT);

// Assign a creep to a room to travel to
Creep.action.travelling.assignRoom(Game.creeps['worker-1600-1'], Game.flags['Flag137'].pos.roomName)

// force recycle a Creep
Game.creeps['pioneer-Flag2-1'].data.creepType="recycler";

// To override a module file create a copy of an existing module and name it "custom.<originalModuleName>". Then call this method (without ".js"):
getPath('<originalModuleName>', true);
// To completely re-evaluate all modules:
delete Memory.modules;

// create market order (replace [roomName] with target room or remove it for subscription tokens)
Game.market.createOrder(type, resourceType, price, totalAmount, roomName);

//accept market sell or buy order
Game.market.deal(orderId, amount, roomName);

//flush visuals heatmap
_.forEach(Memory.rooms, r => delete r.heatmap);

// https://github.com/ScreepsOCS/screeps.behaviour-action-pattern/wiki/Resource-Management
//resource management  - stat labs
Game.rooms[<roomName>].placeReactionOrder(<labId>, <resourceId>, <amount>)

//resource management - maintain set amount in container
Game.rooms['W45S88'].setStore('593cd1aa370ec0667c591657', RESOURCE_CATALYZED_GHODIUM_ACID, 3000);

//resource management - one off amount in container
Game.rooms[<roomName>].placeOrder(<structure>, <resource>, <amount>)

//forced  fortifying
_(Game.creeps).filter({'data':{'creepType':'worker'}, 'room':{'name':'W49S88'}}).map(x=>Creep.action.foritfying.assign(x));
// turn one creep into another
_(Game.creeps).filter({'data':{'creepType':'remoteMiner'}}).map(x=>x.data.creepType='recycler')
// assign actions to certain creeps
_(Game.creeps).filter({'data':{'creepType':'miner'}, 'room':{'name':'W52S82'}}).map(x=>Creep.action.upgrading.assign(x));


// Order all labs to store 2000 energy
_.values(Game.structures).filter(i=>i.structureType==='lab').map(i=>i.room.setStore(i.id, RESOURCE_ENERGY, 2000));

// Examine the low priority spawn queue in all rooms
_.chain(Game.spawns).values().map(i=>i.room).unique().filter(i=>i.spawnQueueLow.length).map(i=>[`====${i.name}====>`,i.spawnQueueLow.map(j=>j.name)]).value();

// Show histogram of remoteHauler weight
JSON.stringify(_.chain(Game.creeps).filter(i=>i.data.creepType==='remoteHauler').groupBy('data.weight').mapValues(i=>i.length))

// Shift all defense flags to a single room
FlagDir.filter(FLAG_COLOR.defense).map(i=>Game.flags[i.name]).map(i=>i.setPosition(new RoomPosition(i.pos.x, i.pos.y, '<roomName>')))

//remove all flags in a specific room
var flags = _.filter(Game.flags,function(f){return f.pos.roomName == "W54S82"});  for(let f in flags){flags[f].remove();}

// set a creep to a different flag to go to
Game.creeps['CREEP_NAME'].data.destiny.targetName = 'Flag2'
*AND*
Game.creeps['CREEP_NAME'].data.destiny.flagName = 'Flag2'

// Force processing of construction flags

room.processConstructionFlags()

// signing a controller manually:
Game.creeps['guard-Flag110-2'].signController(Game.getObjectById('58dbc3b58283ff5308a3dfbd'), 'This room has been inspected by Chuck Norris. He did not approve.');

