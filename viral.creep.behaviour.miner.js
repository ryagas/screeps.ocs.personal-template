const mod = new Creep.Behaviour('miner');
module.exports = mod;
mod.actions = function(creep) {
    return [
        Creep.action.renewing,
        Creep.action.mining,
        Creep.action.recycling,
    ];
};
