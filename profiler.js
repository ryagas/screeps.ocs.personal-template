let profiler = {};

profiler.reset = function reset() {
	_.set(Memory, 'stats.cpuProfiler', {
		overall: {
			start:  {time: 0, count: 0},
			finish: {time: 0, count: 0},
		},
	});
};

profiler.start = function start() {
	if (!_.has(Memory, 'stats.cpuProfiler.overall')) {
		profiler.reset();
	}

	Memory.stats.cpuProfiler.overall.start.time += Game.cpu.getUsed();
	Memory.stats.cpuProfiler.overall.start.count++;
};

profiler.startUsage = function startUsage(name, category = 'general') {
	let path = ['stats', 'cpuProfiler', category, name];
	_.set(Memory, path, _.get(Memory, path, {time: 0, count: 0}));
	Memory.stats.cpuProfiler[category][name].start = Game.cpu.getUsed();
};

profiler.finishUsage = function finishUsage(name, category = 'general') {
	if (_.has(Memory, ['stats', 'cpuProfiler', category, name])) {
		Memory.stats.cpuProfiler[category][name].time += Game.cpu.getUsed() - Memory.stats.cpuProfiler[category][name].start;
		Memory.stats.cpuProfiler[category][name].count++;
	}
};

function energyFull(room) {
	return room.energyAvailable >= Math.min(room.energyCapacityAvailable, 5000);
}

function roomStats(acc, room) {
	let spawnCount = _.countBy(room.getStructures('spawn'), spawn => spawn.spawning ? 'busy' : 'idle');
	let lowestWall = room.getWallToFix();
	let spawnActivity = energyFull(room) ? {waiting: 0, idle: (spawnCount.idle || 0), busy: (spawnCount.busy || 0)} :
		{waiting: (spawnCount.idle || 0), idle: 0, busy: (spawnCount.busy || 0)};
	room.memory.spawns = _.merge(room.memory.spawns || {}, spawnActivity, (a, b) => (a || 0) + (b || 0));
	acc[room.name] = {
		storage:                 _.get(room, ['storage', 'store'], {}),
		terminal:                _.get(room, ['terminal', 'store'], {}),
		energyAvailable:         room.energyAvailable,
		energyCapacityAvailable: room.energyCapacityAvailable,
		controllerProgress:      room.controller.progress,
		controllerProgressTotal: room.controller.progressTotal,
		controllerLevel:         room.controller.level,
		spawns:                  room.memory.spawns,
		roi:                     room.memory.roi,
		lowestWall:              (lowestWall ? lowestWall.hits : 0),
	};

	return acc;
}

function exportStats() {
	Memory.stats = _.pick(Memory.stats, 'cpuProfiler');

	Memory.stats.time = Game.time;
	Memory.stats.gcl = Game.gcl;
	Memory.stats.cpu = Game.cpu;
	Memory.stats.credits = Math.floor(Game.market.credits);
	Memory.stats.network = Memory.stats.empireTerminalCosts;

	Memory.stats.rooms = _.reduce(Game.ownedRooms, roomStats, {});
	Memory.stats.abortCount = Memory.abortCount || 0;
	Memory.stats.skippedTicks = Memory.skippedTicks || 0;
}

profiler.finish = function finish() {
	exportStats();
	Memory.stats.cpuProfiler.overall.finish.time += Game.cpu.getUsed();
	Memory.stats.cpuProfiler.overall.finish.count++;

	return Game.time % 10000 === 0 && profiler.reset();
};

module.exports = profiler;
