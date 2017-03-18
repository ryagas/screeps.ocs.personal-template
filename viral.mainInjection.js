    Task.guard.creep.guard = {
        fixedBody: [RANGED_ATTACK, TOUGH, MOVE, MOVE],
        multiBody: [RANGED_ATTACK, RANGED_ATTACK, HEAL, MOVE, MOVE, MOVE],
        name: "guard",
        behaviour: "ranger",
        queue: 'Low'
    };