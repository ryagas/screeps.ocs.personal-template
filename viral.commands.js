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
_.times(5, n => Game.rooms['W54S82'].spawnQueueLow.push({parts: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], name: 'buildStorage', setup: 'work'}));

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
Game.creeps['pioneer-Flag43-1'].data.creepType="recycler";

// To override a module file create a copy of an existing module and name it "custom.<originalModuleName>". Then call this method (without ".js"):
getPath('<originalModuleName>', true);
// To completely re-evaluate all modules:
delete Memory.modules;

// create market order (replace [roomName] with target room or remove it for subscription tokens)
Game.market.createOrder(type, resourceType, price, totalAmount, roomName);

//accept market sell or buy order
Game.market.deal(orderId, amount, roomName);
Game.market.deal('591511bc288438f4359b3a65', 2227, 'W45S87');

//flush visuals heatmap
_.forEach(Memory.rooms, r => delete r.heatmap);

// https://github.com/ScreepsOCS/screeps.behaviour-action-pattern/wiki/Resource-Management
//resource management  - stat labs
Game.rooms['roomName'].placeReactionOrder('labId', 'resourceId', amount);

//resource management - maintain set amount in container
Game.rooms['W45S87'].setStore('595418f25af878770ddccd1f', RESOURCE_GHODIUM_OXIDE, 3000);
Game.rooms['W45S87'].setStore('595399e81c49343c30a66898', RESOURCE_ZYNTHIUM_OXIDE, 3000);
Game.rooms['W45S87'].setStore('5953d41082ff315108fae399', RESOURCE_KEANIUM_OXIDE, 3000);

Game.rooms['W45S87'].setStore('5955729c0a79d91a0a2481a4', RESOURCE_GHODIUM_HYDRIDE, 3000); // upgrader!!!!!

//resource management - one off amount in container
Game.rooms['roomName'].placeOrder('structureID', RESOURCE_TYPE, amount)

//forced  fortifying
_(Game.creeps).filter({'data':{'creepType':'worker'}, 'room':{'name':'W49S88'}}).map(x=>Creep.action.foritfying.assign(x));
// turn one creep into another
_(Game.creeps).filter({'data':{'creepType':'remoteWorker'}}).map(x=>x.data.creepType='recycler')
// assign actions to certain creeps
_(Game.creeps).filter({'data':{'creepType':'upgrader'}, 'room':{'name':'W54S82'}}).map(x=>Creep.action.boosting.assign(x));


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

(function(){var roomname='W45S87'; Memory.rooms[roomname].resources.lab = []; for(var x in Memory.rooms[roomname].labs){ var lab = Memory.rooms[roomname].labs[x] ; var obj = {id:lab.id, orders:[], reactionState:'idle'}; Memory.rooms[roomname].resources.lab[x]=obj;}})();