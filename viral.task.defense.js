let mod = {};
module.exports = mod;
mod.creep = {
    defender: {
        fixedBody: [RANGED_ATTACK, MOVE],
        multiBody: [TOUGH, RANGED_ATTACK, RANGED_ATTACK, HEAL, MOVE, MOVE],
        name: "defender", 
        behaviour: "ranger", 
        queue: 'Low'
    },
};
